import Group from './item';
import Fundraising from './item';
import FundraisingCreation from './item';

export default async function FundraisingCreationId ({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;

    return (
        <FundraisingCreation id={id}/>
    )
}
