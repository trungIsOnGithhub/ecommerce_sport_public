import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import { Container, Typography, styled } from '@mui/material';

export const TypographyStyle = styled(Typography)({
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '20px',
});

export const PStyle = styled('p')({
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
});

const Policy: NextPageWithLayout = () => {
    return (
        <Container>
            <TypographyStyle>Điều khoản sử dụng</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
            <TypographyStyle>Đăng ký sử dụng và đăng nhập tài khoản</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
            <TypographyStyle>Điều khoản sử dụng</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
            <TypographyStyle>Quyền thu thập và sử dụng thông tin</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
            <TypographyStyle>Quy định về nội dung thông tin trên website</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
            <TypographyStyle>Tuyên bố từ chối</TypographyStyle>
            <PStyle>
            Curabitur blandit eget ipsum ut maximus. Suspendisse pharetra lectus at est placerat, eget interdum est fermentum. Suspendisse eget lacus nec lectus sollicitudin condimentum. Nulla vulputate mollis nisi, ac sagittis neque convallis lacinia. Integer neque elit, vehicula ut vehicula at, luctus id odio. Nullam dictum nisi et sem pretium, eget aliquam ex pharetra. Mauris eu facilisis nibh. Donec ornare sodales erat, at posuere metus fermentum quis. Phasellus suscipit nulla dolor, ac cursus tellus tincidunt suscipit. Quisque ultrices vel purus ac semper.
            </PStyle>
        </Container>
    );
};
Policy.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default Policy;
