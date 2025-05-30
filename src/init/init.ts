import {
    type Action,
    ChannelType,
    type Evaluator,
    type IAgentRuntime,
    type OnboardingConfig,
    type Provider,
    Role,
    type UUID,
    type World,
    createUniqueUuid,
    initializeOnboarding,
    logger,
} from '@elizaos/core';

import { PostgresDatabaseAdapter } from '@elizaos/adapter-postgres';

/**
 * Initializes the character with the provided runtime, configuration, actions, providers, and evaluators.
 * Registers actions, providers, and evaluators to the runtime. Registers runtime events for "DISCORD_WORLD_JOINED" and "DISCORD_SERVER_CONNECTED".
 *
 * @param {Object} param - Object containing runtime, config, actions, providers, and evaluators.
 * @param {IAgentRuntime} param.runtime - The runtime instance to use.
 * @param {OnboardingConfig} param.config - The configuration for onboarding.
 * @param {Action[]} [param.actions] - Optional array of actions to register.
 * @param {Provider[]} [param.providers] - Optional array of providers to register.
 * @param {Evaluator[]} [param.evaluators] - Optional array of evaluators to register.
 */
export const initCharacter = async ({
    runtime,
    config,
    actions,
    providers,
    evaluators,
}: {
    runtime: IAgentRuntime;
    config: OnboardingConfig;
    actions?: Action[];
    providers?: Provider[];
    evaluators?: Evaluator[];
}): Promise<void> => {
    console.log("@chris init")

    if (actions) {
        for (const action of actions) {
            runtime.registerAction(action);
            logger.info(`Registered action: ${action.name}`);
        }
    }

    if (providers) {
        for (const provider of providers) {
            runtime.registerProvider(provider);
            logger.info(`Registered provider: ${provider.name}`);
        }
    }

    if (evaluators) {
        for (const evaluator of evaluators) {
            runtime.registerEvaluator(evaluator);
            logger.info(`Registered evaluator: ${evaluator.name}`);
        }
    }

    const pgAdapter = new PostgresDatabaseAdapter({
        connectionString: process.env.POSTGRES_URL,
    });

    console.log(process.env.ANTHROPIC_API_KEY, '@chris ANTHROPIC_API_KEY');
};