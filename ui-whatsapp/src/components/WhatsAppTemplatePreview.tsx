import React from 'react';
import { CarouselContainer, MessageButton, MessageFooter, MessageTime, PreviewBody } from '../styles';
import Icon from '@octobots/ui/src/components/Icon';
import { Card, Carousel, Image } from "react-bootstrap";

interface IMapping {
  name: string;
  type: string; // "text", "image", etc.
}

interface IComponent {
  type: string; // "HEADER", "BODY", "BUTTONS", "FOOTER", etc.
  format?: string; // e.g. "IMAGE"
  text?: string;
  buttons?: Array<{
    type: string;   // "COPY_CODE", "URL", ...
    text: string;
    url?: string;
    example?: string[];
  }>;
  cards?: Array<{
    components?: IComponent[];
  }>;
  limited_time_offer?: {
    text: string;
    has_expiration: boolean;
  };
  example?: {
    header_handle?: string[];
    body_text?: string[][];
  };
}

interface ITemplate {
  _id: string;
  name: string;
  mapping?: IMapping[];
  components?: IComponent[];
}

// This utility replaces placeholders like {{1}} in the text
// with corresponding user input from `formValues`, if available.
function replacePlaceholders(
  text: string,
  formValues: Record<string, string>
): string {
  // Example: We look for BODY_{{1}} => user might have typed a value for key "BODY_{{1}}"
  // Or if the text literally has {{1}}, we attempt to replace with formValues["BODY_{{1}}"]
  // You can refine this logic if your placeholders differ.

  // A simple approach: find all `{{N}}` and replace with the formValues of "BODY_{{N}}" if it exists
  // (Alternatively, if your parameter_format is "POSITIONAL", you might have a direct index mapping.)
  let replaced = text;

  // Regex to match {{ANYTHING}}
  const regex = /\{\{(\d+)\}\}/g;

  replaced = replaced.replace(regex, (match, group1) => {
    // group1 might be "1" from {{1}}
    // Construct the key that might exist in formValues
    // e.g. "BODY_{{1}}"
    const candidateKey = `BODY_{{${group1}}}`;

    const userValue = formValues[candidateKey];
    return userValue !== undefined ? userValue : match; // fallback to original if not found
  });

  return replaced;
}

interface Props {
  template: ITemplate;
  formValues: Record<string, string>;
}

export function WhatsAppTemplatePreview({ template, formValues }: Props) {
  if (!template || !template.components) return null;

  const CarouselComponent = (tabs: any[]) => {
    return (
      <Card style={{ border: "none" }}>
        <Card.Body style={{ padding: "0px" }}>
          <Carousel
            controls={false}
            indicators={false}
          >
            {tabs.map((card, index) => {
              return <Carousel.Item key={index}>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "0px",
                  }}
                >
                  {card.components?.find(c => c.type === 'HEADER' && c.format === 'IMAGE') && (
                      <Image className="mt-2"
                        src={card.components.find(c => c.type === 'HEADER' && c.format === 'IMAGE')?.example?.header_handle?.[0]}
                        alt="Preview"
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                  )}

                  <div className="pt-2 pb-2">
                    <div style={{ whiteSpace: 'pre-line', marginBottom: 10 }}>
                      {card.components?.find(c => c.type === 'BODY')?.text}
                    </div>
                    {card.components?.find(c => c.type === 'BUTTONS') && (
                      <MessageFooter>
                        {card.components.find(c => c.type === 'BUTTONS')?.buttons?.map((button, btnIndex) => (
                          <MessageButton key={btnIndex}>
                            {button.type == "PHONE" && <Icon className="mx-2" icon={"phone"} />}
                            {button.type == "COPY_CODE" && <Icon className="mx-2" icon={"clipboard-blank"} />}
                            {button.type == "URL" && (<Icon className="mx-2" icon={"external-link-alt"} />)}
                            {button.text}
                          </MessageButton>
                        ))}
                      </MessageFooter>
                    )}
                  </div>
                </div>
              </Carousel.Item>
            })}
          </Carousel>
        </Card.Body>
      </Card>
    );
  };

  return (
    <PreviewBody>
      {template.components.map((comp, idx) => {
        switch (comp.type) {
          case 'HEADER': {
            // If it's an IMAGE header, we might display the example image or user-provided image
            if (comp.format === 'IMAGE') {
              // Check if the user typed a URL for "HEADER_IMAGE" in formValues?
              const userImageUrl = formValues['HEADER_IMAGE'];

              // Or fallback to the example URL from comp.example.header_handle
              const imageUrl =
                userImageUrl ||
                (comp.example?.header_handle && comp.example.header_handle[0]);

              return (
                <div key={idx} style={{ marginBottom: 10 }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Template Header"
                      style={{ maxWidth: '100%', maxHeight: 200 }}
                    />
                  ) : (
                    <p>No header image</p>
                  )}
                </div>
              );
            }
            // If there's a TEXT header, handle similarly...
            return null;
          }

          case 'BODY': {
            // Show the text, replacing placeholders with user input
            const rawText = comp.text || '';
            const finalText = replacePlaceholders(rawText, formValues);

            return (
              <div key={idx} style={{ whiteSpace: 'pre-line', marginBottom: 10 }}>
                {finalText}
              </div>
            );
          }

          case 'LIMITED_TIME_OFFER': {
            const { limited_time_offer } = comp;
            if (!limited_time_offer) return null;

            return (
              <div key={idx} style={{ marginBottom: 10 }}>
                <strong>{limited_time_offer.text}</strong>
                {limited_time_offer.has_expiration && (
                  <span> (Expires soon!)</span>
                )}
              </div>
            );
          }

          case 'BUTTONS': {
            if (!comp.buttons) return null;

            // Display each button
            return (
              <MessageFooter>
                <div key={idx} style={{ display: 'flex', gap: 5 }}>
                  {comp.buttons.map((btn, bIdx) => {
                    // If there's a placeholder in the URL, you can also replace it with formValues
                    // e.g., "https://feel.sa/{{1}}" -> "https://feel.sa/myValue"
                    let buttonUrl = btn.url || '';
                    // Find if there's a `{{N}}` in the URL
                    buttonUrl = buttonUrl.replace(/\{\{(\d+)\}\}/g, (match, group1) => {
                      const candidateKey = `BUTTON_${group1}`;
                      return formValues[candidateKey] || match;
                    });

                    return (
                      <MessageButton key={bIdx}
                        style={{
                          cursor: btn.type === 'URL' ? 'pointer' : 'default'
                        }}
                        onClick={() => {
                          if (btn.type === 'URL') {
                            window.open(buttonUrl, '_blank');
                          } else if (btn.type === 'COPY_CODE') {
                            // Maybe copy the code to clipboard
                            navigator.clipboard.writeText(btn.text);
                          }
                        }}
                      >
                        {btn.type == "PHONE" && <Icon className="mx-2" icon={"phone"} />}
                        {btn.type == "COPY_CODE" && <Icon className="mx-2" icon={"clipboard-blank"} />}
                        {btn.type == "URL" && (<Icon className="mx-2" icon={"external-link-alt"} />)}
                        {btn.text}
                      </MessageButton>
                    );
                  })}
                </div>
              </MessageFooter>
            );
          }

          case 'CAROUSEL': {
            return CarouselComponent(comp.cards || []);
          }

          default:
            return null;
        }
      })}
      <MessageTime>3:45 PM</MessageTime>
    </PreviewBody>
  );
}
