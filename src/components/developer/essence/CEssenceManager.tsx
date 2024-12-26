import { useMemo, useState } from "react";
import { CEssenceManagerView } from "./CEssenceManagerView";

export type EssenceManagerViewMode = "view";

export function CEssenceManager() {
    const [mode, _setMode] = useState<EssenceManagerViewMode>("view");
    const renderedView = useMemo(() => {
        switch(mode) {
            default:
                return <CEssenceManagerView />
        }
    }, [
        mode
    ]);

    return renderedView;
}
