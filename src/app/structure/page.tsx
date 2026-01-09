import { LeadersData } from "../_components/const/datas"
import Leader from "../_components/Leader"

const Structure = () => {
    return (
        <>
            <div className="mt-1">
                <Leader datas={LeadersData} />
            </div>
        </>
    )
}

export default Structure