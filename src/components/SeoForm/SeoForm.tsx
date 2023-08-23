// @ts-strict-ignore
import {
  CollectionErrorFragment,
  PageErrorFragment,
  ProductErrorFragment,
} from "@dashboard/graphql";
import { getFieldError, getProductErrorMessage } from "@dashboard/utils/errors";
import getPageErrorMessage from "@dashboard/utils/errors/page";
import { Box, Button, Input, Text, Textarea } from "@saleor/macaw-ui/next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { DashboardCard } from "../Card";

enum SeoField {
  slug = "slug",
  title = "seoTitle",
  description = "seoDescription",
}

const SLUG_REGEX = /^[a-zA-Z0-9\-_]+$/;
const maxSlugLength = 255;
const maxTitleLength = 70;
const maxDescriptionLength = 300;

interface SeoFormProps {
  description?: string | null;
  descriptionPlaceholder: string;
  disabled?: boolean;
  errors?: Array<
    PageErrorFragment | ProductErrorFragment | CollectionErrorFragment
  >;
  loading?: boolean;
  helperText?: string;
  allowEmptySlug?: boolean;
  title: string | null;
  slug: string;
  slugPlaceholder?: string;
  titlePlaceholder: string;
  onChange: (event: any) => any;
  onClick?: () => any;
}

export const SeoForm: React.FC<SeoFormProps> = props => {
  const {
    description,
    descriptionPlaceholder,
    disabled,
    errors = [],
    helperText,
    loading,
    title,
    slug,
    slugPlaceholder,
    titlePlaceholder,
    onChange,
  } = props;
  const intl = useIntl();

  const [expanded, setExpansionStatus] = React.useState(false);

  const toggleExpansion = () => setExpansionStatus(!expanded);

  const shouldDisplayHelperText = helperText && !expanded;

  const getSlugHelperMessage = () => {
    const error = !!getError(SeoField.slug);

    return error ? getSlugErrorMessage() : "";
  };

  const getSlugErrorMessage = () => {
    const error = getError(SeoField.slug);
    const { __typename: type } = error;

    return type === "ProductError"
      ? getProductErrorMessage(error as ProductErrorFragment, intl)
      : getPageErrorMessage(error as PageErrorFragment, intl);
  };

  const handleSlugChange = (event: React.ChangeEvent<any>) => {
    const { value } = event.target;

    if (value === "" || SLUG_REGEX.test(value)) {
      onChange(event);
    }
  };

  const getError = (fieldName: SeoField) => getFieldError(errors, fieldName);

  return (
    <DashboardCard>
      <DashboardCard.Title>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormattedMessage
            defaultMessage="Search Engine Preview"
            id="TGX4T1"
          />
          <Button
            variant="secondary"
            onClick={toggleExpansion}
            data-test-id="edit-seo"
            type="button"
          >
            <FormattedMessage
              id="s5Imt5"
              defaultMessage="Edit website SEO"
              description="button"
            />
          </Button>
        </Box>
      </DashboardCard.Title>
      <DashboardCard.Content>
        {shouldDisplayHelperText && <Text>{helperText}</Text>}
        {expanded && (
          <Box display="grid" gap={2}>
            <Box>
              <Input
                error={!!getError(SeoField.slug) || slug.length > maxSlugLength}
                name={SeoField.slug}
                label={
                  <Box display="flex" gap={1}>
                    <Box as="span">
                      <FormattedMessage defaultMessage="Slug" id="IoDlcd" />
                    </Box>
                    {slug?.length > 0 && (
                      <Box as="span">
                        <FormattedMessage
                          defaultMessage="({numberOfCharacters} of {maxCharacters} characters)"
                          id="yi1HSj"
                          values={{
                            maxCharacters: maxSlugLength,
                            numberOfCharacters: slug?.length,
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                }
                helperText={getSlugHelperMessage()}
                size="small"
                value={slug}
                onChange={handleSlugChange}
                disabled={loading || disabled}
                maxLength={maxSlugLength}
                placeholder={slugPlaceholder}
              />
            </Box>
            <Input
              size="small"
              error={title?.length > maxTitleLength}
              name={SeoField.title}
              value={title ?? ""}
              disabled={loading || disabled}
              onChange={onChange}
              maxLength={maxTitleLength}
              placeholder={titlePlaceholder}
              label={
                <Box display="flex" gap={1}>
                  <Box as="span">
                    <FormattedMessage
                      defaultMessage="Search engine title"
                      id="w2Cewo"
                    />
                  </Box>
                  {title?.length > 0 && (
                    <Box as="span">
                      <FormattedMessage
                        defaultMessage="({numberOfCharacters} of {maxCharacters} characters)"
                        id="yi1HSj"
                        values={{
                          maxCharacters: maxTitleLength,
                          numberOfCharacters: title?.length,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              }
            />

            <Textarea
              error={description?.length > maxDescriptionLength}
              name={SeoField.description}
              value={description ?? ""}
              disabled={loading || disabled}
              onChange={onChange}
              maxLength={maxDescriptionLength}
              placeholder={descriptionPlaceholder}
              label={
                <Box display="flex" gap={1}>
                  <Box as="span">
                    <FormattedMessage
                      id="CXTIq8"
                      defaultMessage="Search engine description"
                    />
                  </Box>
                  {description?.length > 0 && (
                    <Box as="span">
                      <FormattedMessage
                        id="ChAjJu"
                        defaultMessage="{numberOfCharacters} of {maxCharacters} characters"
                        description="character limit"
                        values={{
                          maxCharacters: maxDescriptionLength,
                          numberOfCharacters: description.length,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              }
            />
          </Box>
        )}
      </DashboardCard.Content>
    </DashboardCard>
  );
};
