export const markFormGroupTouched = (formGroup: { controls: any; }) => {
    (Object as any).values(formGroup.controls).forEach((control: { markAsTouched: () => void; controls: any; }) => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};
