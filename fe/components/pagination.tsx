import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react';

export default function PaginationCustom({ count, handleSubmit }: { count: number; handleSubmit: any }) {
    const [page, setPage] = useState(1);
    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
        handleSubmit(undefined, { page });
    };
    useEffect(() => {
        setPage(1);
    }, [count]);
    return (
        <Stack spacing={2} sx={{ marginTop: '10px', display: 'flex', alignItems: 'end' }}>
            <Pagination
                page={page}
                onChange={handleChangePage}
                count={count || 0}
                renderItem={(item) => (
                    <PaginationItem
                        sx={{ color: (theme) => theme.color.lightMain }}
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
}
