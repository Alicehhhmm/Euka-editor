import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false)
    const apiMutation = useMutation(mutationFunction)

    const mutate = async (payload: any) => {
        setPending(true)
        return apiMutation(payload)
            .finally(() => {
                setPending(false)
            }).then((res) => {
                return res
            }).catch((err) => {
                return err
            });
    }

    return {
        mutate,
        pending,
    }
}
