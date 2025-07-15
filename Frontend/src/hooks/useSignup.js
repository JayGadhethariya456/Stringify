import React from 'react'
import { signup } from '../lib/api';
import { useMutation } from '@tanstack/react-query';

const useSignup = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    })

    return {
        isPending,
        error,
        signupMutation: mutate,
    }
}


export default useSignup