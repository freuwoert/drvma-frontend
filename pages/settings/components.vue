<template>
    <SettingsTitle>App</SettingsTitle>
    <SettingsRow title="App logo">
        <AppLogo class="h-16"/>
    </SettingsRow>

    <SettingsTitle>Iod Components</SettingsTitle>
    <SettingsRow title="IodAlert"/>
    <IodAlert>Default</IodAlert>
    <IodAlert type="info">Info</IodAlert>
    <IodAlert type="success">Success</IodAlert>
    <IodAlert type="warning">Warning</IodAlert>
    <IodAlert type="error">Error</IodAlert>
    <IodAlert type="placeholder">Placeholder</IodAlert>
    <SettingsSpacer />

    <SettingsRow title="User Search">
        <DialogSearchUsers class="rounded-xl border"/>
    </SettingsRow>
    <SettingsRow title="Role Search">
        <DialogSearchRoles class="rounded-xl border"/>
    </SettingsRow>

    <SettingsRow title="IodPopup" description="Open a test popup">
        <IodButtonGroup class="flex-1" corner="pill">
            <IodButton variant="contained" @click="popupLeft.open()">Left</IodButton>
            <IodButton variant="contained" @click="popupCenter.open()">Center</IodButton>
            <IodButton variant="contained" @click="popupRight.open()">Right</IodButton>
        </IodButtonGroup>
    </SettingsRow>

    <SettingsRow title="IodIcon" description="Show an image or icon with or without background">
        <HeFlex horizontal gap=".5rem">
            <IodIcon icon="star" class="h-10 rounded-full text-zinc-700"/>
            <IodIcon icon="star_half" color="var(--bg-zinc-700)" class="h-10 rounded-full"/>
            <IodIcon image="https://api.dicebear.com/8.x/croodles/svg?seed=3" class="h-10 rounded-full"/>
            <IodIcon icon="star" use-backdrop class="h-10 rounded-full text-zinc-700"/>
            <IodIcon icon="star_half" color="var(--bg-zinc-700)" use-backdrop class="h-10 rounded-full"/>
            <IodIcon image="https://api.dicebear.com/8.x/croodles/svg?seed=3" use-backdrop class="h-10 rounded-full"/>
        </HeFlex>
    </SettingsRow>

    <SettingsRow title="IodProfileArray" description="Show an array of IodIcons">
        <IodProfileArray :data="profiles" :limit="6" class="ml-auto"/>
    </SettingsRow>

    <SettingsRow title="IodRange" description="Show a range slider">
        <IodRange :min="1" :max="5" :step=".5"/>
    </SettingsRow>

    <SettingsRow title="IodTimePicker" description="Show a time picker">
        <div class="flex flex-col">
            <IodTimePicker v-model="time"/>
        </div>
    </SettingsRow>

    <SettingsRow title="IodDatePicker" description="Show a date picker">
        <div class="flex flex-col">
            <IodDatePicker v-model="date"/>
        </div>
    </SettingsRow>

    <SettingsRow title="IodAddressPicker" description="Show an address picker">
        <div class="flex flex-col">
            <IodAddressPicker v-model="address"/>
        </div>
    </SettingsRow>

    <IodPopup ref="popupLeft" title="Left Popup" blur="0" placement="left"><span class="p-6">Lorem ipsum dolor sit amet consectetur adipisicing elit consequuntur</span></IodPopup>
    <IodPopup ref="popupCenter" title="Center Popup" blur="0" placement="center"><span class="p-6">Lorem ipsum dolor sit amet consectetur adipisicing elit consequuntur</span></IodPopup>
    <IodPopup ref="popupRight" title="Right Popup" blur="0" placement="right"><span class="p-6">Lorem ipsum dolor sit amet consectetur adipisicing elit consequuntur</span></IodPopup>
    
    
    
    <SettingsSpacer />
    <SettingsTitle>Media Picker</SettingsTitle>
    <SettingsRow title="Media Picker" description="Open a media picker popup">
        <IodButtonGroup class="flex-1" corner="pill">
            <IodIconButton variant="contained" icon="draft" @click="filePicker.open()"/>
            <IodIconButton variant="contained" icon="file_copy" @click="filesPicker.open()"/>
        </IodButtonGroup>
        <IodButtonGroup class="flex-1" corner="pill">
            <IodIconButton variant="contained" icon="folder" @click="dirPicker.open()"/>
            <IodIconButton variant="contained" icon="folder_copy" @click="dirsPicker.open()"/>
        </IodButtonGroup>
        <IodButtonGroup class="flex-1" corner="pill">
            <IodIconButton variant="contained" icon="photo_library" @click="imagePicker.open()"/>
            <IodIconButton variant="contained" icon="image" @click="jpegPicker.open()"/>
        </IodButtonGroup>
    </SettingsRow>

    <DialogMediaPicker ref="filePicker" @select="console.log" type="file"/>
    <DialogMediaPicker ref="filesPicker" @select="console.log" type="file" multiple/>
    <DialogMediaPicker ref="dirPicker" @select="console.log" type="directory"/>
    <DialogMediaPicker ref="dirsPicker" @select="console.log" type="directory" multiple/>
    <DialogMediaPicker ref="imagePicker" @select="console.log" type="file" mime="image/*"/>
    <DialogMediaPicker ref="jpegPicker" @select="console.log" type="file" mime="image/jpeg"/>



    <SettingsSpacer />
    <SettingsTitle>HTML Editor</SettingsTitle>
    <TextEditor v-model="text" label="HTML Editor" />

    {{ text }}
</template>

<script lang="ts" setup>
    const popupLeft = ref()
    const popupCenter = ref()
    const popupRight = ref()



    const profiles = ref([
        { label: 'Peter', icon: 'home', color: 'var(--bg-zinc-500)' },
        { label: 'Peter', icon: 'home', color: 'var(--bg-zinc-700)' },
        { label: 'Peter', icon: 'home', color: 'var(--bg-zinc-900)' },
        { label: 'Salem', image: 'https://api.dicebear.com/8.x/croodles/svg?seed=1' },
        { label: 'Mike', image: 'https://api.dicebear.com/8.x/croodles/svg?seed=2' },
        { label: 'Hugo', image: 'https://api.dicebear.com/8.x/croodles/svg?seed=3' },
    ])



    const time = ref(null)
    const date = ref(null)
    const address = ref(null)



    const filePicker = ref()
    const filesPicker = ref()
    const dirPicker = ref()
    const dirsPicker = ref()
    const imagePicker = ref()
    const jpegPicker = ref()



    const text = ref('')
</script>

<style lang="sass" scoped></style>
