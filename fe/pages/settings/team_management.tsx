import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import { BasicTabs } from '../../feature/teamManagement';
import { BoxContainStyles } from '../../feature/teamManagement/styles';

const User: NextPageWithLayout = () => {
    return (
        <BoxContainStyles>
            <BasicTabs />
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
