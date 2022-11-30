interface ConfigMapData {
    [key: string]: any;
}

export type Namespace = {
    id: string;
    name: string;
    description: string;
}

export type ConfigMap = {
    name: string;
    namespaceId: string;
    description: string;
    data: ConfigMapData;
}
