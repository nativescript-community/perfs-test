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

<page>
    <gridlayout>
        <collectionView {items} rowHeight={80}>
            <Template let:item>
                <gridlayout backgroundColor="white" columns={'16,auto,*,auto,16'} rippleColor="green" rows={'auto,*,auto'} on:tap={(e) => console.log(item)}>
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
                        visibility={!!item.icon ? 'visible' : 'collapsed'} />
                    <image
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
                        width={40} />

                    <stacklayout backgroundColor="yellow" col={2} row={1} rowSpan={3} verticalAlignment="center">
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
                            visibility={!!item.overText ? 'visible' : 'collapsed'} />
                        <label id="title" color={'black'} fontSize={17} fontWeight="600" lineBreak="end" maxLines={2} text={item.title} textWrap={false} verticalTextAlignment="top" />
                        <label
                            id="subtitle"
                            backgroundColor="red"
                            color={'darkgray'}
                            fontSize={14}
                            lineBreak="end"
                            maxLines={2}
                            text={item.description}
                            textWrap={true}
                            verticalTextAlignment="top"
                            visibility={!!item.description ? 'visible' : 'collapsed'} />
                    </stacklayout>

                    <label col={3} fontSize={10} text={item.rating} verticalAlignment="top" visibility={!!item.rating ? 'visible' : 'hidden'} />
                    <gridlayout col={3} columns="auto" row={1} rowSpan={2} verticalAlignment="center">
                        <label
                            id="rightIcon"
                            color={'red'}
                            fontSize={24}
                            text={item.rightIcon}
                            textAlignment="right"
                            verticalAlignment="center"
                            visibility={!!item.rightIcon ? 'visible' : 'collapsed'} />
                        <button id="rightButton" text={item.rightButton} verticalAlignment="center" visibility={!!item.rightButton ? 'visible' : 'collapsed'} />
                    </gridlayout>

                    <absolutelayout id="border" backgroundColor="gray" colSpan={5} height={1} marginLeft={20} row={3} verticalAlignment="bottom" />
                </gridlayout>
            </Template>
        </collectionView>
    </gridlayout>
</page>
