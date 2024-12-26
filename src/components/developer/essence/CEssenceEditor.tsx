import { InputHTMLAttributes, useCallback, useContext, useMemo, useState } from "react";
import { GameEngineContext } from "../../../game-engine/game-engine";
import { DEFAULT_ESSENCE_DATA, EssenceData } from "../../../game-engine/essence-engine";
import { produce } from "immer";

export type CEssenceEditorProps = {
    essenceId?: number;
}

export function CEssenceEditor({
    essenceId
}: CEssenceEditorProps) {
    const {
        essences: {
            essenceGetters: {
                getById
            },
            essenceSetters: {
                setById,
                create
            }
        }
    } = useContext(GameEngineContext);

    const currentEssence = useMemo(() => {
        if (essenceId !== undefined ) return getById(essenceId);
    }, [
        getById,
        essenceId
    ]);
    const [edittedEssenceData, setEdittedEssenceData] = useState(currentEssence === undefined ? DEFAULT_ESSENCE_DATA : currentEssence.data);

    const handleFieldChange = useCallback((fieldName: keyof EssenceData): InputHTMLAttributes<HTMLInputElement>["onChange"] => (e) => {
        setEdittedEssenceData((prevEssenceState) => produce(prevEssenceState, draft => {
            draft[fieldName] = e.target.value;
        }));
    }, []);

    const updateEssence = useCallback(() => {
        if (essenceId === undefined) {
            create(edittedEssenceData);
        } else {
            setById(edittedEssenceData, essenceId);
        }
    }, [
        essenceId,
        edittedEssenceData,
        setById,
        create
    ]);

    return <div>
        <label>
            Name:
            <input
                value={edittedEssenceData.name}
                onChange={handleFieldChange("name")}
            />
        </label>
        <button
            onClick={updateEssence}
        >Save</button>
    </div>
}
