import _ from 'lodash'

type Key = string | number

type Item = {
    id: Key,
    [key: string]: any,
}

type PaginatedData = {
    data: Item[],
    keys?: Key[],
    filter_values?: FilterValues,
    meta: {
        total: number,
        from: number,
        to: number,
        current_page: number,
        last_page: number,
        per_page: number,
    },
}

type FilterValues = {
    [key: string]: any[],
}

type Sort = {
    field: string | null,
    order: string,
}

type Pagination = {
    page: number,
    from: number,
    to: number,
    size: number,
    total: number,
    lastPage: number,
}

type IPMOptions = {
    pageTitle?: string,
    scope?: string,
    routes?: {
        fetch?: string | null,
        store?: string | null,
        editor?: string | null,
        duplicate?: string | null,
        delete?: string | null,
    },
    view?: {
        layout?: string,
        showPreview?: boolean,
    },
    fetchImmediately?: boolean,
}

type DeleteOptions = {
    needsConfirmation?: boolean,
    message?: string,
}



export function useItemPageManager(options: Partial<IPMOptions> = {})
{
    const auth = useAuthStore()

    const IPM = reactive({
        items: [] as Item[],
        keys: [] as Key[],
        selection: [] as Key[],
        processing: false as boolean,
        scope: options?.scope ?? '' as string,
        columnSettings: [] as any[],
        filter: {},
        availableFilterValues: {} as FilterValues,
        sort: {
            field: null,
            order: 'desc',
        } as Sort,
        pagination: {
            page: 1,
            size: 20,
            from: 0,
            to: 0,
            total: 0,
            lastPage: 1,
        } as Pagination,
        options: {
            pageTitle: options?.pageTitle ?? 'Items',
            routes: {
                fetch: options?.routes?.fetch ?? null,
                store: options?.routes?.store ?? null,
                editor: options?.routes?.editor ?? null,
                duplicate: options?.routes?.duplicate ?? null,
                delete: options?.routes?.delete ?? null,
            },
            view: {
                layout: 'list',
                showPreview: false,
            },
            fetchImmediately: options?.fetchImmediately ?? true,
        } as IPMOptions,



        get tableScope()
        {
            return this.scope + '.table'
        },



        get modelColumnSettings()
        {
            return this.columnSettings
        },

        set modelColumnSettings(value)
        {
            this.columnSettings = value

            auth.setSettings(this.scope+'_column_settings', this.columnSettings, 'db')
        },



        get modelFilter()
        {
            return this.filter
        },

        set modelFilter(value)
        {
            this.filter = value

            this.throttledFetch()
            auth.setSettings(this.scope+'_filter', this.filter, 'session')
        },



        get modelSort()
        {
            return this.sort
        },

        set modelSort(value)
        {
            this.sort = { ...this.sort, ...value }

            this.throttledFetch()
            auth.setSettings(this.scope+'_sort_field', this.sort.field, 'session')
            auth.setSettings(this.scope+'_sort_order', this.sort.order, 'session')
        },



        get modelPagination()
        {
            return this.pagination
        },

        set modelPagination(value)
        {
            this.pagination = { ...this.pagination, ...value }
            
            this.throttledFetch()
            auth.setSettings(this.scope+'_pagination_page', this.pagination.page, 'session')
            auth.setSettings(this.scope+'_pagination_size', this.pagination.size, 'db')
        },



        fetch: $fetch,
        throttledFetch: _.throttle($fetch, 300),



        toggleSelection(item: Item): void
        {
            if (this.selection.includes(item.id))
            {
                this.selection = this.selection.filter(p => p !== item.id)
            }
            else
            {
                this.selection.push(item.id)
            }
        },

        setSelection(item: Item)
        {
            this.selection = [item.id]
        },

        addSelection(item: Item)
        {
            if (this.selection.includes(item.id)) return

            this.selection.push(item.id)
        },

        selectAll()
        {
            this.selection = this.items.map(i => i.id)
        },

        deselectAll()
        {
            this.selection = []
        },



        open(id?: Key)
        {
            navigateTo(apiRoute(this.options.routes?.editor as string, { id: id ?? '' }))
        },

        store(data: any[])
        {
            useForm(data).post(this.options.routes?.store as string, {
                onSuccess() {
                    $fetch()
                },
            })
        },

        duplicate(id: Key)
        {
            useForm({}).post(apiRoute(this.options.routes?.duplicate as string, { id }), {
                onSuccess() {
                    $fetch()
                },
            })
        },

        delete(ids: Key[] = [], message: string = 'Are you sure you want to delete the selected items?', options: DeleteOptions = {})
        {
            // Construct options
            options = {
                needsConfirmation: options?.needsConfirmation ?? true,
                message: replaceVariable(message ?? options?.message),
            }

            // Construct data
            let data = {
                ids: ids ?? this.selection ?? [],
            }



            // If ids is not an array, convert it to an array and remove any empty values
            if (typeof data.ids !== 'object') data.ids = [data.ids].filter(id => id)

            // If ids is empty, return
            if (!data.ids.length) return

            // If request needs confirmation, ask the user to confirm
            if (options.needsConfirmation)
            {
                // If the user cancels the delete, return
                if (!confirm(options.message)) return
            }

            // Delete the items
            useForm(data).delete(apiRoute(this.options.routes?.delete as string), {
                onSuccess: () => {
                    this.deselectAll()
                    $fetch()
                },
            })



            function replaceVariable(string: string)
            {
                return string.replace('{{count}}', ids.length.toString())
            }
        },
    })



    async function $fetch()
    {
        IPM.processing = true

        let route = apiRoute(IPM.options.routes?.fetch as string, {
            filter: IPM.filter,
            sort: IPM.sort,
            ...IPM.pagination,
        })

        let { data, error } = await useApiFetch(route)

        let paginatedData = data?.value as PaginatedData

        IPM.items = paginatedData?.data ?? []
        IPM.keys = paginatedData?.keys ?? IPM.items.map(i => i?.id).filter(id => id || id === 0 || id === '0') ?? []
        IPM.availableFilterValues = paginatedData?.filter_values ?? {}
        IPM.pagination.from = paginatedData?.meta?.from ?? 0
        IPM.pagination.to = paginatedData?.meta?.to ?? 0
        IPM.pagination.total = paginatedData?.meta?.total ?? 0
        IPM.pagination.page = paginatedData?.meta?.current_page ?? 1
        IPM.pagination.lastPage = paginatedData?.meta?.last_page ?? 1
        IPM.pagination.size = paginatedData?.meta?.per_page ?? 20

        IPM.processing = false
    }



    IPM.filter = auth.getSettings(IPM.scope+'_filter', {}, 'session')
    IPM.sort.field = auth.getSettings(IPM.scope+'_sort_field', null, 'session')
    IPM.sort.order = auth.getSettings(IPM.scope+'_sort_order', 'desc', 'session')
    IPM.pagination.page = auth.getSettings(IPM.scope+'_pagination_page', 1, 'session')
    IPM.pagination.size = auth.getSettings(IPM.scope+'_pagination_size', 20, 'db')
    IPM.columnSettings = auth.getSettings(IPM.scope+'_column_settings', [], 'db')



    // Fetch immediately if needed
    if (IPM.options.fetchImmediately) $fetch()



    // Return the IPM
    return IPM
}