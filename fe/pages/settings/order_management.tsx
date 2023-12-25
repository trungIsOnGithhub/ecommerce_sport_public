import { ReactElement } from 'react';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import Banner from '../../components/banner';
import { BoxContainStyles } from '../../components/boxcontain';

import bannerBG from '../../public/li.jpg';
import { UserSchedule } from '../../feature/userScheduler';
const User: NextPageWithLayout = () => {
    return (
        <BoxContainStyles>
            <Banner title={'Quản lý lịch đặt sân'} imageBG={bannerBG} />
            <UserSchedule />
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
