import { useCallback, useEffect, useState } from 'react';

export default function useAxios(fnAxios: Function) {
    const [resData, setResData] = useState<any>(undefined);
    const [error, setError] = useState<any>(undefined);
    const [loading, setLoading] = useState<any>(false);
    const [params, setParams] = useState<any[]>([]);

    useEffect(() => {
        async function fn() {
            try {
                setLoading(true);
                const response = await fnAxios(...params);
                setResData(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        if (params.length !== 0) fn();
    }, [fnAxios, params]);

    return { resData, error, loading, setParams };
}
