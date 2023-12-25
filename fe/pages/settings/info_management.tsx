import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import bannerBG from '../../public/li.jpg';

import withAuth from '../../store/withAuth';
import Banner from '../../components/banner';
import { BoxContainStyles } from '../../components/boxcontain';

import { SettingsLayout } from '../../feature/layouts';
import { InfoProfile, SportProfile } from '../../feature/userManagement';
import { PaperStyles } from '../../feature/userManagement/styles';

const User: NextPageWithLayout = () => {
    return (
        <BoxContainStyles>
            <Banner title={'Quản lý thông tin cá nhân'} imageBG={bannerBG} />
            <PaperStyles elevation={3}>
                <InfoProfile />
                <SportProfile />
            </PaperStyles>
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
export default withAuth(User);
