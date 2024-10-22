import JsonViewer from './JsonViewer.jsx';

export default {
    title: 'util/JsonViewer',
    component: JsonViewer,
};

export const Default =  {
    args: {
        data: {
            key1: 'value1',
            key2: 'value2',
            nested: {
                subkey: 'subvalue',
            },
        },
    }
};

