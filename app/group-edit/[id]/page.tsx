import GroupEdit from './item';

export default async function GroupEditId ({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;

    return (
        <GroupEdit id={id}/>
    )
}
