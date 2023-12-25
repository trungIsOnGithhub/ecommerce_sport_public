import Image from 'next/image';
import { Box } from '@mui/material';
import { StaticImageData } from 'next/image';

import { ButtonStyle } from '../../components/button';
import {
    BoxAdvertisingCart,
    BoxContainAdvertisingCart,
    TypographyTitleCart,
    TypographyContentCart,
    BoxContainAboutUs,
    BoxDivideAboutUs,
    BoxTitleAboutUs,
    BoxContentAboutUs,
} from './advertisingCart.styles';

interface AdvertisingCartType {
    image: StaticImageData;
    title: string;
    content: string;
}

interface AdvertisingAboutUsType {
    image: StaticImageData;
    title: string;
    content: string;
    buttonName: string;
    link: string;
    reverse: boolean;
}

export const AdvertisingCart = ({ image, title, content }: AdvertisingCartType) => {
    return (
        <BoxAdvertisingCart>
            <BoxContainAdvertisingCart>
                <Image height="100px" width="100px" src={image} alt="logo spoty" />
                <TypographyTitleCart>{title}</TypographyTitleCart>
                <TypographyContentCart>{content}</TypographyContentCart>
            </BoxContainAdvertisingCart>
        </BoxAdvertisingCart>
    );
};

export const AdvertisingAboutUs = ({ image, title, content, buttonName, reverse, link }: AdvertisingAboutUsType) => {
    return (
        <BoxContainAboutUs image={image} reverse={reverse}>
            <Box>
                <BoxDivideAboutUs></BoxDivideAboutUs>
                <BoxTitleAboutUs>{title}</BoxTitleAboutUs>
            </Box>
            <BoxContentAboutUs>{content}</BoxContentAboutUs>
            <Box>
                <ButtonStyle variant="contained" href={link}>
                    {buttonName}
                </ButtonStyle>
            </Box>
        </BoxContainAboutUs>
    );
};
