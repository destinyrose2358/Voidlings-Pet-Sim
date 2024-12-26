import { useMemo } from "react"
import { RecordData, Records } from "../game-engine/utils/collection-engine";
import "./CTable.css";

export type CTableProps<
    RECORDDATA extends RecordData
> = {
    getRecordIds: () => number[];
    getRecords: (ids: number[]) => Records<RECORDDATA>;
    fields: (keyof RECORDDATA)[];
}

export function CTable<
    RECORDDATA extends RecordData
>({
    getRecordIds,
    getRecords,
    fields
}: CTableProps<RECORDDATA>) {
    const className = useMemo(() => {
        return ``
    }, [

    ]);

    const tableHeader = useMemo(() => {
        return <thead>
            <tr>
                { fields.map((field) => <th scope="col">{field.toString()}</th>) }
            </tr>
        </thead>
    }, [
        fields
    ]);

    const records = useMemo(() => {
        return getRecords(getRecordIds());
    }, [
        getRecordIds,
        getRecords
    ]);

    const tableBody = useMemo(() => {
        return <tbody>
            {
                Object.values(records).map(({data}) => {
                    return <tr>
                        {
                            fields.map((field, index) => {
                                const fieldData = data[field];
                                return index === 0 ? <th scope="row">{fieldData}</th> : <td>{fieldData}</td>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    }, [
        records,
        fields
    ]);

    return <div
        className="CTable"
    >
        <table
            className={className}
        >
            { tableHeader }
            { tableBody }
        </table>
    </div>
}
