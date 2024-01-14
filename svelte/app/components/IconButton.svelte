<script lang="ts">
    export let white = false;
    export let isEnabled = true;
    export let gray = false;
    export let isSelected = false;
    export let fontFamily: string = null;
    export let selectedColor = white ? 'white' : 'green';
    export let color: any = null;
    export let onLongPress: any = null;
    export let height: string | number = null;
    export let width: string | number = null;

    // let actualColor = null;
    // $: actualColor = white ? 'white' : !isEnabled || gray ? $subtitleColor : color;
    $: actualColor = color || (!isEnabled || gray ? 'gray' : 'black');
    $: actualLongPress = onLongPress;
</script>

<button
    color={isSelected ? selectedColor : actualColor}
    {fontFamily}
    fontSize={25}
    isEnabled={true}
    rippleColor={actualColor}
    visibility="visible"
    {...$$restProps}
    on:tap
    on:longPress={actualLongPress} />
<!-- <mdbutton
    {isEnabled}
    variant="text"
    shape={shape || (rounded ? 'round' : null)}
    disableCss={true}
    rippleColor={actualColor}
    {fontFamily}
    visibility={isVisible ? 'visible' : isHidden ? 'hidden' : 'collapsed'}
    color={isSelected ? selectedColor : actualColor}
    {...$$restProps}
    on:tap
    on:longPress={actualLongPress}
    width={width || size}
    height={height || size}
    fontSize={fontSize ? fontSize : small ? 16 : 24}
/> -->
