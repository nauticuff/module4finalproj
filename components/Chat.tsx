import { cookies } from "next/headers"// import { getMessages } from '@/lib/data'
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function Chat() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/login')
    }

    const { data: messages, error: messagesError} = await supabase
        .from('messages')
        .select()
        .range(0, 49)
        .order('id', { ascending: false});

    // if(!messages?.length)
    //     return (
    //         <h1>No messages :(</h1>
    //     )
    

    return (
        <div>
            {messages && messages.map((message: any) => (
                <>
                    <li key={message.id}>{message}</li>
                </>
            ))}
            <p>Welcome back, {userData.user.email}</p>
        </div>
    )
}