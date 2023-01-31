import {useEffect, useState} from "react";
import axios from "axios";

export default function useAuth(){
    const [user, setUser] = useState<{username: string}|null>(null)
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/app-users/me");
                setUser(res.data);
            } catch (e) {
                console.error("You are not logged in", e);
            } finally {
                setIsReady(true);
            }
        })();
    }, []);

    return {user,isReady};
}