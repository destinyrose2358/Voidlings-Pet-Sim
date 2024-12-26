import { useMemo } from "react";
import { RecordsData, useCollectionEngine } from "./utils/collection-engine";
import essencesJSON from "../data/essences.json";
const ESSENCES: RecordsData<EssenceData> = essencesJSON;

export type EssenceData = {
    name: string;
    color: string;
}

export const DEFAULT_ESSENCE_DATA: EssenceData = {
    name: "",
    color: "black"
}

export function useEssenceEngine() {
    const {
        records: essences,
        recordsGetters,
        recordsSetters
    } = useCollectionEngine<EssenceData>({
        initialRecordsData: ESSENCES
    });

    // SETTERS

    const essenceSetters = useMemo(() => {
        return {
            ...recordsSetters
        }
    }, [
        recordsSetters
    ]);

    // GETTERS


    const essenceGetters = useMemo(() => {
        return {
            ...recordsGetters
        }
    }, [
        recordsGetters
    ]);

    const essenceEngine = useMemo(() => {
        return {
            essences,
            essenceGetters,
            essenceSetters
        }
    }, [
        essences,
        essenceGetters,
        essenceSetters
    ]);

    return essenceEngine;
}
