<template>
    <header>
        <HeFlex horizontal class="main-bar border-b">
            <AppHeaderItem :is="NuxtLink" to="/" v-tooltip="'Übersicht'">
                <AppLogo class="!w-8 !h-8" style="color: var(--color-text)"/>
            </AppHeaderItem>

            <HeDivider vertical class="h-8"/>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="auth.can('system.view.roles')">
                <AppHeaderItem show-chevron icon="encrypted" v-tooltip="'Berechtigungen'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/roles" show-chevron icon="encrypted">Berechtigungen</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="auth.can('system.view.users')">
                <AppHeaderItem show-chevron icon="group" v-tooltip="'Nutzer'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/users" show-chevron icon="group">Nutzer</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="auth.can('system.access.media')">
                <AppHeaderItem show-chevron icon="folder" v-tooltip="'Dateien'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/media/domain" show-chevron icon="home_storage">Hauptspeicher</ContextMenuItem>
                        <!-- <ContextMenuDivider />
                        <ContextMenuItem to="/media/forms" show-chevron icon="edit_square">Formular Dateien</ContextMenuItem> -->
                    </ContextMenu>
                </template>
            </VDropdown>

            <HeDivider vertical class="h-8 ml-2"/>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1">
                <AppHeaderItem show-chevron color="#3c9fff" icon="genetics" v-tooltip="'Gencestor'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/gencestor/pedigrees" show-chevron color="#3c9fff" icon="flowchart">Ahnentafeln</ContextMenuItem>
                        <ContextMenuItem to="/gencestor/animals" show-chevron color="#3c9fff" icon="pets">Tiere</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <!-- <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="devMode">
                <AppHeaderItem show-chevron color="#06B6D4" icon="edit_square" v-tooltip="'Formulare'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/forms" show-chevron color="#06B6D4" icon="edit_square">Formulare</ContextMenuItem>
                        <ContextMenuItem to="/forms/submissions" show-chevron color="#06B6D4" icon="inbox">Einsendungen</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="devMode">
                <AppHeaderItem show-chevron color="#10b981" icon="confirmation_number" v-tooltip="'Events'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/events" show-chevron color="#10b981" icon="confirmation_number">Events</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="devMode">
                <AppHeaderItem show-chevron color="#84cc16" icon="desktop_windows" v-tooltip="'Screens'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/screens/devices" show-chevron color="#84cc16" icon="desktop_windows">Geräte</ContextMenuItem>
                        <ContextMenuItem to="/screens/playlists" show-chevron color="#84cc16" icon="playlist_play">Playlists</ContextMenuItem>
                        <ContextMenuItem to="/screens/screens" show-chevron color="#84cc16" icon="slideshow">Screens</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="devMode">
                <AppHeaderItem show-chevron color="#F59E0B" icon="note_stack" v-tooltip="'Inhalte'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/content/posts" show-chevron color="#F59E0B" icon="news">Beträge</ContextMenuItem>
                        <ContextMenuDivider />
                        <ContextMenuItem to="/content/spaces" show-chevron color="#F59E0B" icon="data_array">Spaces</ContextMenuItem>
                        <ContextMenuItem to="/content/categories" show-chevron color="#F59E0B" icon="label">Kategorien</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown>
            
            <VDropdown placement="bottom-start" :skidding="-8" :distance="-1" v-if="devMode">
                <AppHeaderItem show-chevron color="#FF6348" icon="package_2" v-tooltip="'Produkte'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem show-chevron color="#FF6348" icon="package_2">Produkte</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown> -->

            <!-- <VDropdown placement="bottom-start" :skidding="-8" :distance="-1">
                <AppHeaderItem show-chevron color="#FF4757" icon="receipt" v-tooltip="'Buchhaltung'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <ContextMenuItem to="/accounting/contacts" show-chevron color="#FF4757" icon="domain">Kontakte</ContextMenuItem>
                        <ContextMenuDivider />
                        <ContextMenuItem show-chevron color="#FF4757" icon="article">Angebote</ContextMenuItem>
                        <ContextMenuItem show-chevron color="#FF4757" icon="home_repair_service">Aufträge</ContextMenuItem>
                        <ContextMenuItem show-chevron color="#FF4757" icon="receipt">Rechnungen</ContextMenuItem>
                        <ContextMenuDivider />
                        <ContextMenuItem show-chevron color="#FF4757" icon="credit_card_off">Rückerstattungen</ContextMenuItem>
                    </ContextMenu>
                </template>
            </VDropdown> -->
            
            <HeSpacer />

            <VDropdown placement="bottom-end" :skidding="-8" :distance="-1">
                <AppHeaderItem icon="cloud_upload" :badge="uploadManager.status.uploading || null" v-tooltip="`Uploads – ${uploadManager.statusText || 'Keine Uploads'}`"/>
                <template #popper>
                    <MediaUploadCard class="min-w-[26rem]"/>
                </template>
            </VDropdown>

            <VDropdown placement="bottom-end" :skidding="-8" :distance="-1">
                <AppHeaderItem icon="notifications" :badge="notifications.unread.length ?? null" v-tooltip="'Benachrichtigungen'"/>
                <template #popper>
                    <NotificationCenter class="min-w-[26rem]"/>
                </template>
            </VDropdown>

            <HeDivider vertical class="h-8"/>

            <VDropdown placement="bottom-end" :skidding="-8" :distance="-1">
                <ProfileChip v-if="auth.user" :title="auth.user.name || ''" :subtitle="auth.user.username || ''" :image="auth.user.avatar" align="right" v-tooltip="'Profil'"/>
                <template #popper>
                    <ContextMenu class="min-w-80">
                        <div class="flex gap-1 px-1">
                            <IodIconButton class="flex-1" corner="pill" :variant="theme === 'light'? 'contained' : 'text'" icon="light_mode" v-tooltip="'Theme: Hell'" @click="auth.setSettings('ui_theme', 'light', 'db')"/>
                            <IodIconButton class="flex-1" corner="pill" :variant="theme === 'dark'? 'contained' : 'text'" icon="dark_mode" v-tooltip="'Theme: Dunkel'" @click="auth.setSettings('ui_theme', 'dark', 'db')"/>
                            <IodIconButton class="flex-1" corner="pill" :variant="theme === 'system'? 'contained' : 'text'" icon="brightness_auto" v-tooltip="'Theme: System'" @click="auth.setSettings('ui_theme', 'system', 'db')"/>
                        </div>
                        <ContextMenuDivider />
                        <ContextMenuItem to="/auth/profile" show-chevron icon="person">Profil</ContextMenuItem>
                        <ContextMenuItem is="button" show-chevron color="var(--color-error)" icon="logout" @click="auth.logout()">Abmelden</ContextMenuItem>
                        <template v-if="auth.can('system.admin')">
                            <ContextMenuDivider />
                            <ContextMenuItem to="/settings" show-chevron icon="settings">Domain Einstellungen</ContextMenuItem>
                        </template>
                    </ContextMenu>
                </template>
            </VDropdown>
        </HeFlex>
    </header>
</template>

<script lang="ts" setup>
    const auth = useAuthStore()
    const devMode = useDevMode()
    const NuxtLink = defineNuxtLink({})
    const uploadManager = useUploadStore()
    const notifications = useNotificationStore()
    
    const theme = computed(() => {
        return auth.user?.settings.ui_theme ?? 'system'
    })
</script>

<style lang="sass" scoped>
    header
        width: 100%

    .main-bar
        background-color: var(--color-background)
        box-shadow: var(--shadow-s)
        padding: .5rem !important
        gap: .5rem !important

        .profile-chip
            height: 3rem
            padding-block: .5rem
</style>
