import { ReactElement } from 'react';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import Banner from '../../components/banner';
import { BoxContainStyles } from '../../components/boxcontain';
import bannerBG from '../../public/eventBG.jpg';
import { Event } from '../../feature/userEvent';
const User: NextPageWithLayout = () => {
    return (
        <BoxContainStyles>
            <Banner title={'Quản lý sự kiện'} imageBG={bannerBG} />
            <Event />
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
