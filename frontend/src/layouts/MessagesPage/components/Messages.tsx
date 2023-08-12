import {useEffect, useState} from "react";
import {useOktaAuth} from "@okta/okta-react";
import {Message} from "@okta/okta-signin-widget/types/src/v2/ion/i18nTransformer";
import MessageModel from "../../../models/MessageModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import ReviewModel from "../../../models/ReviewModel";

export const Messages = () => {

    const {authState} = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [messages, setMessages] = useState<MessageModel[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {

        if(authState && authState?.isAuthenticated){
            const url = `http://localhost:8080/api/v1/messages/secure/show-user/messages/${authState?.accessToken?.claims.sub}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(url, requestOptions);
            if(!response.ok){
                throw new Error("Something went wrong!")
            }

            const responseJson = await response.json();
            const loadedMessages: MessageModel[] = [];
            for(const key in responseJson){
                loadedMessages.push({
                    id: responseJson[key].id,
                    title: responseJson[key].title,
                    question: responseJson[key].question,
                    user_email: responseJson[key].user_email,
                    admin_email: responseJson[key].admin_email,
                    closed: responseJson[key].closed,
                });
            }

            setMessages(loadedMessages);
            setIsLoadingMessages(false);
        }


        }

        fetchMessages().catch((error:any) => {
        setIsLoadingMessages(false);
        setHttpError(error.message);
        })
    },[authState]);


    if(isLoadingMessages){
       return( <SpinnerLoading/> )
    }
    if(httpError){
        return(
            <div className='container'>
                <div className='alert alert-danger' role='alert'>
                    {httpError}
                </div>
            </div>
        )
    }

return(
    <div className='mt-2'>
        {messages.length > 0 ?
            <>
                <h5>Twoje pytania</h5>
                {messages.map(message => (
                    <div key={message.id}>
                        <div className='card mt-2 shadow p-3 bg-body rounded'>
                            {message.response && message.admin_email ?
                                <h5 className='text-success'>Pytanie #{message.id}: {message.title}</h5>
                                :
                                <h5 className='text-danger'>Pytanie #{message.id}: {message.title}</h5>
                            }
                            <h6>{message.user_email}</h6>
                            <p>{message.question}</p>
                            <hr/>
                            <div>
                                <h5 >Odopwiedzi </h5>
                                {message.response && message.admin_email ?
                                    <>
                                        <h6>{message.admin_email} (admin)</h6>
                                        <p> {message.response} </p>
                                    </>
                                    :
                                    <p className='text-danger'><i>Wkrótce odpowiemy! Prosimy o cierpliwość</i></p>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </>
            :
            <h5>Tutaj wyświetlą się Twoje wszystkie zadane pytania. </h5>
        }
    </div>

)
}