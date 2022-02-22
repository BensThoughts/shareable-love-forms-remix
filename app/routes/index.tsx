import RemixLink from '~/components/RemixLink';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';
import GridWrapper from '~/components/GridWrapper';
import FlexSection from '~/components/FlexSection';
import LogoSVG from '~/components/Layout/Background/LogoSVG';
import Card from '~/components/Card/Card';
import Title from '~/components/Title';
import GradientBorderCard from '~/components/Card/GradientBorderCard';

export default function Index() {
  return (
    <GridWrapper className="my-16">
      <FlexSection>
        <LogoSVG
          // width={600}
          // height={600}
          className="w-[20rem] h-[16rem] sm:w-auto sm:h-auto"
        />
      </FlexSection>
      <FlexSection>
        <Card
          className="max-w-2xl rounded-md bg-neutral-dark"
        >
          <div className="pb-4 w-full border-b-8 border-secondary">
            <Title className="text-neutral-lightest">About</Title>
          </div>
          <div className="mt-4 text-neutral-lighter">
          Sharable love forms is a website focused on forms that can help you with your love life. Pick from a form
          below, fill it out, and then share the results. Form results can be downloaded as a PDF file,
          or shared as a link.
          </div>

        </Card>
      </FlexSection>
      <FlexSection>
        <RemixLink
          to="/non-escalator-relationship"
          className="rounded-md"
        >
          <GradientBorderCard
            title="Non-Escalator Relationship Form"
            className={`self-center max-w-md`}
          >
            This is a form designed to help you think and talk about what you want in a relationship.
            <div className="flex justify-end w-full">
              <span className="inline-block text-neutral-lightest">
                goto <ChevronDoubleRightIcon className="inline-block w-5 h-5" />
              </span>
            </div>
          </GradientBorderCard>
        </RemixLink>
      </FlexSection>
    </GridWrapper>
  );
}
