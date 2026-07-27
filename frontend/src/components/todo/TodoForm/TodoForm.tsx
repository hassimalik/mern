import Input from '@/components/common/input/Input';
import Button from '../../common/button/Button';
import React from 'react';


interface TodoFormProps {
    value : string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (even: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoForm({
    value,
    onChange,
    onSubmit,
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
            <Button className="bg-orange-500 text-gray-800 p-4" type="submit">
                Add Todo
            </Button>
        </form>
    )
}

