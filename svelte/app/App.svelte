<script lang="ts">
    import { ObservableArray } from '@nativescript/core';
    import { Template } from 'svelte-native/components';

    const itemsData = require('@shared/assets/data.json');
    let items: ObservableArray<any> = null;

    function onItemTap({ index, item }) {
        console.log(`EVENT TRIGGERED: Tapped on ${index} ${item.name}`);
    }
    // function onLoadMoreItems() {
    //     console.log('EVENT TRIGGERED: onLoadMoreItems()');
    //     items.push(...items);
    // }

    function refresh() {
        items = new ObservableArray(itemsData.products);
    }
    refresh();
</script>

<page disableCss={true}>
    <gridlayout color='red' rows="auto,*" disableCss={true}>
        <label text="test" disableCss={true}/>
        <collectionView {items} rowHeight={80} row="1" disableCss={true}>
            <Template let:item>
                <gridlayout backgroundColor="white" borderRadius={6} columns={'16,auto,*,auto,16'} rippleColor="green" rows={'auto,*,auto'} on:tap={(e) => console.log(item)} disableCss={true}>
                    <label
                        id="leftIcon"
                        class="mdi"
                        col={0}
                        color={'red'}
                        fontSize={24}
                        horizontalAlignment="left"
                        marginRight={16}
                        rowSpan={5}
                        text={item.icon}
                        textAlignment="left"
                        verticalAlignment="middle"
                        visibility={!!item.icon ? 'visible' : 'collapsed'}  disableCss={true}/>
                    <image
                        id="image"
                        backgroundColor="gray"
                        borderRadius={20}
                        col={1}
                        height={40}
                        marginRight={16}
                        row={1}
                        rowSpan={3}
                        src={item.thumbnail}
                        stretch="aspectFill"
                        verticalAlignment="center"
                        visibility={item.thumbnail ? 'visible' : 'hidden'}
                        width={40}  disableCss={true}/>

                    <stacklayout backgroundColor="yellow" col={2} row={1} rowSpan={3} verticalAlignment="center" disableCss={true}>
                        <label
                            id="overline"
                            backgroundColor="green"
                            col={2}
                            color={'black'}
                            fontSize={10}
                            row={1}
                            text={item.overText}
                            textTransform="uppercase"
                            textWrap={true}
                            verticalAlignment="center"
                            visibility={!!item.overText ? 'visible' : 'collapsed'}  disableCss={true}/>
                        <label id="title" fontSize={17} fontWeight="600" lineBreak="end" maxLines={2} text={item.title} textWrap={false} verticalTextAlignment="top"  disableCss={true}/>
                        <label
                            id="subtitle"
                            backgroundColor="red"
                            borderRadius={4}
                            color={'darkgray'}
                            fontSize={14}
                            lineBreak="end"
                            maxLines={2}
                            text={item.description}
                            textWrap={true}
                            verticalTextAlignment="top"
                            visibility={!!item.description ? 'visible' : 'collapsed'}  disableCss={true}/>
                    </stacklayout>

                    <label col={3} fontSize={10} text={item.rating} verticalAlignment="top" visibility={!!item.rating ? 'visible' : 'hidden'}  disableCss={true}/>
                    <gridlayout col={3} columns="auto" row={1} rowSpan={2} verticalAlignment="center" disableCss={true}>
                        <label
                            id="rightIcon"
                            color={'red'}
                            fontSize={24}
                            text={item.rightIcon}
                            textAlignment="right"
                            verticalAlignment="center"
                            visibility={!!item.rightIcon ? 'visible' : 'collapsed'}  disableCss={true}/>
                        <button id="rightButton" text={item.rightButton} verticalAlignment="center" visibility={!!item.rightButton ? 'visible' : 'collapsed'}  disableCss={true}/>
                    </gridlayout>

                    <absolutelayout id="border" backgroundColor="gray" colSpan={5} height={1} marginLeft={20} row={3} verticalAlignment="bottom"  disableCss={true}/>
                </gridlayout>
            </Template>
        </collectionView>
    </gridlayout>
</page>
