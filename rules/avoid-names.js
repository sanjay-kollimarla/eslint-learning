/**
 * ESLint Rule: avoid-names
 * Disallows specific identifier names for variables, functions, classes, etc.
 * Production-grade: strict schema, selective AST matching, messageIds,
 * no false positives (ignores property access), optimized for performance.
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow specific names for identifiers (variables, functions, classes, etc.)",
      recommended: false,
    },
    messages: {
      avoid: "Restricted identifier name - '{{name}}'.",
    },
    schema: [
      {
        type: "object",
        required: ["names"],
        properties: {
          names: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            minItems: 1,
          },
          caseInsensitive: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};

    const bannedNamesRaw = options.names || [];
    const caseInsensitive = options.caseInsensitive === true;

    // Normalize name set (case-sensitive or insensitive)
    const bannedNames = new Set(
      caseInsensitive
        ? bannedNamesRaw.map((n) => n.toLowerCase())
        : bannedNamesRaw,
    );

    // Utility: check name match
    const isBanned = (name) =>
      caseInsensitive ? bannedNames.has(name.toLowerCase()) : bannedNames.has(name);

    return {
      Identifier(node) {
        const { parent } = node;

        // Ignore property keys: obj.temp → NOT defining an identifier
        if (
          parent &&
          parent.type === "MemberExpression" &&
          parent.property === node &&
          !parent.computed
        ) {
          return;
        }

        // Ignore object literal keys: { temp: 1 }
        if (
          parent &&
          parent.type === "Property" &&
          parent.key === node &&
          !parent.computed
        ) {
          return;
        }

        // Ignore class members: class A { temp() {} }
        if (
          parent &&
          (parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") &&
          parent.key === node
        ) {
          return;
        }

        // Ignore default import names:
        // import temp from "./file.js"
        if (parent && parent.type === "ImportDefaultSpecifier") {
          // allow imports to use any name; banning this would break many libs
          return;
        }

        // Ignore import namespace names:
        // import * as temp from "./file.js"
        if (parent && parent.type === "ImportNamespaceSpecifier") {
          return;
        }

        // Ignore import specifiers:
        // import { temp as x } from "./file.js"
        if (parent && parent.type === "ImportSpecifier") {
          return;
        }

        // Ignore function/class names if desired (optional)
        // Keep them enabled by default because banning them is reasonable.

        // Now finally check identifier name
        if (isBanned(node.name)) {
          context.report({
            node,
            messageId: "avoid",
            data: { name: node.name },
          });
        }
      },
    };
  },
};
