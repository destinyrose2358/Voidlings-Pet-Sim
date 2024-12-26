import { useContext } from "react"
import { GameEngineContext } from "../../../game-engine/game-engine";
import { CTable } from "../../CTable";
import { EssenceData } from "../../../game-engine/essence-engine";

export function CEssenceTable() {
    const {
        essences: {
            essenceGetters: {
                getIds,
                getByIds
            }
        }
    } = useContext(GameEngineContext);

    return <CTable<EssenceData>
        getRecordIds={getIds}
        getRecords={getByIds}
        fields={[
            "name",
            "color"
        ]}
    />
}
