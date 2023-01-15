export async function GetLocalAsync(endpoint: string) {
    const local = "http://localhost:3000/api"
    const res: Response = await fetch(`${local}/${endpoint}`)
    const json = await res.json()
    return json
}