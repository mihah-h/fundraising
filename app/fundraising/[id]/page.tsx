import Group from './item';
import Fundraising from './item';

export default async function FundraisingId ({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;

    return (
        <Fundraising id={id}/>
    )
}
