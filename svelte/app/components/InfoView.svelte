<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { NativeViewElementNode } from 'svelte-native/dom';
    import IconButton from './IconButton.svelte';
    export let item: any;
</script>

<gridlayout {...$$restProps} columns="*,auto" padding="4 10 2 10" on:tap on:longPress>
    <flexlayout  flexDirection="column" margin={16}>
        <label
            text={item.name}
            fontWeight="bold"
            color={item.color}
            flexGrow={1}
            textWrap={true}
          />
          <label text={item.color} color={item.color}  flexGrow={1} flexShrink={0} />
    </flexlayout>
</gridlayout>
