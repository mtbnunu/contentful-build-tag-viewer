import React, { useCallback, useState, useEffect } from "react";
import { AppExtensionSDK } from "@contentful/app-sdk";
import {
  Heading,
  Form,
  Paragraph,
  Flex,
  Textarea,
} from "@contentful/f36-components";
import { css } from "emotion";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { Config } from "../interface";

export interface AppInstallationParameters {}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>();
  const [error, setError] = useState<string | null>(null);

  const sdk = useSDK<AppExtensionSDK>();

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      parameters,
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      const currentParameters: Config | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      } else {
        setParameters({
          pollingInterval: 5000,
          images: [{ url: "https://placekitten.com/g/100/100" }],
        });
      }

      sdk.app.setReady();
    })();
  }, [sdk]);

  const exampleConfig = `{
    "pollingInterval": 5000, //default polling interval (milliseconds)
    "images": [
      {
        "url": "https://placekitten.com/200/300", // image url
        "pollingInterval": 1000 //override polling interval
      },
      {
        "url": "https://placekitten.com/200/200", // image url
        "condition": {
          "tag": "tagId" // display only when entry has this tag
        }
      },
      {
        "url": "https://placekitten.com/300/100",
        "condition": {
          "id": "ASDF1234567ASDF" // display only when entry id is this
        }
      },
      {
        "urlField": "showThisImageField" // use the value of this field as url
      },
    ],
  }`;

  const updateParams = (v: string) => {
    setError(null);
    try {
      const value = JSON.parse(v);
      setParameters(value);
    } catch (e: any) {
      setError(e.toString());
    }
  };

  return (
    <Flex
      flexDirection="column"
      className={css({ margin: "80px", maxWidth: "800px" })}
    >
      <Form>
        <Heading>App Config</Heading>
        <Paragraph>Enter config as json. See example below</Paragraph>
        {error && <Paragraph style={{ color: "red" }}>{error}</Paragraph>}
        {
          <Textarea
            style={{ height: 600 }}
            onChange={(e) => updateParams(e.target.value)}
            defaultValue={JSON.stringify(parameters, null, 2)}
          ></Textarea>
        }
        <hr></hr>
        <Paragraph>Example Config: </Paragraph>
        <code style={{ whiteSpace: "pre" }}>{exampleConfig}</code>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
