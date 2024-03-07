import BaseLayout from "@/layout/BaseLayout";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
export default function Home(){
    return(
        <BaseLayout>
            <SpeelDagForm></SpeelDagForm>
        </BaseLayout>
    )
}