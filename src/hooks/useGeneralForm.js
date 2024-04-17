import { useAppData } from "../App";

export default function useGeneralForm() {
    const app = useAppData();

    const openForm = (title, entries, onValidate, onSubmit) => {
        app._generalFormConfig({ title, entries });
        app._onGeneralFormValidate(onValidate);
        app._onGeneralFormSubmit(onSubmit);
        app.onGeneralFormOpen(true);
    };

    const closeForm = (clearData = false) => {
        if (clearData) {
            app._generalFormConfig({ title: "", entries: [] });
            app._onGeneralFormValidate(() => {});
            app._onGeneralFormSubmit(() => {});
        }
        app.onGeneralFormOpen(false);
    };

    return {
        open: openForm,
        close: closeForm,
    };
}
