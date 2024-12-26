import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

export type RecordData = { [p: string]: any; }

export type Record<
    RECORDDATA extends RecordData
> = {
    id: number;
    data: RECORDDATA;
}

export type RecordsData<
    RECORDDATA extends RecordData
> = {
    [id: number]: RECORDDATA;
}

export type Records<
    RECORDDATA extends RecordData
> = {
    [id: number]: Record<RECORDDATA>;
}

export type CollectionEngineState<
    RECORDDATA extends RecordData
> = {
    records: Records<RECORDDATA>;
    nextId: number[];
}

export type CollectionEngineProps<
    RECORDDATA extends RecordData
> = {
    initialRecordsData: RecordsData<RECORDDATA>;
}

function recordsDataToRecords<
    RECORDDATA extends RecordData
>(recordsData: RecordsData<RECORDDATA>): [Records<RECORDDATA>, number[]] {
    let finalNextId = 0;
    return [
        Object.fromEntries(
            Object.entries(recordsData).map(
                ([idString, recordData]) => {
                    const id = Number(idString);
                    if (id > finalNextId) finalNextId = id + 1;
                    return [
                        id,
                        {
                            id: Number(id),
                            data: recordData
                        }
                    ]
                }
            )
        ),
        [finalNextId]
    ]
}

export function useCollectionEngine<
    RECORDDATA extends RecordData
>({
    initialRecordsData
}: CollectionEngineProps<RECORDDATA>) {
    const [
        initialRecords,
        initialNextId
    ] = useMemo(() => recordsDataToRecords(initialRecordsData), [initialRecordsData]);

    const [collectionEngineState, setCollectionEngineState] = useState<CollectionEngineState<RECORDDATA>>({
        records: initialRecords,
        nextId: initialNextId
    });

    // GETTERS

    const getIds = useCallback(() => {
        return Object.keys(collectionEngineState.records).map(Number);
    }, [
        collectionEngineState.records
    ]);

    const getById = useCallback((id: number) => {
        return collectionEngineState.records[id];
    }, [
        collectionEngineState.records
    ]);

    const getByIds = useCallback((ids: number[]) => {
        return ids.map((id) => collectionEngineState.records[id]);
    }, [
        collectionEngineState.records
    ])

    const recordsGetters = useMemo(() => {
        return {
            getIds,
            getById,
            getByIds
        }
    }, [
        getIds,
        getById,
        getByIds
    ]);

    // SETTERS

    const recordsSetters = useMemo(() => {
        const setByIdRaw = (recordData: RECORDDATA, id?: number) => {
            setCollectionEngineState((prevRecords) => produce<CollectionEngineState<RECORDDATA>, CollectionEngineState<RECORDDATA>>(prevRecords, draft => {
                let currentId: number;
                if (id === undefined) {
                    currentId = draft.nextId.shift()!;
                    if (draft.nextId.length === 0) draft.nextId = [currentId + 1];
                } else {
                    currentId = id;
                }
                draft.records[currentId] = {
                    id: currentId,
                    data: recordData
                }
            }));
        }

        return {
            setById: (recordData: RECORDDATA, id: number) => setByIdRaw(recordData, id),
            create: (newRecordData: RECORDDATA) => setByIdRaw(newRecordData)
        }
    }, [

    ]);

    // ENGINE
    const collectionEngine = useMemo(() => {
        return {
            records: collectionEngineState,
            recordsGetters,
            recordsSetters
        }
    }, [
        collectionEngineState,
        recordsGetters,
        recordsSetters
    ]);

    return collectionEngine;
}
