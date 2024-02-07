// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { createClient } from "@/supabase/server";

// const getMessages = async () => {

//     const cookieStore = cookies()
//     const supabase = createClient(cookieStore)

//     const { data: userData, error } = await supabase.auth.getUser()
//     if(error || !userData?.user){
//         redirect('/')
//     }

//     const { data: messages } = await supabase
//         .from('messages')
//         .select()
//         .range(0, 49)
//         .order('id', { ascending: false});

//     if(messages === null) return

//     return messages;
// }

// interface IInsertMessage {
//     message: string;
//     username: string;
//     is_authenticated: boolean
// }

// const insertMessage = async ({ message, username, is_authenticated }: IInsertMessage) => {
//     const { error } = await supabase
//         .from('messages') 
//         .insert({
//             text: message,
//             username,
//             is_authenticated
//         })
//     console.error(error)
// }

// export { getMessages, insertMessage }