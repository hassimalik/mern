import Input from '@/components/common/input/Input';
import Button from '../../common/button/Button';
import React from 'react';


interface TodoFormProps {
    value : string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (even: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

export default function TodoForm({
    value,
    onChange,
    onSubmit,
    isSubmitting,
}:TodoFormProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="flex items-center gap-3"
        >
            <Input
                type="text"
                placeholder="What needs to be done?"
                value={value}
                onChange={onChange}
                className="flex-1"
            />
            <Button disabled={isSubmitting} className="bg-orange-500 transition-colors cursor-pointer hover:bg-amber-300 text-gray-800 p-4" type="submit">
                Add Todo
            </Button>
        </form>
    )
}

