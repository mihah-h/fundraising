import Group from './item';

export default async function GroupId ({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;

    return (
        <Group id={id}/>
    )
}