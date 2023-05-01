import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = <TData>(url: string) => {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, loading, error };
}
