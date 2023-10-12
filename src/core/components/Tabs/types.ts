export type TabKey = string | number;

type TabsItem = {
    key: TabKey;
    label: string;
    children: string;
}

export type TabsState = {
    items: Array<TabsItem>;
    defaultActiveKey: TabKey;
};