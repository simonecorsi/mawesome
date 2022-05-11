/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 7351: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.issue = exports.issueCommand = void 0;
      const os = __importStar(__nccwpck_require__(2037));
      const utils_1 = __nccwpck_require__(5278);
      /**
       * Commands
       *
       * Command Format:
       *   ::name key=value,key=value::message
       *
       * Examples:
       *   ::warning::This is the message
       *   ::set-env name=MY_VAR::some value
       */
      function issueCommand(command, properties, message) {
        const cmd = new Command(command, properties, message);
        process.stdout.write(cmd.toString() + os.EOL);
      }
      exports.issueCommand = issueCommand;
      function issue(name, message = '') {
        issueCommand(name, {}, message);
      }
      exports.issue = issue;
      const CMD_STRING = '::';
      class Command {
        constructor(command, properties, message) {
          if (!command) {
            command = 'missing.command';
          }
          this.command = command;
          this.properties = properties;
          this.message = message;
        }
        toString() {
          let cmdStr = CMD_STRING + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
              if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                  if (first) {
                    first = false;
                  } else {
                    cmdStr += ',';
                  }
                  cmdStr += `${key}=${escapeProperty(val)}`;
                }
              }
            }
          }
          cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
          return cmdStr;
        }
      }
      function escapeData(s) {
        return utils_1
          .toCommandValue(s)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A');
      }
      function escapeProperty(s) {
        return utils_1
          .toCommandValue(s)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A')
          .replace(/:/g, '%3A')
          .replace(/,/g, '%2C');
      }
      //# sourceMappingURL=command.js.map

      /***/
    },

    /***/ 2186: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.getIDToken =
        exports.getState =
        exports.saveState =
        exports.group =
        exports.endGroup =
        exports.startGroup =
        exports.info =
        exports.notice =
        exports.warning =
        exports.error =
        exports.debug =
        exports.isDebug =
        exports.setFailed =
        exports.setCommandEcho =
        exports.setOutput =
        exports.getBooleanInput =
        exports.getMultilineInput =
        exports.getInput =
        exports.addPath =
        exports.setSecret =
        exports.exportVariable =
        exports.ExitCode =
          void 0;
      const command_1 = __nccwpck_require__(7351);
      const file_command_1 = __nccwpck_require__(717);
      const utils_1 = __nccwpck_require__(5278);
      const os = __importStar(__nccwpck_require__(2037));
      const path = __importStar(__nccwpck_require__(1017));
      const oidc_utils_1 = __nccwpck_require__(8041);
      /**
       * The code to exit an action
       */
      var ExitCode;
      (function (ExitCode) {
        /**
         * A code indicating that the action was successful
         */
        ExitCode[(ExitCode['Success'] = 0)] = 'Success';
        /**
         * A code indicating that the action was a failure
         */
        ExitCode[(ExitCode['Failure'] = 1)] = 'Failure';
      })((ExitCode = exports.ExitCode || (exports.ExitCode = {})));
      //-----------------------------------------------------------------------
      // Variables
      //-----------------------------------------------------------------------
      /**
       * Sets env variable for this action and future actions in the job
       * @param name the name of the variable to set
       * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function exportVariable(name, val) {
        const convertedVal = utils_1.toCommandValue(val);
        process.env[name] = convertedVal;
        const filePath = process.env['GITHUB_ENV'] || '';
        if (filePath) {
          const delimiter = '_GitHubActionsFileCommandDelimeter_';
          const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
          file_command_1.issueCommand('ENV', commandValue);
        } else {
          command_1.issueCommand('set-env', { name }, convertedVal);
        }
      }
      exports.exportVariable = exportVariable;
      /**
       * Registers a secret which will get masked from logs
       * @param secret value of the secret
       */
      function setSecret(secret) {
        command_1.issueCommand('add-mask', {}, secret);
      }
      exports.setSecret = setSecret;
      /**
       * Prepends inputPath to the PATH (for this action and future actions)
       * @param inputPath
       */
      function addPath(inputPath) {
        const filePath = process.env['GITHUB_PATH'] || '';
        if (filePath) {
          file_command_1.issueCommand('PATH', inputPath);
        } else {
          command_1.issueCommand('add-path', {}, inputPath);
        }
        process.env[
          'PATH'
        ] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
      }
      exports.addPath = addPath;
      /**
       * Gets the value of an input.
       * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
       * Returns an empty string if the value is not defined.
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   string
       */
      function getInput(name, options) {
        const val =
          process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
        if (options && options.required && !val) {
          throw new Error(`Input required and not supplied: ${name}`);
        }
        if (options && options.trimWhitespace === false) {
          return val;
        }
        return val.trim();
      }
      exports.getInput = getInput;
      /**
       * Gets the values of an multiline input.  Each value is also trimmed.
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   string[]
       *
       */
      function getMultilineInput(name, options) {
        const inputs = getInput(name, options)
          .split('\n')
          .filter((x) => x !== '');
        return inputs;
      }
      exports.getMultilineInput = getMultilineInput;
      /**
       * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
       * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
       * The return value is also in boolean type.
       * ref: https://yaml.org/spec/1.2/spec.html#id2804923
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   boolean
       */
      function getBooleanInput(name, options) {
        const trueValue = ['true', 'True', 'TRUE'];
        const falseValue = ['false', 'False', 'FALSE'];
        const val = getInput(name, options);
        if (trueValue.includes(val)) return true;
        if (falseValue.includes(val)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``
        );
      }
      exports.getBooleanInput = getBooleanInput;
      /**
       * Sets the value of an output.
       *
       * @param     name     name of the output to set
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function setOutput(name, value) {
        process.stdout.write(os.EOL);
        command_1.issueCommand('set-output', { name }, value);
      }
      exports.setOutput = setOutput;
      /**
       * Enables or disables the echoing of commands into stdout for the rest of the step.
       * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
       *
       */
      function setCommandEcho(enabled) {
        command_1.issue('echo', enabled ? 'on' : 'off');
      }
      exports.setCommandEcho = setCommandEcho;
      //-----------------------------------------------------------------------
      // Results
      //-----------------------------------------------------------------------
      /**
       * Sets the action status to failed.
       * When the action exits it will be with an exit code of 1
       * @param message add error issue message
       */
      function setFailed(message) {
        process.exitCode = ExitCode.Failure;
        error(message);
      }
      exports.setFailed = setFailed;
      //-----------------------------------------------------------------------
      // Logging Commands
      //-----------------------------------------------------------------------
      /**
       * Gets whether Actions Step Debug is on or not
       */
      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }
      exports.isDebug = isDebug;
      /**
       * Writes debug message to user log
       * @param message debug message
       */
      function debug(message) {
        command_1.issueCommand('debug', {}, message);
      }
      exports.debug = debug;
      /**
       * Adds an error issue
       * @param message error issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function error(message, properties = {}) {
        command_1.issueCommand(
          'error',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.error = error;
      /**
       * Adds a warning issue
       * @param message warning issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function warning(message, properties = {}) {
        command_1.issueCommand(
          'warning',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.warning = warning;
      /**
       * Adds a notice issue
       * @param message notice issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function notice(message, properties = {}) {
        command_1.issueCommand(
          'notice',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.notice = notice;
      /**
       * Writes info to log with console.log.
       * @param message info message
       */
      function info(message) {
        process.stdout.write(message + os.EOL);
      }
      exports.info = info;
      /**
       * Begin an output group.
       *
       * Output until the next `groupEnd` will be foldable in this group
       *
       * @param name The name of the output group
       */
      function startGroup(name) {
        command_1.issue('group', name);
      }
      exports.startGroup = startGroup;
      /**
       * End an output group.
       */
      function endGroup() {
        command_1.issue('endgroup');
      }
      exports.endGroup = endGroup;
      /**
       * Wrap an asynchronous function call in a group.
       *
       * Returns the same type as the function itself.
       *
       * @param name The name of the group
       * @param fn The function to wrap in the group
       */
      function group(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
          startGroup(name);
          let result;
          try {
            result = yield fn();
          } finally {
            endGroup();
          }
          return result;
        });
      }
      exports.group = group;
      //-----------------------------------------------------------------------
      // Wrapper action state
      //-----------------------------------------------------------------------
      /**
       * Saves state for current action, the state can only be retrieved by this action's post job execution.
       *
       * @param     name     name of the state to store
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function saveState(name, value) {
        command_1.issueCommand('save-state', { name }, value);
      }
      exports.saveState = saveState;
      /**
       * Gets the value of an state set by this action's main execution.
       *
       * @param     name     name of the state to get
       * @returns   string
       */
      function getState(name) {
        return process.env[`STATE_${name}`] || '';
      }
      exports.getState = getState;
      function getIDToken(aud) {
        return __awaiter(this, void 0, void 0, function* () {
          return yield oidc_utils_1.OidcClient.getIDToken(aud);
        });
      }
      exports.getIDToken = getIDToken;
      /**
       * Summary exports
       */
      var summary_1 = __nccwpck_require__(1327);
      Object.defineProperty(exports, 'summary', {
        enumerable: true,
        get: function () {
          return summary_1.summary;
        },
      });
      /**
       * @deprecated use core.summary
       */
      var summary_2 = __nccwpck_require__(1327);
      Object.defineProperty(exports, 'markdownSummary', {
        enumerable: true,
        get: function () {
          return summary_2.markdownSummary;
        },
      });
      //# sourceMappingURL=core.js.map

      /***/
    },

    /***/ 717: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      // For internal use, subject to change.
      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.issueCommand = void 0;
      // We use any as a valid input type
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const fs = __importStar(__nccwpck_require__(7147));
      const os = __importStar(__nccwpck_require__(2037));
      const utils_1 = __nccwpck_require__(5278);
      function issueCommand(command, message) {
        const filePath = process.env[`GITHUB_${command}`];
        if (!filePath) {
          throw new Error(
            `Unable to find environment variable for file command ${command}`
          );
        }
        if (!fs.existsSync(filePath)) {
          throw new Error(`Missing file at path: ${filePath}`);
        }
        fs.appendFileSync(
          filePath,
          `${utils_1.toCommandValue(message)}${os.EOL}`,
          {
            encoding: 'utf8',
          }
        );
      }
      exports.issueCommand = issueCommand;
      //# sourceMappingURL=file-command.js.map

      /***/
    },

    /***/ 8041: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.OidcClient = void 0;
      const http_client_1 = __nccwpck_require__(9925);
      const auth_1 = __nccwpck_require__(3702);
      const core_1 = __nccwpck_require__(2186);
      class OidcClient {
        static createHttpClient(allowRetry = true, maxRetry = 10) {
          const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry,
          };
          return new http_client_1.HttpClient(
            'actions/oidc-client',
            [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())],
            requestOptions
          );
        }
        static getRequestToken() {
          const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
          if (!token) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable'
            );
          }
          return token;
        }
        static getIDTokenUrl() {
          const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
          if (!runtimeUrl) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable'
            );
          }
          return runtimeUrl;
        }
        static getCall(id_token_url) {
          var _a;
          return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
              .getJson(id_token_url)
              .catch((error) => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
              });
            const id_token =
              (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
              throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
          });
        }
        static getIDToken(audience) {
          return __awaiter(this, void 0, void 0, function* () {
            try {
              // New ID Token is requested from action service
              let id_token_url = OidcClient.getIDTokenUrl();
              if (audience) {
                const encodedAudience = encodeURIComponent(audience);
                id_token_url = `${id_token_url}&audience=${encodedAudience}`;
              }
              core_1.debug(`ID token url is ${id_token_url}`);
              const id_token = yield OidcClient.getCall(id_token_url);
              core_1.setSecret(id_token);
              return id_token;
            } catch (error) {
              throw new Error(`Error message: ${error.message}`);
            }
          });
        }
      }
      exports.OidcClient = OidcClient;
      //# sourceMappingURL=oidc-utils.js.map

      /***/
    },

    /***/ 1327: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.summary =
        exports.markdownSummary =
        exports.SUMMARY_DOCS_URL =
        exports.SUMMARY_ENV_VAR =
          void 0;
      const os_1 = __nccwpck_require__(2037);
      const fs_1 = __nccwpck_require__(7147);
      const { access, appendFile, writeFile } = fs_1.promises;
      exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
      exports.SUMMARY_DOCS_URL =
        'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
      class Summary {
        constructor() {
          this._buffer = '';
        }
        /**
         * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
         * Also checks r/w permissions.
         *
         * @returns step summary file path
         */
        filePath() {
          return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
              return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
              throw new Error(
                `Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`
              );
            }
            try {
              yield access(
                pathFromEnv,
                fs_1.constants.R_OK | fs_1.constants.W_OK
              );
            } catch (_a) {
              throw new Error(
                `Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`
              );
            }
            this._filePath = pathFromEnv;
            return this._filePath;
          });
        }
        /**
         * Wraps content in an HTML tag, adding any HTML attributes
         *
         * @param {string} tag HTML tag to wrap
         * @param {string | null} content content within the tag
         * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
         *
         * @returns {string} content wrapped in HTML element
         */
        wrap(tag, content, attrs = {}) {
          const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
          if (!content) {
            return `<${tag}${htmlAttrs}>`;
          }
          return `<${tag}${htmlAttrs}>${content}</${tag}>`;
        }
        /**
         * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
         *
         * @param {SummaryWriteOptions} [options] (optional) options for write operation
         *
         * @returns {Promise<Summary>} summary instance
         */
        write(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0
              ? void 0
              : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
          });
        }
        /**
         * Clears the summary buffer and wipes the summary file
         *
         * @returns {Summary} summary instance
         */
        clear() {
          return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
          });
        }
        /**
         * Returns the current summary buffer as a string
         *
         * @returns {string} string of summary buffer
         */
        stringify() {
          return this._buffer;
        }
        /**
         * If the summary buffer is empty
         *
         * @returns {boolen} true if the buffer is empty
         */
        isEmptyBuffer() {
          return this._buffer.length === 0;
        }
        /**
         * Resets the summary buffer without writing to summary file
         *
         * @returns {Summary} summary instance
         */
        emptyBuffer() {
          this._buffer = '';
          return this;
        }
        /**
         * Adds raw text to the summary buffer
         *
         * @param {string} text content to add
         * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
         *
         * @returns {Summary} summary instance
         */
        addRaw(text, addEOL = false) {
          this._buffer += text;
          return addEOL ? this.addEOL() : this;
        }
        /**
         * Adds the operating system-specific end-of-line marker to the buffer
         *
         * @returns {Summary} summary instance
         */
        addEOL() {
          return this.addRaw(os_1.EOL);
        }
        /**
         * Adds an HTML codeblock to the summary buffer
         *
         * @param {string} code content to render within fenced code block
         * @param {string} lang (optional) language to syntax highlight code
         *
         * @returns {Summary} summary instance
         */
        addCodeBlock(code, lang) {
          const attrs = Object.assign({}, lang && { lang });
          const element = this.wrap('pre', this.wrap('code', code), attrs);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML list to the summary buffer
         *
         * @param {string[]} items list of items to render
         * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
         *
         * @returns {Summary} summary instance
         */
        addList(items, ordered = false) {
          const tag = ordered ? 'ol' : 'ul';
          const listItems = items.map((item) => this.wrap('li', item)).join('');
          const element = this.wrap(tag, listItems);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML table to the summary buffer
         *
         * @param {SummaryTableCell[]} rows table rows
         *
         * @returns {Summary} summary instance
         */
        addTable(rows) {
          const tableBody = rows
            .map((row) => {
              const cells = row
                .map((cell) => {
                  if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                  }
                  const { header, data, colspan, rowspan } = cell;
                  const tag = header ? 'th' : 'td';
                  const attrs = Object.assign(
                    Object.assign({}, colspan && { colspan }),
                    rowspan && { rowspan }
                  );
                  return this.wrap(tag, data, attrs);
                })
                .join('');
              return this.wrap('tr', cells);
            })
            .join('');
          const element = this.wrap('table', tableBody);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds a collapsable HTML details element to the summary buffer
         *
         * @param {string} label text for the closed state
         * @param {string} content collapsable content
         *
         * @returns {Summary} summary instance
         */
        addDetails(label, content) {
          const element = this.wrap(
            'details',
            this.wrap('summary', label) + content
          );
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML image tag to the summary buffer
         *
         * @param {string} src path to the image you to embed
         * @param {string} alt text description of the image
         * @param {SummaryImageOptions} options (optional) addition image attributes
         *
         * @returns {Summary} summary instance
         */
        addImage(src, alt, options) {
          const { width, height } = options || {};
          const attrs = Object.assign(
            Object.assign({}, width && { width }),
            height && { height }
          );
          const element = this.wrap(
            'img',
            null,
            Object.assign({ src, alt }, attrs)
          );
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML section heading element
         *
         * @param {string} text heading text
         * @param {number | string} [level=1] (optional) the heading level, default: 1
         *
         * @returns {Summary} summary instance
         */
        addHeading(text, level) {
          const tag = `h${level}`;
          const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
          const element = this.wrap(allowedTag, text);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML thematic break (<hr>) to the summary buffer
         *
         * @returns {Summary} summary instance
         */
        addSeparator() {
          const element = this.wrap('hr', null);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML line break (<br>) to the summary buffer
         *
         * @returns {Summary} summary instance
         */
        addBreak() {
          const element = this.wrap('br', null);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML blockquote to the summary buffer
         *
         * @param {string} text quote text
         * @param {string} cite (optional) citation url
         *
         * @returns {Summary} summary instance
         */
        addQuote(text, cite) {
          const attrs = Object.assign({}, cite && { cite });
          const element = this.wrap('blockquote', text, attrs);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML anchor tag to the summary buffer
         *
         * @param {string} text link text/content
         * @param {string} href hyperlink
         *
         * @returns {Summary} summary instance
         */
        addLink(text, href) {
          const element = this.wrap('a', text, { href });
          return this.addRaw(element).addEOL();
        }
      }
      const _summary = new Summary();
      /**
       * @deprecated use `core.summary`
       */
      exports.markdownSummary = _summary;
      exports.summary = _summary;
      //# sourceMappingURL=summary.js.map

      /***/
    },

    /***/ 5278: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      // We use any as a valid input type
      /* eslint-disable @typescript-eslint/no-explicit-any */
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.toCommandProperties = exports.toCommandValue = void 0;
      /**
       * Sanitizes an input into a string so it can be passed into issueCommand safely
       * @param input input to sanitize into a string
       */
      function toCommandValue(input) {
        if (input === null || input === undefined) {
          return '';
        } else if (typeof input === 'string' || input instanceof String) {
          return input;
        }
        return JSON.stringify(input);
      }
      exports.toCommandValue = toCommandValue;
      /**
       *
       * @param annotationProperties
       * @returns The command properties to send with the actual annotation command
       * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
       */
      function toCommandProperties(annotationProperties) {
        if (!Object.keys(annotationProperties).length) {
          return {};
        }
        return {
          title: annotationProperties.title,
          file: annotationProperties.file,
          line: annotationProperties.startLine,
          endLine: annotationProperties.endLine,
          col: annotationProperties.startColumn,
          endColumn: annotationProperties.endColumn,
        };
      }
      exports.toCommandProperties = toCommandProperties;
      //# sourceMappingURL=utils.js.map

      /***/
    },

    /***/ 1514: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.getExecOutput = exports.exec = void 0;
      const string_decoder_1 = __nccwpck_require__(1576);
      const tr = __importStar(__nccwpck_require__(8159));
      /**
       * Exec a command.
       * Output will be streamed to the live console.
       * Returns promise with return code
       *
       * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
       * @param     args               optional arguments for tool. Escaping is handled by the lib.
       * @param     options            optional exec options.  See ExecOptions
       * @returns   Promise<number>    exit code
       */
      function exec(commandLine, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
          const commandArgs = tr.argStringToArray(commandLine);
          if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
          }
          // Path to tool to execute should be first arg
          const toolPath = commandArgs[0];
          args = commandArgs.slice(1).concat(args || []);
          const runner = new tr.ToolRunner(toolPath, args, options);
          return runner.exec();
        });
      }
      exports.exec = exec;
      /**
       * Exec a command and get the output.
       * Output will be streamed to the live console.
       * Returns promise with the exit code and collected stdout and stderr
       *
       * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
       * @param     args                  optional arguments for tool. Escaping is handled by the lib.
       * @param     options               optional exec options.  See ExecOptions
       * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
       */
      function getExecOutput(commandLine, args, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
          let stdout = '';
          let stderr = '';
          //Using string decoder covers the case where a mult-byte character is split
          const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
          const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
          const originalStdoutListener =
            (_a =
              options === null || options === void 0
                ? void 0
                : options.listeners) === null || _a === void 0
              ? void 0
              : _a.stdout;
          const originalStdErrListener =
            (_b =
              options === null || options === void 0
                ? void 0
                : options.listeners) === null || _b === void 0
              ? void 0
              : _b.stderr;
          const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
              originalStdErrListener(data);
            }
          };
          const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
              originalStdoutListener(data);
            }
          };
          const listeners = Object.assign(
            Object.assign(
              {},
              options === null || options === void 0
                ? void 0
                : options.listeners
            ),
            { stdout: stdOutListener, stderr: stdErrListener }
          );
          const exitCode = yield exec(
            commandLine,
            args,
            Object.assign(Object.assign({}, options), { listeners })
          );
          //flush any remaining characters
          stdout += stdoutDecoder.end();
          stderr += stderrDecoder.end();
          return {
            exitCode,
            stdout,
            stderr,
          };
        });
      }
      exports.getExecOutput = getExecOutput;
      //# sourceMappingURL=exec.js.map

      /***/
    },

    /***/ 8159: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.argStringToArray = exports.ToolRunner = void 0;
      const os = __importStar(__nccwpck_require__(2037));
      const events = __importStar(__nccwpck_require__(2361));
      const child = __importStar(__nccwpck_require__(2081));
      const path = __importStar(__nccwpck_require__(1017));
      const io = __importStar(__nccwpck_require__(7436));
      const ioUtil = __importStar(__nccwpck_require__(1962));
      const timers_1 = __nccwpck_require__(9512);
      /* eslint-disable @typescript-eslint/unbound-method */
      const IS_WINDOWS = process.platform === 'win32';
      /*
       * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
       */
      class ToolRunner extends events.EventEmitter {
        constructor(toolPath, args, options) {
          super();
          if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
          }
          this.toolPath = toolPath;
          this.args = args || [];
          this.options = options || {};
        }
        _debug(message) {
          if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
          }
        }
        _getCommandString(options, noPrefix) {
          const toolPath = this._getSpawnFileName();
          const args = this._getSpawnArgs(options);
          let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
          if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
              cmd += toolPath;
              for (const a of args) {
                cmd += ` ${a}`;
              }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
              cmd += `"${toolPath}"`;
              for (const a of args) {
                cmd += ` ${a}`;
              }
            }
            // Windows (regular)
            else {
              cmd += this._windowsQuoteCmdArg(toolPath);
              for (const a of args) {
                cmd += ` ${this._windowsQuoteCmdArg(a)}`;
              }
            }
          } else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          }
          return cmd;
        }
        _processLineBuffer(data, strBuffer, onLine) {
          try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
              const line = s.substring(0, n);
              onLine(line);
              // the rest of the string ...
              s = s.substring(n + os.EOL.length);
              n = s.indexOf(os.EOL);
            }
            return s;
          } catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
          }
        }
        _getSpawnFileName() {
          if (IS_WINDOWS) {
            if (this._isCmdFile()) {
              return process.env['COMSPEC'] || 'cmd.exe';
            }
          }
          return this.toolPath;
        }
        _getSpawnArgs(options) {
          if (IS_WINDOWS) {
            if (this._isCmdFile()) {
              let argline = `/D /S /C "${this._windowsQuoteCmdArg(
                this.toolPath
              )}`;
              for (const a of this.args) {
                argline += ' ';
                argline += options.windowsVerbatimArguments
                  ? a
                  : this._windowsQuoteCmdArg(a);
              }
              argline += '"';
              return [argline];
            }
          }
          return this.args;
        }
        _endsWith(str, end) {
          return str.endsWith(end);
        }
        _isCmdFile() {
          const upperToolPath = this.toolPath.toUpperCase();
          return (
            this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT')
          );
        }
        _windowsQuoteCmdArg(arg) {
          // for .exe, apply the normal quoting rules that libuv applies
          if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
          }
          // otherwise apply quoting rules specific to the cmd.exe command line parser.
          // the libuv rules are generic and are not designed specifically for cmd.exe
          // command line parser.
          //
          // for a detailed description of the cmd.exe command line parser, refer to
          // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
          // need quotes for empty arg
          if (!arg) {
            return '""';
          }
          // determine whether the arg needs to be quoted
          const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"',
          ];
          let needsQuotes = false;
          for (const char of arg) {
            if (cmdSpecialChars.some((x) => x === char)) {
              needsQuotes = true;
              break;
            }
          }
          // short-circuit if quotes not needed
          if (!needsQuotes) {
            return arg;
          }
          // the following quoting rules are very similar to the rules that by libuv applies.
          //
          // 1) wrap the string in quotes
          //
          // 2) double-up quotes - i.e. " => ""
          //
          //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
          //    doesn't work well with a cmd.exe command line.
          //
          //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
          //    for example, the command line:
          //          foo.exe "myarg:""my val"""
          //    is parsed by a .NET console app into an arg array:
          //          [ "myarg:\"my val\"" ]
          //    which is the same end result when applying libuv quoting rules. although the actual
          //    command line from libuv quoting rules would look like:
          //          foo.exe "myarg:\"my val\""
          //
          // 3) double-up slashes that precede a quote,
          //    e.g.  hello \world    => "hello \world"
          //          hello\"world    => "hello\\""world"
          //          hello\\"world   => "hello\\\\""world"
          //          hello world\    => "hello world\\"
          //
          //    technically this is not required for a cmd.exe command line, or the batch argument parser.
          //    the reasons for including this as a .cmd quoting rule are:
          //
          //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
          //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
          //
          //    b) it's what we've been doing previously (by deferring to node default behavior) and we
          //       haven't heard any complaints about that aspect.
          //
          // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
          // escaped when used on the command line directly - even though within a .cmd file % can be escaped
          // by using %%.
          //
          // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
          // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
          //
          // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
          // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
          // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
          // to an external program.
          //
          // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
          // % can be escaped within a .cmd file.
          let reverse = '"';
          let quoteHit = true;
          for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
              reverse += '\\'; // double the slash
            } else if (arg[i - 1] === '"') {
              quoteHit = true;
              reverse += '"'; // double the quote
            } else {
              quoteHit = false;
            }
          }
          reverse += '"';
          return reverse.split('').reverse().join('');
        }
        _uvQuoteCmdArg(arg) {
          // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
          // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
          // is used.
          //
          // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
          // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
          // pasting copyright notice from Node within this function:
          //
          //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
          //
          //      Permission is hereby granted, free of charge, to any person obtaining a copy
          //      of this software and associated documentation files (the "Software"), to
          //      deal in the Software without restriction, including without limitation the
          //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
          //      sell copies of the Software, and to permit persons to whom the Software is
          //      furnished to do so, subject to the following conditions:
          //
          //      The above copyright notice and this permission notice shall be included in
          //      all copies or substantial portions of the Software.
          //
          //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
          //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          //      IN THE SOFTWARE.
          if (!arg) {
            // Need double quotation for empty argument
            return '""';
          }
          if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
          }
          if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
          }
          // Expected input/output:
          //   input : hello"world
          //   output: "hello\"world"
          //   input : hello""world
          //   output: "hello\"\"world"
          //   input : hello\world
          //   output: hello\world
          //   input : hello\\world
          //   output: hello\\world
          //   input : hello\"world
          //   output: "hello\\\"world"
          //   input : hello\\"world
          //   output: "hello\\\\\"world"
          //   input : hello world\
          //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
          //                             but it appears the comment is wrong, it should be "hello world\\"
          let reverse = '"';
          let quoteHit = true;
          for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
              reverse += '\\';
            } else if (arg[i - 1] === '"') {
              quoteHit = true;
              reverse += '\\';
            } else {
              quoteHit = false;
            }
          }
          reverse += '"';
          return reverse.split('').reverse().join('');
        }
        _cloneExecOptions(options) {
          options = options || {};
          const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000,
          };
          result.outStream = options.outStream || process.stdout;
          result.errStream = options.errStream || process.stderr;
          return result;
        }
        _getSpawnOptions(options, toolPath) {
          options = options || {};
          const result = {};
          result.cwd = options.cwd;
          result.env = options.env;
          result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
          if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
          }
          return result;
        }
        /**
         * Exec a tool.
         * Output will be streamed to the live console.
         * Returns promise with return code
         *
         * @param     tool     path to tool to exec
         * @param     options  optional exec options.  See ExecOptions
         * @returns   number
         */
        exec() {
          return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (
              !ioUtil.isRooted(this.toolPath) &&
              (this.toolPath.includes('/') ||
                (IS_WINDOWS && this.toolPath.includes('\\')))
            ) {
              // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
              this.toolPath = path.resolve(
                process.cwd(),
                this.options.cwd || process.cwd(),
                this.toolPath
              );
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) =>
              __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                  this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                  optionsNonNull.outStream.write(
                    this._getCommandString(optionsNonNull) + os.EOL
                  );
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                  this._debug(message);
                });
                if (
                  this.options.cwd &&
                  !(yield ioUtil.exists(this.options.cwd))
                ) {
                  return reject(
                    new Error(`The cwd: ${this.options.cwd} does not exist!`)
                  );
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(
                  fileName,
                  this._getSpawnArgs(optionsNonNull),
                  this._getSpawnOptions(this.options, fileName)
                );
                let stdbuffer = '';
                if (cp.stdout) {
                  cp.stdout.on('data', (data) => {
                    if (
                      this.options.listeners &&
                      this.options.listeners.stdout
                    ) {
                      this.options.listeners.stdout(data);
                    }
                    if (!optionsNonNull.silent && optionsNonNull.outStream) {
                      optionsNonNull.outStream.write(data);
                    }
                    stdbuffer = this._processLineBuffer(
                      data,
                      stdbuffer,
                      (line) => {
                        if (
                          this.options.listeners &&
                          this.options.listeners.stdline
                        ) {
                          this.options.listeners.stdline(line);
                        }
                      }
                    );
                  });
                }
                let errbuffer = '';
                if (cp.stderr) {
                  cp.stderr.on('data', (data) => {
                    state.processStderr = true;
                    if (
                      this.options.listeners &&
                      this.options.listeners.stderr
                    ) {
                      this.options.listeners.stderr(data);
                    }
                    if (
                      !optionsNonNull.silent &&
                      optionsNonNull.errStream &&
                      optionsNonNull.outStream
                    ) {
                      const s = optionsNonNull.failOnStdErr
                        ? optionsNonNull.errStream
                        : optionsNonNull.outStream;
                      s.write(data);
                    }
                    errbuffer = this._processLineBuffer(
                      data,
                      errbuffer,
                      (line) => {
                        if (
                          this.options.listeners &&
                          this.options.listeners.errline
                        ) {
                          this.options.listeners.errline(line);
                        }
                      }
                    );
                  });
                }
                cp.on('error', (err) => {
                  state.processError = err.message;
                  state.processExited = true;
                  state.processClosed = true;
                  state.CheckComplete();
                });
                cp.on('exit', (code) => {
                  state.processExitCode = code;
                  state.processExited = true;
                  this._debug(
                    `Exit code ${code} received from tool '${this.toolPath}'`
                  );
                  state.CheckComplete();
                });
                cp.on('close', (code) => {
                  state.processExitCode = code;
                  state.processExited = true;
                  state.processClosed = true;
                  this._debug(
                    `STDIO streams have closed for tool '${this.toolPath}'`
                  );
                  state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                  if (stdbuffer.length > 0) {
                    this.emit('stdline', stdbuffer);
                  }
                  if (errbuffer.length > 0) {
                    this.emit('errline', errbuffer);
                  }
                  cp.removeAllListeners();
                  if (error) {
                    reject(error);
                  } else {
                    resolve(exitCode);
                  }
                });
                if (this.options.input) {
                  if (!cp.stdin) {
                    throw new Error('child process missing stdin');
                  }
                  cp.stdin.end(this.options.input);
                }
              })
            );
          });
        }
      }
      exports.ToolRunner = ToolRunner;
      /**
       * Convert an arg string to an array of args. Handles escaping
       *
       * @param    argString   string of arguments
       * @returns  string[]    array of arguments
       */
      function argStringToArray(argString) {
        const args = [];
        let inQuotes = false;
        let escaped = false;
        let arg = '';
        function append(c) {
          // we only escape double quotes.
          if (escaped && c !== '"') {
            arg += '\\';
          }
          arg += c;
          escaped = false;
        }
        for (let i = 0; i < argString.length; i++) {
          const c = argString.charAt(i);
          if (c === '"') {
            if (!escaped) {
              inQuotes = !inQuotes;
            } else {
              append(c);
            }
            continue;
          }
          if (c === '\\' && escaped) {
            append(c);
            continue;
          }
          if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
          }
          if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
              args.push(arg);
              arg = '';
            }
            continue;
          }
          append(c);
        }
        if (arg.length > 0) {
          args.push(arg.trim());
        }
        return args;
      }
      exports.argStringToArray = argStringToArray;
      class ExecState extends events.EventEmitter {
        constructor(options, toolPath) {
          super();
          this.processClosed = false; // tracks whether the process has exited and stdio is closed
          this.processError = '';
          this.processExitCode = 0;
          this.processExited = false; // tracks whether the process has exited
          this.processStderr = false; // tracks whether stderr was written to
          this.delay = 10000; // 10 seconds
          this.done = false;
          this.timeout = null;
          if (!toolPath) {
            throw new Error('toolPath must not be empty');
          }
          this.options = options;
          this.toolPath = toolPath;
          if (options.delay) {
            this.delay = options.delay;
          }
        }
        CheckComplete() {
          if (this.done) {
            return;
          }
          if (this.processClosed) {
            this._setResult();
          } else if (this.processExited) {
            this.timeout = timers_1.setTimeout(
              ExecState.HandleTimeout,
              this.delay,
              this
            );
          }
        }
        _debug(message) {
          this.emit('debug', message);
        }
        _setResult() {
          // determine whether there is an error
          let error;
          if (this.processExited) {
            if (this.processError) {
              error = new Error(
                `There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`
              );
            } else if (
              this.processExitCode !== 0 &&
              !this.options.ignoreReturnCode
            ) {
              error = new Error(
                `The process '${this.toolPath}' failed with exit code ${this.processExitCode}`
              );
            } else if (this.processStderr && this.options.failOnStdErr) {
              error = new Error(
                `The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`
              );
            }
          }
          // clear the timeout
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.done = true;
          this.emit('done', error, this.processExitCode);
        }
        static HandleTimeout(state) {
          if (state.done) {
            return;
          }
          if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${
              state.delay / 1000
            } seconds of the exit event from process '${
              state.toolPath
            }'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
          }
          state._setResult();
        }
      }
      //# sourceMappingURL=toolrunner.js.map

      /***/
    },

    /***/ 3702: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      class BasicCredentialHandler {
        constructor(username, password) {
          this.username = username;
          this.password = password;
        }
        prepareRequest(options) {
          options.headers['Authorization'] =
            'Basic ' +
            Buffer.from(this.username + ':' + this.password).toString('base64');
        }
        // This handler cannot handle 401
        canHandleAuthentication(response) {
          return false;
        }
        handleAuthentication(httpClient, requestInfo, objs) {
          return null;
        }
      }
      exports.BasicCredentialHandler = BasicCredentialHandler;
      class BearerCredentialHandler {
        constructor(token) {
          this.token = token;
        }
        // currently implements pre-authorization
        // TODO: support preAuth = false where it hooks on 401
        prepareRequest(options) {
          options.headers['Authorization'] = 'Bearer ' + this.token;
        }
        // This handler cannot handle 401
        canHandleAuthentication(response) {
          return false;
        }
        handleAuthentication(httpClient, requestInfo, objs) {
          return null;
        }
      }
      exports.BearerCredentialHandler = BearerCredentialHandler;
      class PersonalAccessTokenCredentialHandler {
        constructor(token) {
          this.token = token;
        }
        // currently implements pre-authorization
        // TODO: support preAuth = false where it hooks on 401
        prepareRequest(options) {
          options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
        }
        // This handler cannot handle 401
        canHandleAuthentication(response) {
          return false;
        }
        handleAuthentication(httpClient, requestInfo, objs) {
          return null;
        }
      }
      exports.PersonalAccessTokenCredentialHandler =
        PersonalAccessTokenCredentialHandler;

      /***/
    },

    /***/ 9925: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const http = __nccwpck_require__(3685);
      const https = __nccwpck_require__(5687);
      const pm = __nccwpck_require__(6443);
      let tunnel;
      var HttpCodes;
      (function (HttpCodes) {
        HttpCodes[(HttpCodes['OK'] = 200)] = 'OK';
        HttpCodes[(HttpCodes['MultipleChoices'] = 300)] = 'MultipleChoices';
        HttpCodes[(HttpCodes['MovedPermanently'] = 301)] = 'MovedPermanently';
        HttpCodes[(HttpCodes['ResourceMoved'] = 302)] = 'ResourceMoved';
        HttpCodes[(HttpCodes['SeeOther'] = 303)] = 'SeeOther';
        HttpCodes[(HttpCodes['NotModified'] = 304)] = 'NotModified';
        HttpCodes[(HttpCodes['UseProxy'] = 305)] = 'UseProxy';
        HttpCodes[(HttpCodes['SwitchProxy'] = 306)] = 'SwitchProxy';
        HttpCodes[(HttpCodes['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
        HttpCodes[(HttpCodes['PermanentRedirect'] = 308)] = 'PermanentRedirect';
        HttpCodes[(HttpCodes['BadRequest'] = 400)] = 'BadRequest';
        HttpCodes[(HttpCodes['Unauthorized'] = 401)] = 'Unauthorized';
        HttpCodes[(HttpCodes['PaymentRequired'] = 402)] = 'PaymentRequired';
        HttpCodes[(HttpCodes['Forbidden'] = 403)] = 'Forbidden';
        HttpCodes[(HttpCodes['NotFound'] = 404)] = 'NotFound';
        HttpCodes[(HttpCodes['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
        HttpCodes[(HttpCodes['NotAcceptable'] = 406)] = 'NotAcceptable';
        HttpCodes[(HttpCodes['ProxyAuthenticationRequired'] = 407)] =
          'ProxyAuthenticationRequired';
        HttpCodes[(HttpCodes['RequestTimeout'] = 408)] = 'RequestTimeout';
        HttpCodes[(HttpCodes['Conflict'] = 409)] = 'Conflict';
        HttpCodes[(HttpCodes['Gone'] = 410)] = 'Gone';
        HttpCodes[(HttpCodes['TooManyRequests'] = 429)] = 'TooManyRequests';
        HttpCodes[(HttpCodes['InternalServerError'] = 500)] =
          'InternalServerError';
        HttpCodes[(HttpCodes['NotImplemented'] = 501)] = 'NotImplemented';
        HttpCodes[(HttpCodes['BadGateway'] = 502)] = 'BadGateway';
        HttpCodes[(HttpCodes['ServiceUnavailable'] = 503)] =
          'ServiceUnavailable';
        HttpCodes[(HttpCodes['GatewayTimeout'] = 504)] = 'GatewayTimeout';
      })((HttpCodes = exports.HttpCodes || (exports.HttpCodes = {})));
      var Headers;
      (function (Headers) {
        Headers['Accept'] = 'accept';
        Headers['ContentType'] = 'content-type';
      })((Headers = exports.Headers || (exports.Headers = {})));
      var MediaTypes;
      (function (MediaTypes) {
        MediaTypes['ApplicationJson'] = 'application/json';
      })((MediaTypes = exports.MediaTypes || (exports.MediaTypes = {})));
      /**
       * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      function getProxyUrl(serverUrl) {
        let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
        return proxyUrl ? proxyUrl.href : '';
      }
      exports.getProxyUrl = getProxyUrl;
      const HttpRedirectCodes = [
        HttpCodes.MovedPermanently,
        HttpCodes.ResourceMoved,
        HttpCodes.SeeOther,
        HttpCodes.TemporaryRedirect,
        HttpCodes.PermanentRedirect,
      ];
      const HttpResponseRetryCodes = [
        HttpCodes.BadGateway,
        HttpCodes.ServiceUnavailable,
        HttpCodes.GatewayTimeout,
      ];
      const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
      const ExponentialBackoffCeiling = 10;
      const ExponentialBackoffTimeSlice = 5;
      class HttpClientError extends Error {
        constructor(message, statusCode) {
          super(message);
          this.name = 'HttpClientError';
          this.statusCode = statusCode;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }
      }
      exports.HttpClientError = HttpClientError;
      class HttpClientResponse {
        constructor(message) {
          this.message = message;
        }
        readBody() {
          return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
              resolve(output.toString());
            });
          });
        }
      }
      exports.HttpClientResponse = HttpClientResponse;
      function isHttps(requestUrl) {
        let parsedUrl = new URL(requestUrl);
        return parsedUrl.protocol === 'https:';
      }
      exports.isHttps = isHttps;
      class HttpClient {
        constructor(userAgent, handlers, requestOptions) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = userAgent;
          this.handlers = handlers || [];
          this.requestOptions = requestOptions;
          if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
              this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
              this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade =
                requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
              this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
              this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
              this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
              this._maxRetries = requestOptions.maxRetries;
            }
          }
        }
        options(requestUrl, additionalHeaders) {
          return this.request(
            'OPTIONS',
            requestUrl,
            null,
            additionalHeaders || {}
          );
        }
        get(requestUrl, additionalHeaders) {
          return this.request('GET', requestUrl, null, additionalHeaders || {});
        }
        del(requestUrl, additionalHeaders) {
          return this.request(
            'DELETE',
            requestUrl,
            null,
            additionalHeaders || {}
          );
        }
        post(requestUrl, data, additionalHeaders) {
          return this.request(
            'POST',
            requestUrl,
            data,
            additionalHeaders || {}
          );
        }
        patch(requestUrl, data, additionalHeaders) {
          return this.request(
            'PATCH',
            requestUrl,
            data,
            additionalHeaders || {}
          );
        }
        put(requestUrl, data, additionalHeaders) {
          return this.request('PUT', requestUrl, data, additionalHeaders || {});
        }
        head(requestUrl, additionalHeaders) {
          return this.request(
            'HEAD',
            requestUrl,
            null,
            additionalHeaders || {}
          );
        }
        sendStream(verb, requestUrl, stream, additionalHeaders) {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        }
        /**
         * Gets a typed object from an endpoint
         * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
         */
        async getJson(requestUrl, additionalHeaders = {}) {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          let res = await this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }
        async postJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          let res = await this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }
        async putJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          let res = await this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }
        async patchJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          let res = await this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }
        /**
         * Makes a raw http request.
         * All other methods such as get, post, patch, and request ultimately call this.
         * Prefer get, del, post and patch
         */
        async request(verb, requestUrl, data, headers) {
          if (this._disposed) {
            throw new Error('Client has already been disposed.');
          }
          let parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          // Only perform retries on reads since writes may not be idempotent.
          let maxTries =
            this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
              ? this._maxRetries + 1
              : 1;
          let numTries = 0;
          let response;
          while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (
              response &&
              response.message &&
              response.message.statusCode === HttpCodes.Unauthorized
            ) {
              let authenticationHandler;
              for (let i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].canHandleAuthentication(response)) {
                  authenticationHandler = this.handlers[i];
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(
                  this,
                  info,
                  data
                );
              } else {
                // We have received an unauthorized response but have no handlers to handle it.
                // Let the response return to the caller.
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (
              HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
              this._allowRedirects &&
              redirectsRemaining > 0
            ) {
              const redirectUrl = response.message.headers['location'];
              if (!redirectUrl) {
                // if there's no location to redirect to, we won't
                break;
              }
              let parsedRedirectUrl = new URL(redirectUrl);
              if (
                parsedUrl.protocol == 'https:' &&
                parsedUrl.protocol != parsedRedirectUrl.protocol &&
                !this._allowRedirectDowngrade
              ) {
                throw new Error(
                  'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
                );
              }
              // we need to finish reading the response before reassigning response
              // which will leak the open socket.
              await response.readBody();
              // strip authorization header if redirected to a different hostname
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (let header in headers) {
                  // header names are case insensitive
                  if (header.toLowerCase() === 'authorization') {
                    delete headers[header];
                  }
                }
              }
              // let's make the request with the new redirectUrl
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = await this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (
              HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1
            ) {
              // If not a retry code, return immediately instead of retrying
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              await response.readBody();
              await this._performExponentialBackoff(numTries);
            }
          }
          return response;
        }
        /**
         * Needs to be called if keepAlive is set to true in request options.
         */
        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }
          this._disposed = true;
        }
        /**
         * Raw request.
         * @param info
         * @param data
         */
        requestRaw(info, data) {
          return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
              if (err) {
                reject(err);
              }
              resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        }
        /**
         * Raw request with callback.
         * @param info
         * @param data
         * @param onResult
         */
        requestRawWithCallback(info, data, onResult) {
          let socket;
          if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(
              data,
              'utf8'
            );
          }
          let callbackCalled = false;
          let handleResult = (err, res) => {
            if (!callbackCalled) {
              callbackCalled = true;
              onResult(err, res);
            }
          };
          let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
          });
          req.on('socket', (sock) => {
            socket = sock;
          });
          // If we ever get disconnected, we want the socket to timeout eventually
          req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
              socket.end();
            }
            handleResult(
              new Error('Request timeout: ' + info.options.path),
              null
            );
          });
          req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
          });
          if (data && typeof data === 'string') {
            req.write(data, 'utf8');
          }
          if (data && typeof data !== 'string') {
            data.on('close', function () {
              req.end();
            });
            data.pipe(req);
          } else {
            req.end();
          }
        }
        /**
         * Gets an http agent. This function is useful when you need an http agent that handles
         * routing through a proxy server - depending upon the url and proxy environment variables.
         * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
         */
        getAgent(serverUrl) {
          let parsedUrl = new URL(serverUrl);
          return this._getAgent(parsedUrl);
        }
        _prepareRequest(method, requestUrl, headers) {
          const info = {};
          info.parsedUrl = requestUrl;
          const usingSsl = info.parsedUrl.protocol === 'https:';
          info.httpModule = usingSsl ? https : http;
          const defaultPort = usingSsl ? 443 : 80;
          info.options = {};
          info.options.host = info.parsedUrl.hostname;
          info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
          info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
          info.options.method = method;
          info.options.headers = this._mergeHeaders(headers);
          if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
          }
          info.options.agent = this._getAgent(info.parsedUrl);
          // gives handlers an opportunity to participate
          if (this.handlers) {
            this.handlers.forEach((handler) => {
              handler.prepareRequest(info.options);
            });
          }
          return info;
        }
        _mergeHeaders(headers) {
          const lowercaseKeys = (obj) =>
            Object.keys(obj).reduce(
              (c, k) => ((c[k.toLowerCase()] = obj[k]), c),
              {}
            );
          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign(
              {},
              lowercaseKeys(this.requestOptions.headers),
              lowercaseKeys(headers)
            );
          }
          return lowercaseKeys(headers || {});
        }
        _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
          const lowercaseKeys = (obj) =>
            Object.keys(obj).reduce(
              (c, k) => ((c[k.toLowerCase()] = obj[k]), c),
              {}
            );
          let clientHeader;
          if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
          }
          return additionalHeaders[header] || clientHeader || _default;
        }
        _getAgent(parsedUrl) {
          let agent;
          let proxyUrl = pm.getProxyUrl(parsedUrl);
          let useProxy = proxyUrl && proxyUrl.hostname;
          if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
          }
          if (this._keepAlive && !useProxy) {
            agent = this._agent;
          }
          // if agent is already assigned use that agent.
          if (!!agent) {
            return agent;
          }
          const usingSsl = parsedUrl.protocol === 'https:';
          let maxSockets = 100;
          if (!!this.requestOptions) {
            maxSockets =
              this.requestOptions.maxSockets || http.globalAgent.maxSockets;
          }
          if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
              tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
              maxSockets: maxSockets,
              keepAlive: this._keepAlive,
              proxy: {
                ...((proxyUrl.username || proxyUrl.password) && {
                  proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
                }),
                host: proxyUrl.hostname,
                port: proxyUrl.port,
              },
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
              tunnelAgent = overHttps
                ? tunnel.httpsOverHttps
                : tunnel.httpsOverHttp;
            } else {
              tunnelAgent = overHttps
                ? tunnel.httpOverHttps
                : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
          }
          // if reusing agent across request and tunneling agent isn't assigned create a new agent
          if (this._keepAlive && !agent) {
            const options = {
              keepAlive: this._keepAlive,
              maxSockets: maxSockets,
            };
            agent = usingSsl
              ? new https.Agent(options)
              : new http.Agent(options);
            this._agent = agent;
          }
          // if not using private agent and tunnel agent isn't setup then use global agent
          if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
          }
          if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
              rejectUnauthorized: false,
            });
          }
          return agent;
        }
        _performExponentialBackoff(retryNumber) {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        }
        static dateTimeDeserializer(key, value) {
          if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
              return a;
            }
          }
          return value;
        }
        async _processResponse(res, options) {
          return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
              statusCode: statusCode,
              result: null,
              headers: {},
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
              resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
              contents = await res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
              // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
              let msg;
              // if exception/error in body, attempt to get better error
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                // it may be the case that the exception is in the body message as string
                msg = contents;
              } else {
                msg = 'Failed request: (' + statusCode + ')';
              }
              let err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          });
        }
      }
      exports.HttpClient = HttpClient;

      /***/
    },

    /***/ 6443: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      function getProxyUrl(reqUrl) {
        let usingSsl = reqUrl.protocol === 'https:';
        let proxyUrl;
        if (checkBypass(reqUrl)) {
          return proxyUrl;
        }
        let proxyVar;
        if (usingSsl) {
          proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        } else {
          proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
        if (proxyVar) {
          proxyUrl = new URL(proxyVar);
        }
        return proxyUrl;
      }
      exports.getProxyUrl = getProxyUrl;
      function checkBypass(reqUrl) {
        if (!reqUrl.hostname) {
          return false;
        }
        let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
        if (!noProxy) {
          return false;
        }
        // Determine the request port
        let reqPort;
        if (reqUrl.port) {
          reqPort = Number(reqUrl.port);
        } else if (reqUrl.protocol === 'http:') {
          reqPort = 80;
        } else if (reqUrl.protocol === 'https:') {
          reqPort = 443;
        }
        // Format the request hostname and hostname with port
        let upperReqHosts = [reqUrl.hostname.toUpperCase()];
        if (typeof reqPort === 'number') {
          upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
        }
        // Compare request host against noproxy
        for (let upperNoProxyItem of noProxy
          .split(',')
          .map((x) => x.trim().toUpperCase())
          .filter((x) => x)) {
          if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
            return true;
          }
        }
        return false;
      }
      exports.checkBypass = checkBypass;

      /***/
    },

    /***/ 1962: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var _a;
      Object.defineProperty(exports, '__esModule', { value: true });
      const assert_1 = __nccwpck_require__(9491);
      const fs = __nccwpck_require__(7147);
      const path = __nccwpck_require__(1017);
      (_a = fs.promises),
        (exports.chmod = _a.chmod),
        (exports.copyFile = _a.copyFile),
        (exports.lstat = _a.lstat),
        (exports.mkdir = _a.mkdir),
        (exports.readdir = _a.readdir),
        (exports.readlink = _a.readlink),
        (exports.rename = _a.rename),
        (exports.rmdir = _a.rmdir),
        (exports.stat = _a.stat),
        (exports.symlink = _a.symlink),
        (exports.unlink = _a.unlink);
      exports.IS_WINDOWS = process.platform === 'win32';
      function exists(fsPath) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield exports.stat(fsPath);
          } catch (err) {
            if (err.code === 'ENOENT') {
              return false;
            }
            throw err;
          }
          return true;
        });
      }
      exports.exists = exists;
      function isDirectory(fsPath, useStat = false) {
        return __awaiter(this, void 0, void 0, function* () {
          const stats = useStat
            ? yield exports.stat(fsPath)
            : yield exports.lstat(fsPath);
          return stats.isDirectory();
        });
      }
      exports.isDirectory = isDirectory;
      /**
       * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
       * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
       */
      function isRooted(p) {
        p = normalizeSeparators(p);
        if (!p) {
          throw new Error('isRooted() parameter "p" cannot be empty');
        }
        if (exports.IS_WINDOWS) {
          return (
            p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
          ); // e.g. C: or C:\hello
        }
        return p.startsWith('/');
      }
      exports.isRooted = isRooted;
      /**
       * Recursively create a directory at `fsPath`.
       *
       * This implementation is optimistic, meaning it attempts to create the full
       * path first, and backs up the path stack from there.
       *
       * @param fsPath The path to create
       * @param maxDepth The maximum recursion depth
       * @param depth The current recursion depth
       */
      function mkdirP(fsPath, maxDepth = 1000, depth = 1) {
        return __awaiter(this, void 0, void 0, function* () {
          assert_1.ok(fsPath, 'a path argument must be provided');
          fsPath = path.resolve(fsPath);
          if (depth >= maxDepth) return exports.mkdir(fsPath);
          try {
            yield exports.mkdir(fsPath);
            return;
          } catch (err) {
            switch (err.code) {
              case 'ENOENT': {
                yield mkdirP(path.dirname(fsPath), maxDepth, depth + 1);
                yield exports.mkdir(fsPath);
                return;
              }
              default: {
                let stats;
                try {
                  stats = yield exports.stat(fsPath);
                } catch (err2) {
                  throw err;
                }
                if (!stats.isDirectory()) throw err;
              }
            }
          }
        });
      }
      exports.mkdirP = mkdirP;
      /**
       * Best effort attempt to determine whether a file exists and is executable.
       * @param filePath    file path to check
       * @param extensions  additional file extensions to try
       * @return if file exists and is executable, returns the file path. otherwise empty string.
       */
      function tryGetExecutablePath(filePath, extensions) {
        return __awaiter(this, void 0, void 0, function* () {
          let stats = undefined;
          try {
            // test file exists
            stats = yield exports.stat(filePath);
          } catch (err) {
            if (err.code !== 'ENOENT') {
              // eslint-disable-next-line no-console
              console.log(
                `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
              );
            }
          }
          if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
              // on Windows, test for valid extension
              const upperExt = path.extname(filePath).toUpperCase();
              if (
                extensions.some(
                  (validExt) => validExt.toUpperCase() === upperExt
                )
              ) {
                return filePath;
              }
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
          // try each extension
          const originalFilePath = filePath;
          for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
              stats = yield exports.stat(filePath);
            } catch (err) {
              if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(
                  `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
                );
              }
            }
            if (stats && stats.isFile()) {
              if (exports.IS_WINDOWS) {
                // preserve the case of the actual file (since an extension was appended)
                try {
                  const directory = path.dirname(filePath);
                  const upperName = path.basename(filePath).toUpperCase();
                  for (const actualName of yield exports.readdir(directory)) {
                    if (upperName === actualName.toUpperCase()) {
                      filePath = path.join(directory, actualName);
                      break;
                    }
                  }
                } catch (err) {
                  // eslint-disable-next-line no-console
                  console.log(
                    `Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`
                  );
                }
                return filePath;
              } else {
                if (isUnixExecutable(stats)) {
                  return filePath;
                }
              }
            }
          }
          return '';
        });
      }
      exports.tryGetExecutablePath = tryGetExecutablePath;
      function normalizeSeparators(p) {
        p = p || '';
        if (exports.IS_WINDOWS) {
          // convert slashes on Windows
          p = p.replace(/\//g, '\\');
          // remove redundant slashes
          return p.replace(/\\\\+/g, '\\');
        }
        // remove redundant slashes
        return p.replace(/\/\/+/g, '/');
      }
      // on Mac/Linux, test the execute bit
      //     R   W  X  R  W X R W X
      //   256 128 64 32 16 8 4 2 1
      function isUnixExecutable(stats) {
        return (
          (stats.mode & 1) > 0 ||
          ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
          ((stats.mode & 64) > 0 && stats.uid === process.getuid())
        );
      }
      //# sourceMappingURL=io-util.js.map

      /***/
    },

    /***/ 7436: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      const childProcess = __nccwpck_require__(2081);
      const path = __nccwpck_require__(1017);
      const util_1 = __nccwpck_require__(3837);
      const ioUtil = __nccwpck_require__(1962);
      const exec = util_1.promisify(childProcess.exec);
      /**
       * Copies a file or folder.
       * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
       *
       * @param     source    source path
       * @param     dest      destination path
       * @param     options   optional. See CopyOptions.
       */
      function cp(source, dest, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const { force, recursive } = readCopyOptions(options);
          const destStat = (yield ioUtil.exists(dest))
            ? yield ioUtil.stat(dest)
            : null;
          // Dest is an existing file, but not forcing
          if (destStat && destStat.isFile() && !force) {
            return;
          }
          // If dest is an existing directory, should copy inside.
          const newDest =
            destStat && destStat.isDirectory()
              ? path.join(dest, path.basename(source))
              : dest;
          if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
          }
          const sourceStat = yield ioUtil.stat(source);
          if (sourceStat.isDirectory()) {
            if (!recursive) {
              throw new Error(
                `Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`
              );
            } else {
              yield cpDirRecursive(source, newDest, 0, force);
            }
          } else {
            if (path.relative(source, newDest) === '') {
              // a file cannot be copied to itself
              throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
          }
        });
      }
      exports.cp = cp;
      /**
       * Moves a path.
       *
       * @param     source    source path
       * @param     dest      destination path
       * @param     options   optional. See MoveOptions.
       */
      function mv(source, dest, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
              // If dest is directory copy src into dest
              dest = path.join(dest, path.basename(source));
              destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
              if (options.force == null || options.force) {
                yield rmRF(dest);
              } else {
                throw new Error('Destination already exists');
              }
            }
          }
          yield mkdirP(path.dirname(dest));
          yield ioUtil.rename(source, dest);
        });
      }
      exports.mv = mv;
      /**
       * Remove a path recursively with force
       *
       * @param inputPath path to remove
       */
      function rmRF(inputPath) {
        return __awaiter(this, void 0, void 0, function* () {
          if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            try {
              if (yield ioUtil.isDirectory(inputPath, true)) {
                yield exec(`rd /s /q "${inputPath}"`);
              } else {
                yield exec(`del /f /a "${inputPath}"`);
              }
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
              yield ioUtil.unlink(inputPath);
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
            }
          } else {
            let isDir = false;
            try {
              isDir = yield ioUtil.isDirectory(inputPath);
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
              return;
            }
            if (isDir) {
              yield exec(`rm -rf "${inputPath}"`);
            } else {
              yield ioUtil.unlink(inputPath);
            }
          }
        });
      }
      exports.rmRF = rmRF;
      /**
       * Make a directory.  Creates the full path with folders in between
       * Will throw if it fails
       *
       * @param   fsPath        path to create
       * @returns Promise<void>
       */
      function mkdirP(fsPath) {
        return __awaiter(this, void 0, void 0, function* () {
          yield ioUtil.mkdirP(fsPath);
        });
      }
      exports.mkdirP = mkdirP;
      /**
       * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
       * If you check and the tool does not exist, it will throw.
       *
       * @param     tool              name of the tool
       * @param     check             whether to check if tool exists
       * @returns   Promise<string>   path to tool
       */
      function which(tool, check) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!tool) {
            throw new Error("parameter 'tool' is required");
          }
          // recursive when check=true
          if (check) {
            const result = yield which(tool, false);
            if (!result) {
              if (ioUtil.IS_WINDOWS) {
                throw new Error(
                  `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`
                );
              } else {
                throw new Error(
                  `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`
                );
              }
            }
          }
          try {
            // build the list of extensions to try
            const extensions = [];
            if (ioUtil.IS_WINDOWS && process.env.PATHEXT) {
              for (const extension of process.env.PATHEXT.split(
                path.delimiter
              )) {
                if (extension) {
                  extensions.push(extension);
                }
              }
            }
            // if it's rooted, return it if exists. otherwise return empty.
            if (ioUtil.isRooted(tool)) {
              const filePath = yield ioUtil.tryGetExecutablePath(
                tool,
                extensions
              );
              if (filePath) {
                return filePath;
              }
              return '';
            }
            // if any path separators, return empty
            if (
              tool.includes('/') ||
              (ioUtil.IS_WINDOWS && tool.includes('\\'))
            ) {
              return '';
            }
            // build the list of directories
            //
            // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
            // it feels like we should not do this. Checking the current directory seems like more of a use
            // case of a shell, and the which() function exposed by the toolkit should strive for consistency
            // across platforms.
            const directories = [];
            if (process.env.PATH) {
              for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                  directories.push(p);
                }
              }
            }
            // return the first match
            for (const directory of directories) {
              const filePath = yield ioUtil.tryGetExecutablePath(
                directory + path.sep + tool,
                extensions
              );
              if (filePath) {
                return filePath;
              }
            }
            return '';
          } catch (err) {
            throw new Error(`which failed with message ${err.message}`);
          }
        });
      }
      exports.which = which;
      function readCopyOptions(options) {
        const force = options.force == null ? true : options.force;
        const recursive = Boolean(options.recursive);
        return { force, recursive };
      }
      function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
        return __awaiter(this, void 0, void 0, function* () {
          // Ensure there is not a run away recursive copy
          if (currentDepth >= 255) return;
          currentDepth++;
          yield mkdirP(destDir);
          const files = yield ioUtil.readdir(sourceDir);
          for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
              // Recurse
              yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            } else {
              yield copyFile(srcFile, destFile, force);
            }
          }
          // Change the mode for the newly created directory
          yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
        });
      }
      // Buffered file copy
      function copyFile(srcFile, destFile, force) {
        return __awaiter(this, void 0, void 0, function* () {
          if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
              yield ioUtil.lstat(destFile);
              yield ioUtil.unlink(destFile);
            } catch (e) {
              // Try to override file permission
              if (e.code === 'EPERM') {
                yield ioUtil.chmod(destFile, '0666');
                yield ioUtil.unlink(destFile);
              }
              // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(
              symlinkFull,
              destFile,
              ioUtil.IS_WINDOWS ? 'junction' : null
            );
          } else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
          }
        });
      }
      //# sourceMappingURL=io.js.map

      /***/
    },

    /***/ 7678: /***/ (module, exports) => {
      'use strict';

      /// <reference lib="es2018"/>
      /// <reference lib="dom"/>
      /// <reference types="node"/>
      Object.defineProperty(exports, '__esModule', { value: true });
      const typedArrayTypeNames = [
        'Int8Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'Int16Array',
        'Uint16Array',
        'Int32Array',
        'Uint32Array',
        'Float32Array',
        'Float64Array',
        'BigInt64Array',
        'BigUint64Array',
      ];
      function isTypedArrayName(name) {
        return typedArrayTypeNames.includes(name);
      }
      const objectTypeNames = [
        'Function',
        'Generator',
        'AsyncGenerator',
        'GeneratorFunction',
        'AsyncGeneratorFunction',
        'AsyncFunction',
        'Observable',
        'Array',
        'Buffer',
        'Object',
        'RegExp',
        'Date',
        'Error',
        'Map',
        'Set',
        'WeakMap',
        'WeakSet',
        'ArrayBuffer',
        'SharedArrayBuffer',
        'DataView',
        'Promise',
        'URL',
        'HTMLElement',
        ...typedArrayTypeNames,
      ];
      function isObjectTypeName(name) {
        return objectTypeNames.includes(name);
      }
      const primitiveTypeNames = [
        'null',
        'undefined',
        'string',
        'number',
        'bigint',
        'boolean',
        'symbol',
      ];
      function isPrimitiveTypeName(name) {
        return primitiveTypeNames.includes(name);
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      function isOfType(type) {
        return (value) => typeof value === type;
      }
      const { toString } = Object.prototype;
      const getObjectType = (value) => {
        const objectTypeName = toString.call(value).slice(8, -1);
        if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
          return 'HTMLElement';
        }
        if (isObjectTypeName(objectTypeName)) {
          return objectTypeName;
        }
        return undefined;
      };
      const isObjectOfType = (type) => (value) => getObjectType(value) === type;
      function is(value) {
        if (value === null) {
          return 'null';
        }
        switch (typeof value) {
          case 'undefined':
            return 'undefined';
          case 'string':
            return 'string';
          case 'number':
            return 'number';
          case 'boolean':
            return 'boolean';
          case 'function':
            return 'Function';
          case 'bigint':
            return 'bigint';
          case 'symbol':
            return 'symbol';
          default:
        }
        if (is.observable(value)) {
          return 'Observable';
        }
        if (is.array(value)) {
          return 'Array';
        }
        if (is.buffer(value)) {
          return 'Buffer';
        }
        const tagType = getObjectType(value);
        if (tagType) {
          return tagType;
        }
        if (
          value instanceof String ||
          value instanceof Boolean ||
          value instanceof Number
        ) {
          throw new TypeError(
            "Please don't use object wrappers for primitive types"
          );
        }
        return 'Object';
      }
      is.undefined = isOfType('undefined');
      is.string = isOfType('string');
      const isNumberType = isOfType('number');
      is.number = (value) => isNumberType(value) && !is.nan(value);
      is.bigint = isOfType('bigint');
      // eslint-disable-next-line @typescript-eslint/ban-types
      is.function_ = isOfType('function');
      is.null_ = (value) => value === null;
      is.class_ = (value) =>
        is.function_(value) && value.toString().startsWith('class ');
      is.boolean = (value) => value === true || value === false;
      is.symbol = isOfType('symbol');
      is.numericString = (value) =>
        is.string(value) &&
        !is.emptyStringOrWhitespace(value) &&
        !Number.isNaN(Number(value));
      is.array = (value, assertion) => {
        if (!Array.isArray(value)) {
          return false;
        }
        if (!is.function_(assertion)) {
          return true;
        }
        return value.every(assertion);
      };
      is.buffer = (value) => {
        var _a, _b, _c, _d;
        return (_d =
          (_c =
            (_b =
              (_a = value) === null || _a === void 0
                ? void 0
                : _a.constructor) === null || _b === void 0
              ? void 0
              : _b.isBuffer) === null || _c === void 0
            ? void 0
            : _c.call(_b, value)) !== null && _d !== void 0
          ? _d
          : false;
      };
      is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
      is.object = (value) =>
        !is.null_(value) && (typeof value === 'object' || is.function_(value));
      is.iterable = (value) => {
        var _a;
        return is.function_(
          (_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]
        );
      };
      is.asyncIterable = (value) => {
        var _a;
        return is.function_(
          (_a = value) === null || _a === void 0
            ? void 0
            : _a[Symbol.asyncIterator]
        );
      };
      is.generator = (value) =>
        is.iterable(value) &&
        is.function_(value.next) &&
        is.function_(value.throw);
      is.asyncGenerator = (value) =>
        is.asyncIterable(value) &&
        is.function_(value.next) &&
        is.function_(value.throw);
      is.nativePromise = (value) => isObjectOfType('Promise')(value);
      const hasPromiseAPI = (value) => {
        var _a, _b;
        return (
          is.function_(
            (_a = value) === null || _a === void 0 ? void 0 : _a.then
          ) &&
          is.function_(
            (_b = value) === null || _b === void 0 ? void 0 : _b.catch
          )
        );
      };
      is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
      is.generatorFunction = isObjectOfType('GeneratorFunction');
      is.asyncGeneratorFunction = (value) =>
        getObjectType(value) === 'AsyncGeneratorFunction';
      is.asyncFunction = (value) => getObjectType(value) === 'AsyncFunction';
      // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
      is.boundFunction = (value) =>
        is.function_(value) && !value.hasOwnProperty('prototype');
      is.regExp = isObjectOfType('RegExp');
      is.date = isObjectOfType('Date');
      is.error = isObjectOfType('Error');
      is.map = (value) => isObjectOfType('Map')(value);
      is.set = (value) => isObjectOfType('Set')(value);
      is.weakMap = (value) => isObjectOfType('WeakMap')(value);
      is.weakSet = (value) => isObjectOfType('WeakSet')(value);
      is.int8Array = isObjectOfType('Int8Array');
      is.uint8Array = isObjectOfType('Uint8Array');
      is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
      is.int16Array = isObjectOfType('Int16Array');
      is.uint16Array = isObjectOfType('Uint16Array');
      is.int32Array = isObjectOfType('Int32Array');
      is.uint32Array = isObjectOfType('Uint32Array');
      is.float32Array = isObjectOfType('Float32Array');
      is.float64Array = isObjectOfType('Float64Array');
      is.bigInt64Array = isObjectOfType('BigInt64Array');
      is.bigUint64Array = isObjectOfType('BigUint64Array');
      is.arrayBuffer = isObjectOfType('ArrayBuffer');
      is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
      is.dataView = isObjectOfType('DataView');
      is.directInstanceOf = (instance, class_) =>
        Object.getPrototypeOf(instance) === class_.prototype;
      is.urlInstance = (value) => isObjectOfType('URL')(value);
      is.urlString = (value) => {
        if (!is.string(value)) {
          return false;
        }
        try {
          new URL(value); // eslint-disable-line no-new
          return true;
        } catch (_a) {
          return false;
        }
      };
      // TODO: Use the `not` operator with a type guard here when it's available.
      // Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
      is.truthy = (value) => Boolean(value);
      // Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
      is.falsy = (value) => !value;
      is.nan = (value) => Number.isNaN(value);
      is.primitive = (value) =>
        is.null_(value) || isPrimitiveTypeName(typeof value);
      is.integer = (value) => Number.isInteger(value);
      is.safeInteger = (value) => Number.isSafeInteger(value);
      is.plainObject = (value) => {
        // From: https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
        if (toString.call(value) !== '[object Object]') {
          return false;
        }
        const prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.getPrototypeOf({});
      };
      is.typedArray = (value) => isTypedArrayName(getObjectType(value));
      const isValidLength = (value) => is.safeInteger(value) && value >= 0;
      is.arrayLike = (value) =>
        !is.nullOrUndefined(value) &&
        !is.function_(value) &&
        isValidLength(value.length);
      is.inRange = (value, range) => {
        if (is.number(range)) {
          return value >= Math.min(0, range) && value <= Math.max(range, 0);
        }
        if (is.array(range) && range.length === 2) {
          return value >= Math.min(...range) && value <= Math.max(...range);
        }
        throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
      };
      const NODE_TYPE_ELEMENT = 1;
      const DOM_PROPERTIES_TO_CHECK = [
        'innerHTML',
        'ownerDocument',
        'style',
        'attributes',
        'nodeValue',
      ];
      is.domElement = (value) => {
        return (
          is.object(value) &&
          value.nodeType === NODE_TYPE_ELEMENT &&
          is.string(value.nodeName) &&
          !is.plainObject(value) &&
          DOM_PROPERTIES_TO_CHECK.every((property) => property in value)
        );
      };
      is.observable = (value) => {
        var _a, _b, _c, _d;
        if (!value) {
          return false;
        }
        // eslint-disable-next-line no-use-extend-native/no-use-extend-native
        if (
          value ===
          ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0
            ? void 0
            : _b.call(_a))
        ) {
          return true;
        }
        if (
          value ===
          ((_d = (_c = value)['@@observable']) === null || _d === void 0
            ? void 0
            : _d.call(_c))
        ) {
          return true;
        }
        return false;
      };
      is.nodeStream = (value) =>
        is.object(value) && is.function_(value.pipe) && !is.observable(value);
      is.infinite = (value) => value === Infinity || value === -Infinity;
      const isAbsoluteMod2 = (remainder) => (value) =>
        is.integer(value) && Math.abs(value % 2) === remainder;
      is.evenInteger = isAbsoluteMod2(0);
      is.oddInteger = isAbsoluteMod2(1);
      is.emptyArray = (value) => is.array(value) && value.length === 0;
      is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
      is.emptyString = (value) => is.string(value) && value.length === 0;
      // TODO: Use `not ''` when the `not` operator is available.
      is.nonEmptyString = (value) => is.string(value) && value.length > 0;
      const isWhiteSpaceString = (value) =>
        is.string(value) && !/\S/.test(value);
      is.emptyStringOrWhitespace = (value) =>
        is.emptyString(value) || isWhiteSpaceString(value);
      is.emptyObject = (value) =>
        is.object(value) &&
        !is.map(value) &&
        !is.set(value) &&
        Object.keys(value).length === 0;
      // TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
      // - https://github.com/Microsoft/TypeScript/pull/29317
      is.nonEmptyObject = (value) =>
        is.object(value) &&
        !is.map(value) &&
        !is.set(value) &&
        Object.keys(value).length > 0;
      is.emptySet = (value) => is.set(value) && value.size === 0;
      is.nonEmptySet = (value) => is.set(value) && value.size > 0;
      is.emptyMap = (value) => is.map(value) && value.size === 0;
      is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
      const predicateOnArray = (method, predicate, values) => {
        if (!is.function_(predicate)) {
          throw new TypeError(
            `Invalid predicate: ${JSON.stringify(predicate)}`
          );
        }
        if (values.length === 0) {
          throw new TypeError('Invalid number of values');
        }
        return method.call(values, predicate);
      };
      is.any = (predicate, ...values) => {
        const predicates = is.array(predicate) ? predicate : [predicate];
        return predicates.some((singlePredicate) =>
          predicateOnArray(Array.prototype.some, singlePredicate, values)
        );
      };
      is.all = (predicate, ...values) =>
        predicateOnArray(Array.prototype.every, predicate, values);
      const assertType = (condition, description, value) => {
        if (!condition) {
          throw new TypeError(
            `Expected value which is \`${description}\`, received value of type \`${is(
              value
            )}\`.`
          );
        }
      };
      exports.assert = {
        // Unknowns.
        undefined: (value) =>
          assertType(is.undefined(value), 'undefined', value),
        string: (value) => assertType(is.string(value), 'string', value),
        number: (value) => assertType(is.number(value), 'number', value),
        bigint: (value) => assertType(is.bigint(value), 'bigint', value),
        // eslint-disable-next-line @typescript-eslint/ban-types
        function_: (value) =>
          assertType(is.function_(value), 'Function', value),
        null_: (value) => assertType(is.null_(value), 'null', value),
        class_: (value) =>
          assertType(is.class_(value), 'Class' /* class_ */, value),
        boolean: (value) => assertType(is.boolean(value), 'boolean', value),
        symbol: (value) => assertType(is.symbol(value), 'symbol', value),
        numericString: (value) =>
          assertType(
            is.numericString(value),
            'string with a number' /* numericString */,
            value
          ),
        array: (value, assertion) => {
          const assert = assertType;
          assert(is.array(value), 'Array', value);
          if (assertion) {
            value.forEach(assertion);
          }
        },
        buffer: (value) => assertType(is.buffer(value), 'Buffer', value),
        nullOrUndefined: (value) =>
          assertType(
            is.nullOrUndefined(value),
            'null or undefined' /* nullOrUndefined */,
            value
          ),
        object: (value) => assertType(is.object(value), 'Object', value),
        iterable: (value) =>
          assertType(is.iterable(value), 'Iterable' /* iterable */, value),
        asyncIterable: (value) =>
          assertType(
            is.asyncIterable(value),
            'AsyncIterable' /* asyncIterable */,
            value
          ),
        generator: (value) =>
          assertType(is.generator(value), 'Generator', value),
        asyncGenerator: (value) =>
          assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
        nativePromise: (value) =>
          assertType(
            is.nativePromise(value),
            'native Promise' /* nativePromise */,
            value
          ),
        promise: (value) => assertType(is.promise(value), 'Promise', value),
        generatorFunction: (value) =>
          assertType(is.generatorFunction(value), 'GeneratorFunction', value),
        asyncGeneratorFunction: (value) =>
          assertType(
            is.asyncGeneratorFunction(value),
            'AsyncGeneratorFunction',
            value
          ),
        // eslint-disable-next-line @typescript-eslint/ban-types
        asyncFunction: (value) =>
          assertType(is.asyncFunction(value), 'AsyncFunction', value),
        // eslint-disable-next-line @typescript-eslint/ban-types
        boundFunction: (value) =>
          assertType(is.boundFunction(value), 'Function', value),
        regExp: (value) => assertType(is.regExp(value), 'RegExp', value),
        date: (value) => assertType(is.date(value), 'Date', value),
        error: (value) => assertType(is.error(value), 'Error', value),
        map: (value) => assertType(is.map(value), 'Map', value),
        set: (value) => assertType(is.set(value), 'Set', value),
        weakMap: (value) => assertType(is.weakMap(value), 'WeakMap', value),
        weakSet: (value) => assertType(is.weakSet(value), 'WeakSet', value),
        int8Array: (value) =>
          assertType(is.int8Array(value), 'Int8Array', value),
        uint8Array: (value) =>
          assertType(is.uint8Array(value), 'Uint8Array', value),
        uint8ClampedArray: (value) =>
          assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
        int16Array: (value) =>
          assertType(is.int16Array(value), 'Int16Array', value),
        uint16Array: (value) =>
          assertType(is.uint16Array(value), 'Uint16Array', value),
        int32Array: (value) =>
          assertType(is.int32Array(value), 'Int32Array', value),
        uint32Array: (value) =>
          assertType(is.uint32Array(value), 'Uint32Array', value),
        float32Array: (value) =>
          assertType(is.float32Array(value), 'Float32Array', value),
        float64Array: (value) =>
          assertType(is.float64Array(value), 'Float64Array', value),
        bigInt64Array: (value) =>
          assertType(is.bigInt64Array(value), 'BigInt64Array', value),
        bigUint64Array: (value) =>
          assertType(is.bigUint64Array(value), 'BigUint64Array', value),
        arrayBuffer: (value) =>
          assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
        sharedArrayBuffer: (value) =>
          assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
        dataView: (value) => assertType(is.dataView(value), 'DataView', value),
        urlInstance: (value) => assertType(is.urlInstance(value), 'URL', value),
        urlString: (value) =>
          assertType(
            is.urlString(value),
            'string with a URL' /* urlString */,
            value
          ),
        truthy: (value) =>
          assertType(is.truthy(value), 'truthy' /* truthy */, value),
        falsy: (value) =>
          assertType(is.falsy(value), 'falsy' /* falsy */, value),
        nan: (value) => assertType(is.nan(value), 'NaN' /* nan */, value),
        primitive: (value) =>
          assertType(is.primitive(value), 'primitive' /* primitive */, value),
        integer: (value) =>
          assertType(is.integer(value), 'integer' /* integer */, value),
        safeInteger: (value) =>
          assertType(is.safeInteger(value), 'integer' /* safeInteger */, value),
        plainObject: (value) =>
          assertType(
            is.plainObject(value),
            'plain object' /* plainObject */,
            value
          ),
        typedArray: (value) =>
          assertType(
            is.typedArray(value),
            'TypedArray' /* typedArray */,
            value
          ),
        arrayLike: (value) =>
          assertType(is.arrayLike(value), 'array-like' /* arrayLike */, value),
        domElement: (value) =>
          assertType(
            is.domElement(value),
            'HTMLElement' /* domElement */,
            value
          ),
        observable: (value) =>
          assertType(is.observable(value), 'Observable', value),
        nodeStream: (value) =>
          assertType(
            is.nodeStream(value),
            'Node.js Stream' /* nodeStream */,
            value
          ),
        infinite: (value) =>
          assertType(
            is.infinite(value),
            'infinite number' /* infinite */,
            value
          ),
        emptyArray: (value) =>
          assertType(
            is.emptyArray(value),
            'empty array' /* emptyArray */,
            value
          ),
        nonEmptyArray: (value) =>
          assertType(
            is.nonEmptyArray(value),
            'non-empty array' /* nonEmptyArray */,
            value
          ),
        emptyString: (value) =>
          assertType(
            is.emptyString(value),
            'empty string' /* emptyString */,
            value
          ),
        nonEmptyString: (value) =>
          assertType(
            is.nonEmptyString(value),
            'non-empty string' /* nonEmptyString */,
            value
          ),
        emptyStringOrWhitespace: (value) =>
          assertType(
            is.emptyStringOrWhitespace(value),
            'empty string or whitespace' /* emptyStringOrWhitespace */,
            value
          ),
        emptyObject: (value) =>
          assertType(
            is.emptyObject(value),
            'empty object' /* emptyObject */,
            value
          ),
        nonEmptyObject: (value) =>
          assertType(
            is.nonEmptyObject(value),
            'non-empty object' /* nonEmptyObject */,
            value
          ),
        emptySet: (value) =>
          assertType(is.emptySet(value), 'empty set' /* emptySet */, value),
        nonEmptySet: (value) =>
          assertType(
            is.nonEmptySet(value),
            'non-empty set' /* nonEmptySet */,
            value
          ),
        emptyMap: (value) =>
          assertType(is.emptyMap(value), 'empty map' /* emptyMap */, value),
        nonEmptyMap: (value) =>
          assertType(
            is.nonEmptyMap(value),
            'non-empty map' /* nonEmptyMap */,
            value
          ),
        // Numbers.
        evenInteger: (value) =>
          assertType(
            is.evenInteger(value),
            'even integer' /* evenInteger */,
            value
          ),
        oddInteger: (value) =>
          assertType(
            is.oddInteger(value),
            'odd integer' /* oddInteger */,
            value
          ),
        // Two arguments.
        directInstanceOf: (instance, class_) =>
          assertType(
            is.directInstanceOf(instance, class_),
            'T' /* directInstanceOf */,
            instance
          ),
        inRange: (value, range) =>
          assertType(is.inRange(value, range), 'in range' /* inRange */, value),
        // Variadic functions.
        any: (predicate, ...values) =>
          assertType(
            is.any(predicate, ...values),
            'predicate returns truthy for any value' /* any */,
            values
          ),
        all: (predicate, ...values) =>
          assertType(
            is.all(predicate, ...values),
            'predicate returns truthy for all values' /* all */,
            values
          ),
      };
      // Some few keywords are reserved, but we'll populate them for Node.js users
      // See https://github.com/Microsoft/TypeScript/issues/2536
      Object.defineProperties(is, {
        class: {
          value: is.class_,
        },
        function: {
          value: is.function_,
        },
        null: {
          value: is.null_,
        },
      });
      Object.defineProperties(exports.assert, {
        class: {
          value: exports.assert.class_,
        },
        function: {
          value: exports.assert.function_,
        },
        null: {
          value: exports.assert.null_,
        },
      });
      exports['default'] = is;
      // For CommonJS default export support
      module.exports = is;
      module.exports['default'] = is;
      module.exports.assert = exports.assert;

      /***/
    },

    /***/ 8097: /***/ (module, exports, __nccwpck_require__) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const defer_to_connect_1 = __nccwpck_require__(6214);
      const nodejsMajorVersion = Number(process.versions.node.split('.')[0]);
      const timer = (request) => {
        const timings = {
          start: Date.now(),
          socket: undefined,
          lookup: undefined,
          connect: undefined,
          secureConnect: undefined,
          upload: undefined,
          response: undefined,
          end: undefined,
          error: undefined,
          abort: undefined,
          phases: {
            wait: undefined,
            dns: undefined,
            tcp: undefined,
            tls: undefined,
            request: undefined,
            firstByte: undefined,
            download: undefined,
            total: undefined,
          },
        };
        request.timings = timings;
        const handleError = (origin) => {
          const emit = origin.emit.bind(origin);
          origin.emit = (event, ...args) => {
            // Catches the `error` event
            if (event === 'error') {
              timings.error = Date.now();
              timings.phases.total = timings.error - timings.start;
              origin.emit = emit;
            }
            // Saves the original behavior
            return emit(event, ...args);
          };
        };
        handleError(request);
        request.prependOnceListener('abort', () => {
          timings.abort = Date.now();
          // Let the `end` response event be responsible for setting the total phase,
          // unless the Node.js major version is >= 13.
          if (!timings.response || nodejsMajorVersion >= 13) {
            timings.phases.total = Date.now() - timings.start;
          }
        });
        const onSocket = (socket) => {
          timings.socket = Date.now();
          timings.phases.wait = timings.socket - timings.start;
          const lookupListener = () => {
            timings.lookup = Date.now();
            timings.phases.dns = timings.lookup - timings.socket;
          };
          socket.prependOnceListener('lookup', lookupListener);
          defer_to_connect_1.default(socket, {
            connect: () => {
              timings.connect = Date.now();
              if (timings.lookup === undefined) {
                socket.removeListener('lookup', lookupListener);
                timings.lookup = timings.connect;
                timings.phases.dns = timings.lookup - timings.socket;
              }
              timings.phases.tcp = timings.connect - timings.lookup;
              // This callback is called before flushing any data,
              // so we don't need to set `timings.phases.request` here.
            },
            secureConnect: () => {
              timings.secureConnect = Date.now();
              timings.phases.tls = timings.secureConnect - timings.connect;
            },
          });
        };
        if (request.socket) {
          onSocket(request.socket);
        } else {
          request.prependOnceListener('socket', onSocket);
        }
        const onUpload = () => {
          var _a;
          timings.upload = Date.now();
          timings.phases.request =
            timings.upload -
            ((_a = timings.secureConnect),
            _a !== null && _a !== void 0 ? _a : timings.connect);
        };
        const writableFinished = () => {
          if (typeof request.writableFinished === 'boolean') {
            return request.writableFinished;
          }
          // Node.js doesn't have `request.writableFinished` property
          return (
            request.finished &&
            request.outputSize === 0 &&
            (!request.socket || request.socket.writableLength === 0)
          );
        };
        if (writableFinished()) {
          onUpload();
        } else {
          request.prependOnceListener('finish', onUpload);
        }
        request.prependOnceListener('response', (response) => {
          timings.response = Date.now();
          timings.phases.firstByte = timings.response - timings.upload;
          response.timings = timings;
          handleError(response);
          response.prependOnceListener('end', () => {
            timings.end = Date.now();
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
          });
        });
        return timings;
      };
      exports['default'] = timer;
      // For CommonJS default export support
      module.exports = timer;
      module.exports['default'] = timer;

      /***/
    },

    /***/ 2286: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const {
        V4MAPPED,
        ADDRCONFIG,
        ALL,
        promises: { Resolver: AsyncResolver },
        lookup: dnsLookup,
      } = __nccwpck_require__(9523);
      const { promisify } = __nccwpck_require__(3837);
      const os = __nccwpck_require__(2037);

      const kCacheableLookupCreateConnection = Symbol(
        'cacheableLookupCreateConnection'
      );
      const kCacheableLookupInstance = Symbol('cacheableLookupInstance');
      const kExpires = Symbol('expires');

      const supportsALL = typeof ALL === 'number';

      const verifyAgent = (agent) => {
        if (!(agent && typeof agent.createConnection === 'function')) {
          throw new Error('Expected an Agent instance as the first argument');
        }
      };

      const map4to6 = (entries) => {
        for (const entry of entries) {
          if (entry.family === 6) {
            continue;
          }

          entry.address = `::ffff:${entry.address}`;
          entry.family = 6;
        }
      };

      const getIfaceInfo = () => {
        let has4 = false;
        let has6 = false;

        for (const device of Object.values(os.networkInterfaces())) {
          for (const iface of device) {
            if (iface.internal) {
              continue;
            }

            if (iface.family === 'IPv6') {
              has6 = true;
            } else {
              has4 = true;
            }

            if (has4 && has6) {
              return { has4, has6 };
            }
          }
        }

        return { has4, has6 };
      };

      const isIterable = (map) => {
        return Symbol.iterator in map;
      };

      const ttl = { ttl: true };
      const all = { all: true };

      class CacheableLookup {
        constructor({
          cache = new Map(),
          maxTtl = Infinity,
          fallbackDuration = 3600,
          errorTtl = 0.15,
          resolver = new AsyncResolver(),
          lookup = dnsLookup,
        } = {}) {
          this.maxTtl = maxTtl;
          this.errorTtl = errorTtl;

          this._cache = cache;
          this._resolver = resolver;
          this._dnsLookup = promisify(lookup);

          if (this._resolver instanceof AsyncResolver) {
            this._resolve4 = this._resolver.resolve4.bind(this._resolver);
            this._resolve6 = this._resolver.resolve6.bind(this._resolver);
          } else {
            this._resolve4 = promisify(
              this._resolver.resolve4.bind(this._resolver)
            );
            this._resolve6 = promisify(
              this._resolver.resolve6.bind(this._resolver)
            );
          }

          this._iface = getIfaceInfo();

          this._pending = {};
          this._nextRemovalTime = false;
          this._hostnamesToFallback = new Set();

          if (fallbackDuration < 1) {
            this._fallback = false;
          } else {
            this._fallback = true;

            const interval = setInterval(() => {
              this._hostnamesToFallback.clear();
            }, fallbackDuration * 1000);

            /* istanbul ignore next: There is no `interval.unref()` when running inside an Electron renderer */
            if (interval.unref) {
              interval.unref();
            }
          }

          this.lookup = this.lookup.bind(this);
          this.lookupAsync = this.lookupAsync.bind(this);
        }

        set servers(servers) {
          this.clear();

          this._resolver.setServers(servers);
        }

        get servers() {
          return this._resolver.getServers();
        }

        lookup(hostname, options, callback) {
          if (typeof options === 'function') {
            callback = options;
            options = {};
          } else if (typeof options === 'number') {
            options = {
              family: options,
            };
          }

          if (!callback) {
            throw new Error('Callback must be a function.');
          }

          // eslint-disable-next-line promise/prefer-await-to-then
          this.lookupAsync(hostname, options).then((result) => {
            if (options.all) {
              callback(null, result);
            } else {
              callback(
                null,
                result.address,
                result.family,
                result.expires,
                result.ttl
              );
            }
          }, callback);
        }

        async lookupAsync(hostname, options = {}) {
          if (typeof options === 'number') {
            options = {
              family: options,
            };
          }

          let cached = await this.query(hostname);

          if (options.family === 6) {
            const filtered = cached.filter((entry) => entry.family === 6);

            if (options.hints & V4MAPPED) {
              if (
                (supportsALL && options.hints & ALL) ||
                filtered.length === 0
              ) {
                map4to6(cached);
              } else {
                cached = filtered;
              }
            } else {
              cached = filtered;
            }
          } else if (options.family === 4) {
            cached = cached.filter((entry) => entry.family === 4);
          }

          if (options.hints & ADDRCONFIG) {
            const { _iface } = this;
            cached = cached.filter((entry) =>
              entry.family === 6 ? _iface.has6 : _iface.has4
            );
          }

          if (cached.length === 0) {
            const error = new Error(`cacheableLookup ENOTFOUND ${hostname}`);
            error.code = 'ENOTFOUND';
            error.hostname = hostname;

            throw error;
          }

          if (options.all) {
            return cached;
          }

          return cached[0];
        }

        async query(hostname) {
          let cached = await this._cache.get(hostname);

          if (!cached) {
            const pending = this._pending[hostname];

            if (pending) {
              cached = await pending;
            } else {
              const newPromise = this.queryAndCache(hostname);
              this._pending[hostname] = newPromise;

              try {
                cached = await newPromise;
              } finally {
                delete this._pending[hostname];
              }
            }
          }

          cached = cached.map((entry) => {
            return { ...entry };
          });

          return cached;
        }

        async _resolve(hostname) {
          const wrap = async (promise) => {
            try {
              return await promise;
            } catch (error) {
              if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
                return [];
              }

              throw error;
            }
          };

          // ANY is unsafe as it doesn't trigger new queries in the underlying server.
          const [A, AAAA] = await Promise.all(
            [this._resolve4(hostname, ttl), this._resolve6(hostname, ttl)].map(
              (promise) => wrap(promise)
            )
          );

          let aTtl = 0;
          let aaaaTtl = 0;
          let cacheTtl = 0;

          const now = Date.now();

          for (const entry of A) {
            entry.family = 4;
            entry.expires = now + entry.ttl * 1000;

            aTtl = Math.max(aTtl, entry.ttl);
          }

          for (const entry of AAAA) {
            entry.family = 6;
            entry.expires = now + entry.ttl * 1000;

            aaaaTtl = Math.max(aaaaTtl, entry.ttl);
          }

          if (A.length > 0) {
            if (AAAA.length > 0) {
              cacheTtl = Math.min(aTtl, aaaaTtl);
            } else {
              cacheTtl = aTtl;
            }
          } else {
            cacheTtl = aaaaTtl;
          }

          return {
            entries: [...A, ...AAAA],
            cacheTtl,
          };
        }

        async _lookup(hostname) {
          try {
            const entries = await this._dnsLookup(hostname, {
              all: true,
            });

            return {
              entries,
              cacheTtl: 0,
            };
          } catch (_) {
            return {
              entries: [],
              cacheTtl: 0,
            };
          }
        }

        async _set(hostname, data, cacheTtl) {
          if (this.maxTtl > 0 && cacheTtl > 0) {
            cacheTtl = Math.min(cacheTtl, this.maxTtl) * 1000;
            data[kExpires] = Date.now() + cacheTtl;

            try {
              await this._cache.set(hostname, data, cacheTtl);
            } catch (error) {
              this.lookupAsync = async () => {
                const cacheError = new Error(
                  'Cache Error. Please recreate the CacheableLookup instance.'
                );
                cacheError.cause = error;

                throw cacheError;
              };
            }

            if (isIterable(this._cache)) {
              this._tick(cacheTtl);
            }
          }
        }

        async queryAndCache(hostname) {
          if (this._hostnamesToFallback.has(hostname)) {
            return this._dnsLookup(hostname, all);
          }

          let query = await this._resolve(hostname);

          if (query.entries.length === 0 && this._fallback) {
            query = await this._lookup(hostname);

            if (query.entries.length !== 0) {
              // Use `dns.lookup(...)` for that particular hostname
              this._hostnamesToFallback.add(hostname);
            }
          }

          const cacheTtl =
            query.entries.length === 0 ? this.errorTtl : query.cacheTtl;
          await this._set(hostname, query.entries, cacheTtl);

          return query.entries;
        }

        _tick(ms) {
          const nextRemovalTime = this._nextRemovalTime;

          if (!nextRemovalTime || ms < nextRemovalTime) {
            clearTimeout(this._removalTimeout);

            this._nextRemovalTime = ms;

            this._removalTimeout = setTimeout(() => {
              this._nextRemovalTime = false;

              let nextExpiry = Infinity;

              const now = Date.now();

              for (const [hostname, entries] of this._cache) {
                const expires = entries[kExpires];

                if (now >= expires) {
                  this._cache.delete(hostname);
                } else if (expires < nextExpiry) {
                  nextExpiry = expires;
                }
              }

              if (nextExpiry !== Infinity) {
                this._tick(nextExpiry - now);
              }
            }, ms);

            /* istanbul ignore next: There is no `timeout.unref()` when running inside an Electron renderer */
            if (this._removalTimeout.unref) {
              this._removalTimeout.unref();
            }
          }
        }

        install(agent) {
          verifyAgent(agent);

          if (kCacheableLookupCreateConnection in agent) {
            throw new Error('CacheableLookup has been already installed');
          }

          agent[kCacheableLookupCreateConnection] = agent.createConnection;
          agent[kCacheableLookupInstance] = this;

          agent.createConnection = (options, callback) => {
            if (!('lookup' in options)) {
              options.lookup = this.lookup;
            }

            return agent[kCacheableLookupCreateConnection](options, callback);
          };
        }

        uninstall(agent) {
          verifyAgent(agent);

          if (agent[kCacheableLookupCreateConnection]) {
            if (agent[kCacheableLookupInstance] !== this) {
              throw new Error(
                'The agent is not owned by this CacheableLookup instance'
              );
            }

            agent.createConnection = agent[kCacheableLookupCreateConnection];

            delete agent[kCacheableLookupCreateConnection];
            delete agent[kCacheableLookupInstance];
          }
        }

        updateInterfaceInfo() {
          const { _iface } = this;

          this._iface = getIfaceInfo();

          if (
            (_iface.has4 && !this._iface.has4) ||
            (_iface.has6 && !this._iface.has6)
          ) {
            this._cache.clear();
          }
        }

        clear(hostname) {
          if (hostname) {
            this._cache.delete(hostname);
            return;
          }

          this._cache.clear();
        }
      }

      module.exports = CacheableLookup;
      module.exports['default'] = CacheableLookup;

      /***/
    },

    /***/ 7472: /***/ (module) => {
      'use strict';

      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
      const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
      const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

      const testParameter = (name, filters) => {
        return filters.some((filter) =>
          filter instanceof RegExp ? filter.test(name) : filter === name
        );
      };

      const normalizeDataURL = (urlString, { stripHash }) => {
        const match =
          /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(
            urlString
          );

        if (!match) {
          throw new Error(`Invalid URL: ${urlString}`);
        }

        let { type, data, hash } = match.groups;
        const mediaType = type.split(';');
        hash = stripHash ? '' : hash;

        let isBase64 = false;
        if (mediaType[mediaType.length - 1] === 'base64') {
          mediaType.pop();
          isBase64 = true;
        }

        // Lowercase MIME type
        const mimeType = (mediaType.shift() || '').toLowerCase();
        const attributes = mediaType
          .map((attribute) => {
            let [key, value = ''] = attribute
              .split('=')
              .map((string) => string.trim());

            // Lowercase `charset`
            if (key === 'charset') {
              value = value.toLowerCase();

              if (value === DATA_URL_DEFAULT_CHARSET) {
                return '';
              }
            }

            return `${key}${value ? `=${value}` : ''}`;
          })
          .filter(Boolean);

        const normalizedMediaType = [...attributes];

        if (isBase64) {
          normalizedMediaType.push('base64');
        }

        if (
          normalizedMediaType.length !== 0 ||
          (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)
        ) {
          normalizedMediaType.unshift(mimeType);
        }

        return `data:${normalizedMediaType.join(';')},${
          isBase64 ? data.trim() : data
        }${hash ? `#${hash}` : ''}`;
      };

      const normalizeUrl = (urlString, options) => {
        options = {
          defaultProtocol: 'http:',
          normalizeProtocol: true,
          forceHttp: false,
          forceHttps: false,
          stripAuthentication: true,
          stripHash: false,
          stripTextFragment: true,
          stripWWW: true,
          removeQueryParameters: [/^utm_\w+/i],
          removeTrailingSlash: true,
          removeSingleSlash: true,
          removeDirectoryIndex: false,
          sortQueryParameters: true,
          ...options,
        };

        urlString = urlString.trim();

        // Data URL
        if (/^data:/i.test(urlString)) {
          return normalizeDataURL(urlString, options);
        }

        if (/^view-source:/i.test(urlString)) {
          throw new Error(
            '`view-source:` is not supported as it is a non-standard protocol'
          );
        }

        const hasRelativeProtocol = urlString.startsWith('//');
        const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

        // Prepend protocol
        if (!isRelativeUrl) {
          urlString = urlString.replace(
            /^(?!(?:\w+:)?\/\/)|^\/\//,
            options.defaultProtocol
          );
        }

        const urlObj = new URL(urlString);

        if (options.forceHttp && options.forceHttps) {
          throw new Error(
            'The `forceHttp` and `forceHttps` options cannot be used together'
          );
        }

        if (options.forceHttp && urlObj.protocol === 'https:') {
          urlObj.protocol = 'http:';
        }

        if (options.forceHttps && urlObj.protocol === 'http:') {
          urlObj.protocol = 'https:';
        }

        // Remove auth
        if (options.stripAuthentication) {
          urlObj.username = '';
          urlObj.password = '';
        }

        // Remove hash
        if (options.stripHash) {
          urlObj.hash = '';
        } else if (options.stripTextFragment) {
          urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, '');
        }

        // Remove duplicate slashes if not preceded by a protocol
        if (urlObj.pathname) {
          urlObj.pathname = urlObj.pathname.replace(
            /(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g,
            '/'
          );
        }

        // Decode URI octets
        if (urlObj.pathname) {
          try {
            urlObj.pathname = decodeURI(urlObj.pathname);
          } catch (_) {}
        }

        // Remove directory index
        if (options.removeDirectoryIndex === true) {
          options.removeDirectoryIndex = [/^index\.[a-z]+$/];
        }

        if (
          Array.isArray(options.removeDirectoryIndex) &&
          options.removeDirectoryIndex.length > 0
        ) {
          let pathComponents = urlObj.pathname.split('/');
          const lastComponent = pathComponents[pathComponents.length - 1];

          if (testParameter(lastComponent, options.removeDirectoryIndex)) {
            pathComponents = pathComponents.slice(0, pathComponents.length - 1);
            urlObj.pathname = pathComponents.slice(1).join('/') + '/';
          }
        }

        if (urlObj.hostname) {
          // Remove trailing dot
          urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

          // Remove `www.`
          if (
            options.stripWWW &&
            /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(
              urlObj.hostname
            )
          ) {
            // Each label should be max 63 at length (min: 1).
            // Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
            // Each TLD should be up to 63 characters long (min: 2).
            // It is technically possible to have a single character TLD, but none currently exist.
            urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
          }
        }

        // Remove query unwanted parameters
        if (Array.isArray(options.removeQueryParameters)) {
          for (const key of [...urlObj.searchParams.keys()]) {
            if (testParameter(key, options.removeQueryParameters)) {
              urlObj.searchParams.delete(key);
            }
          }
        }

        if (options.removeQueryParameters === true) {
          urlObj.search = '';
        }

        // Sort query parameters
        if (options.sortQueryParameters) {
          urlObj.searchParams.sort();
        }

        if (options.removeTrailingSlash) {
          urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
        }

        const oldUrlString = urlString;

        // Take advantage of many of the Node `url` normalizations
        urlString = urlObj.toString();

        if (
          !options.removeSingleSlash &&
          urlObj.pathname === '/' &&
          !oldUrlString.endsWith('/') &&
          urlObj.hash === ''
        ) {
          urlString = urlString.replace(/\/$/, '');
        }

        // Remove ending `/` unless removeSingleSlash is false
        if (
          (options.removeTrailingSlash || urlObj.pathname === '/') &&
          urlObj.hash === '' &&
          options.removeSingleSlash
        ) {
          urlString = urlString.replace(/\/$/, '');
        }

        // Restore relative protocol, if applicable
        if (hasRelativeProtocol && !options.normalizeProtocol) {
          urlString = urlString.replace(/^http:\/\//, '//');
        }

        // Remove http/https
        if (options.stripProtocol) {
          urlString = urlString.replace(/^(?:https?:)?\/\//, '');
        }

        return urlString;
      };

      module.exports = normalizeUrl;

      /***/
    },

    /***/ 8116: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const EventEmitter = __nccwpck_require__(2361);
      const urlLib = __nccwpck_require__(7310);
      const normalizeUrl = __nccwpck_require__(7472);
      const getStream = __nccwpck_require__(1766);
      const CachePolicy = __nccwpck_require__(1002);
      const Response = __nccwpck_require__(9004);
      const lowercaseKeys = __nccwpck_require__(9662);
      const cloneResponse = __nccwpck_require__(1312);
      const Keyv = __nccwpck_require__(1531);

      class CacheableRequest {
        constructor(request, cacheAdapter) {
          if (typeof request !== 'function') {
            throw new TypeError('Parameter `request` must be a function');
          }

          this.cache = new Keyv({
            uri: typeof cacheAdapter === 'string' && cacheAdapter,
            store: typeof cacheAdapter !== 'string' && cacheAdapter,
            namespace: 'cacheable-request',
          });

          return this.createCacheableRequest(request);
        }

        createCacheableRequest(request) {
          return (opts, cb) => {
            let url;
            if (typeof opts === 'string') {
              url = normalizeUrlObject(urlLib.parse(opts));
              opts = {};
            } else if (opts instanceof urlLib.URL) {
              url = normalizeUrlObject(urlLib.parse(opts.toString()));
              opts = {};
            } else {
              const [pathname, ...searchParts] = (opts.path || '').split('?');
              const search =
                searchParts.length > 0 ? `?${searchParts.join('?')}` : '';
              url = normalizeUrlObject({ ...opts, pathname, search });
            }

            opts = {
              headers: {},
              method: 'GET',
              cache: true,
              strictTtl: false,
              automaticFailover: false,
              ...opts,
              ...urlObjectToRequestOptions(url),
            };
            opts.headers = lowercaseKeys(opts.headers);

            const ee = new EventEmitter();
            const normalizedUrlString = normalizeUrl(urlLib.format(url), {
              stripWWW: false,
              removeTrailingSlash: false,
              stripAuthentication: false,
            });
            const key = `${opts.method}:${normalizedUrlString}`;
            let revalidate = false;
            let madeRequest = false;

            const makeRequest = (opts) => {
              madeRequest = true;
              let requestErrored = false;
              let requestErrorCallback;

              const requestErrorPromise = new Promise((resolve) => {
                requestErrorCallback = () => {
                  if (!requestErrored) {
                    requestErrored = true;
                    resolve();
                  }
                };
              });

              const handler = (response) => {
                if (revalidate && !opts.forceRefresh) {
                  response.status = response.statusCode;
                  const revalidatedPolicy = CachePolicy.fromObject(
                    revalidate.cachePolicy
                  ).revalidatedPolicy(opts, response);
                  if (!revalidatedPolicy.modified) {
                    const headers = revalidatedPolicy.policy.responseHeaders();
                    response = new Response(
                      revalidate.statusCode,
                      headers,
                      revalidate.body,
                      revalidate.url
                    );
                    response.cachePolicy = revalidatedPolicy.policy;
                    response.fromCache = true;
                  }
                }

                if (!response.fromCache) {
                  response.cachePolicy = new CachePolicy(opts, response, opts);
                  response.fromCache = false;
                }

                let clonedResponse;
                if (opts.cache && response.cachePolicy.storable()) {
                  clonedResponse = cloneResponse(response);

                  (async () => {
                    try {
                      const bodyPromise = getStream.buffer(response);

                      await Promise.race([
                        requestErrorPromise,
                        new Promise((resolve) => response.once('end', resolve)),
                      ]);

                      if (requestErrored) {
                        return;
                      }

                      const body = await bodyPromise;

                      const value = {
                        cachePolicy: response.cachePolicy.toObject(),
                        url: response.url,
                        statusCode: response.fromCache
                          ? revalidate.statusCode
                          : response.statusCode,
                        body,
                      };

                      let ttl = opts.strictTtl
                        ? response.cachePolicy.timeToLive()
                        : undefined;
                      if (opts.maxTtl) {
                        ttl = ttl ? Math.min(ttl, opts.maxTtl) : opts.maxTtl;
                      }

                      await this.cache.set(key, value, ttl);
                    } catch (error) {
                      ee.emit('error', new CacheableRequest.CacheError(error));
                    }
                  })();
                } else if (opts.cache && revalidate) {
                  (async () => {
                    try {
                      await this.cache.delete(key);
                    } catch (error) {
                      ee.emit('error', new CacheableRequest.CacheError(error));
                    }
                  })();
                }

                ee.emit('response', clonedResponse || response);
                if (typeof cb === 'function') {
                  cb(clonedResponse || response);
                }
              };

              try {
                const req = request(opts, handler);
                req.once('error', requestErrorCallback);
                req.once('abort', requestErrorCallback);
                ee.emit('request', req);
              } catch (error) {
                ee.emit('error', new CacheableRequest.RequestError(error));
              }
            };

            (async () => {
              const get = async (opts) => {
                await Promise.resolve();

                const cacheEntry = opts.cache
                  ? await this.cache.get(key)
                  : undefined;
                if (typeof cacheEntry === 'undefined') {
                  return makeRequest(opts);
                }

                const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
                if (
                  policy.satisfiesWithoutRevalidation(opts) &&
                  !opts.forceRefresh
                ) {
                  const headers = policy.responseHeaders();
                  const response = new Response(
                    cacheEntry.statusCode,
                    headers,
                    cacheEntry.body,
                    cacheEntry.url
                  );
                  response.cachePolicy = policy;
                  response.fromCache = true;

                  ee.emit('response', response);
                  if (typeof cb === 'function') {
                    cb(response);
                  }
                } else {
                  revalidate = cacheEntry;
                  opts.headers = policy.revalidationHeaders(opts);
                  makeRequest(opts);
                }
              };

              const errorHandler = (error) =>
                ee.emit('error', new CacheableRequest.CacheError(error));
              this.cache.once('error', errorHandler);
              ee.on('response', () =>
                this.cache.removeListener('error', errorHandler)
              );

              try {
                await get(opts);
              } catch (error) {
                if (opts.automaticFailover && !madeRequest) {
                  makeRequest(opts);
                }

                ee.emit('error', new CacheableRequest.CacheError(error));
              }
            })();

            return ee;
          };
        }
      }

      function urlObjectToRequestOptions(url) {
        const options = { ...url };
        options.path = `${url.pathname || '/'}${url.search || ''}`;
        delete options.pathname;
        delete options.search;
        return options;
      }

      function normalizeUrlObject(url) {
        // If url was parsed by url.parse or new URL:
        // - hostname will be set
        // - host will be hostname[:port]
        // - port will be set if it was explicit in the parsed string
        // Otherwise, url was from request options:
        // - hostname or host may be set
        // - host shall not have port encoded
        return {
          protocol: url.protocol,
          auth: url.auth,
          hostname: url.hostname || url.host || 'localhost',
          port: url.port,
          pathname: url.pathname,
          search: url.search,
        };
      }

      CacheableRequest.RequestError = class extends Error {
        constructor(error) {
          super(error.message);
          this.name = 'RequestError';
          Object.assign(this, error);
        }
      };

      CacheableRequest.CacheError = class extends Error {
        constructor(error) {
          super(error.message);
          this.name = 'CacheError';
          Object.assign(this, error);
        }
      };

      module.exports = CacheableRequest;

      /***/
    },

    /***/ 1312: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const PassThrough = __nccwpck_require__(2781).PassThrough;
      const mimicResponse = __nccwpck_require__(2610);

      const cloneResponse = (response) => {
        if (!(response && response.pipe)) {
          throw new TypeError(
            'Parameter `response` must be a response stream.'
          );
        }

        const clone = new PassThrough();
        mimicResponse(response, clone);

        return response.pipe(clone);
      };

      module.exports = cloneResponse;

      /***/
    },

    /***/ 5728: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const { promisify } = __nccwpck_require__(3837);
      const JSONB = __nccwpck_require__(2820);
      const zlib = __nccwpck_require__(9796);

      const mergeOptions = __nccwpck_require__(4968);

      const compress = promisify(zlib.brotliCompress);

      const decompress = promisify(zlib.brotliDecompress);

      const identity = (val) => val;

      const createCompress = ({
        enable = true,
        serialize = JSONB.stringify,
        deserialize = JSONB.parse,
        compressOptions,
        decompressOptions,
      } = {}) => {
        if (!enable) {
          return {
            serialize,
            deserialize,
            decompress: identity,
            compress: identity,
          };
        }

        return {
          serialize,
          deserialize,
          compress: async (data, options = {}) => {
            if (data === undefined) return data;
            const serializedData = serialize(data);
            return compress(
              serializedData,
              mergeOptions(compressOptions, options)
            );
          },
          decompress: async (data, options = {}) => {
            if (data === undefined) return data;
            return deserialize(
              await decompress(data, mergeOptions(decompressOptions, options))
            );
          },
        };
      };

      module.exports = createCompress;
      module.exports.stringify = JSONB.stringify;
      module.exports.parse = JSONB.parse;

      /***/
    },

    /***/ 4968: /***/ (module) => {
      'use strict';

      module.exports = (defaultOptions = {}, options = {}) => {
        const params = {
          ...(defaultOptions.params || {}),
          ...(options.params || {}),
        };

        return {
          ...defaultOptions,
          ...options,
          ...(Object.keys(params).length
            ? {
                params,
              }
            : {}),
        };
      };

      /***/
    },

    /***/ 2391: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const { Transform, PassThrough } = __nccwpck_require__(2781);
      const zlib = __nccwpck_require__(9796);
      const mimicResponse = __nccwpck_require__(3877);

      module.exports = (response) => {
        const contentEncoding = (
          response.headers['content-encoding'] || ''
        ).toLowerCase();

        if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
          return response;
        }

        // TODO: Remove this when targeting Node.js 12.
        const isBrotli = contentEncoding === 'br';
        if (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {
          response.destroy(
            new Error('Brotli is not supported on Node.js < 12')
          );
          return response;
        }

        let isEmpty = true;

        const checker = new Transform({
          transform(data, _encoding, callback) {
            isEmpty = false;

            callback(null, data);
          },

          flush(callback) {
            callback();
          },
        });

        const finalStream = new PassThrough({
          autoDestroy: false,
          destroy(error, callback) {
            response.destroy();

            callback(error);
          },
        });

        const decompressStream = isBrotli
          ? zlib.createBrotliDecompress()
          : zlib.createUnzip();

        decompressStream.once('error', (error) => {
          if (isEmpty && !response.readable) {
            finalStream.end();
            return;
          }

          finalStream.destroy(error);
        });

        mimicResponse(response, finalStream);
        response.pipe(checker).pipe(decompressStream).pipe(finalStream);

        return finalStream;
      };

      /***/
    },

    /***/ 3877: /***/ (module) => {
      'use strict';

      // We define these manually to ensure they're always copied
      // even if they would move up the prototype chain
      // https://nodejs.org/api/http.html#http_class_http_incomingmessage
      const knownProperties = [
        'aborted',
        'complete',
        'headers',
        'httpVersion',
        'httpVersionMinor',
        'httpVersionMajor',
        'method',
        'rawHeaders',
        'rawTrailers',
        'setTimeout',
        'socket',
        'statusCode',
        'statusMessage',
        'trailers',
        'url',
      ];

      module.exports = (fromStream, toStream) => {
        if (toStream._readableState.autoDestroy) {
          throw new Error(
            'The second stream must have the `autoDestroy` option set to `false`'
          );
        }

        const fromProperties = new Set(
          Object.keys(fromStream).concat(knownProperties)
        );

        const properties = {};

        for (const property of fromProperties) {
          // Don't overwrite existing properties.
          if (property in toStream) {
            continue;
          }

          properties[property] = {
            get() {
              const value = fromStream[property];
              const isFunction = typeof value === 'function';

              return isFunction ? value.bind(fromStream) : value;
            },
            set(value) {
              fromStream[property] = value;
            },
            enumerable: true,
            configurable: false,
          };
        }

        Object.defineProperties(toStream, properties);

        fromStream.once('aborted', () => {
          toStream.destroy();

          toStream.emit('aborted');
        });

        fromStream.once('close', () => {
          if (fromStream.complete) {
            if (toStream.readable) {
              toStream.once('end', () => {
                toStream.emit('close');
              });
            } else {
              toStream.emit('close');
            }
          } else {
            toStream.emit('close');
          }
        });

        return toStream;
      };

      /***/
    },

    /***/ 6214: /***/ (module, exports, __nccwpck_require__) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const tls_1 = __nccwpck_require__(4404);
      const deferToConnect = (socket, fn) => {
        let listeners;
        if (typeof fn === 'function') {
          const connect = fn;
          listeners = { connect };
        } else {
          listeners = fn;
        }
        const hasConnectListener = typeof listeners.connect === 'function';
        const hasSecureConnectListener =
          typeof listeners.secureConnect === 'function';
        const hasCloseListener = typeof listeners.close === 'function';
        const onConnect = () => {
          if (hasConnectListener) {
            listeners.connect();
          }
          if (socket instanceof tls_1.TLSSocket && hasSecureConnectListener) {
            if (socket.authorized) {
              listeners.secureConnect();
            } else if (!socket.authorizationError) {
              socket.once('secureConnect', listeners.secureConnect);
            }
          }
          if (hasCloseListener) {
            socket.once('close', listeners.close);
          }
        };
        if (socket.writable && !socket.connecting) {
          onConnect();
        } else if (socket.connecting) {
          socket.once('connect', onConnect);
        } else if (socket.destroyed && hasCloseListener) {
          listeners.close(socket._hadError);
        }
      };
      exports['default'] = deferToConnect;
      // For CommonJS default export support
      module.exports = deferToConnect;
      module.exports['default'] = deferToConnect;

      /***/
    },

    /***/ 8431: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';
      /*
       * EJS Embedded JavaScript templates
       * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *         http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       */

      /**
       * @file Embedded JavaScript templating engine. {@link http://ejs.co}
       * @author Matthew Eernisse <mde@fleegix.org>
       * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
       * @project EJS
       * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
       */

      /**
       * EJS internal functions.
       *
       * Technically this "module" lies in the same file as {@link module:ejs}, for
       * the sake of organization all the private functions re grouped into this
       * module.
       *
       * @module ejs-internal
       * @private
       */

      /**
       * Embedded JavaScript templating engine.
       *
       * @module ejs
       * @public
       */

      var fs = __nccwpck_require__(7147);
      var path = __nccwpck_require__(1017);
      var utils = __nccwpck_require__(356);

      var scopeOptionWarned = false;
      /** @type {string} */
      var _VERSION_STRING = __nccwpck_require__(3558) /* .version */.i8;
      var _DEFAULT_OPEN_DELIMITER = '<';
      var _DEFAULT_CLOSE_DELIMITER = '>';
      var _DEFAULT_DELIMITER = '%';
      var _DEFAULT_LOCALS_NAME = 'locals';
      var _NAME = 'ejs';
      var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
      var _OPTS_PASSABLE_WITH_DATA = [
        'delimiter',
        'scope',
        'context',
        'debug',
        'compileDebug',
        'client',
        '_with',
        'rmWhitespace',
        'strict',
        'filename',
        'async',
      ];
      // We don't allow 'cache' option to be passed in the data obj for
      // the normal `render` call, but this is where Express 2 & 3 put it
      // so we make an exception for `renderFile`
      var _OPTS_PASSABLE_WITH_DATA_EXPRESS =
        _OPTS_PASSABLE_WITH_DATA.concat('cache');
      var _BOM = /^\uFEFF/;
      var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

      /**
       * EJS template function cache. This can be a LRU object from lru-cache NPM
       * module. By default, it is {@link module:utils.cache}, a simple in-process
       * cache that grows continuously.
       *
       * @type {Cache}
       */

      exports.cache = utils.cache;

      /**
       * Custom file loader. Useful for template preprocessing or restricting access
       * to a certain part of the filesystem.
       *
       * @type {fileLoader}
       */

      exports.fileLoader = fs.readFileSync;

      /**
       * Name of the object containing the locals.
       *
       * This variable is overridden by {@link Options}`.localsName` if it is not
       * `undefined`.
       *
       * @type {String}
       * @public
       */

      exports.localsName = _DEFAULT_LOCALS_NAME;

      /**
       * Promise implementation -- defaults to the native implementation if available
       * This is mostly just for testability
       *
       * @type {PromiseConstructorLike}
       * @public
       */

      exports.promiseImpl = new Function('return this;')().Promise;

      /**
       * Get the path to the included file from the parent file path and the
       * specified path.
       *
       * @param {String}  name     specified path
       * @param {String}  filename parent file path
       * @param {Boolean} [isDir=false] whether the parent file path is a directory
       * @return {String}
       */
      exports.resolveInclude = function (name, filename, isDir) {
        var dirname = path.dirname;
        var extname = path.extname;
        var resolve = path.resolve;
        var includePath = resolve(isDir ? filename : dirname(filename), name);
        var ext = extname(name);
        if (!ext) {
          includePath += '.ejs';
        }
        return includePath;
      };

      /**
       * Try to resolve file path on multiple directories
       *
       * @param  {String}        name  specified path
       * @param  {Array<String>} paths list of possible parent directory paths
       * @return {String}
       */
      function resolvePaths(name, paths) {
        var filePath;
        if (
          paths.some(function (v) {
            filePath = exports.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })
        ) {
          return filePath;
        }
      }

      /**
       * Get the path to the included file by Options
       *
       * @param  {String}  path    specified path
       * @param  {Options} options compilation options
       * @return {String}
       */
      function getIncludePath(path, options) {
        var includePath;
        var filePath;
        var views = options.views;
        var match = /^[A-Za-z]+:\\|^\//.exec(path);

        // Abs path
        if (match && match.length) {
          path = path.replace(/^\/*/, '');
          if (Array.isArray(options.root)) {
            includePath = resolvePaths(path, options.root);
          } else {
            includePath = exports.resolveInclude(
              path,
              options.root || '/',
              true
            );
          }
        }
        // Relative paths
        else {
          // Look relative to a passed filename first
          if (options.filename) {
            filePath = exports.resolveInclude(path, options.filename);
            if (fs.existsSync(filePath)) {
              includePath = filePath;
            }
          }
          // Then look in any views directories
          if (!includePath && Array.isArray(views)) {
            includePath = resolvePaths(path, views);
          }
          if (!includePath && typeof options.includer !== 'function') {
            throw new Error(
              'Could not find the include file "' +
                options.escapeFunction(path) +
                '"'
            );
          }
        }
        return includePath;
      }

      /**
       * Get the template from a string or a file, either compiled on-the-fly or
       * read from cache (if enabled), and cache the template if needed.
       *
       * If `template` is not set, the file specified in `options.filename` will be
       * read.
       *
       * If `options.cache` is true, this function reads the file from
       * `options.filename` so it must be set prior to calling this function.
       *
       * @memberof module:ejs-internal
       * @param {Options} options   compilation options
       * @param {String} [template] template source
       * @return {(TemplateFunction|ClientFunction)}
       * Depending on the value of `options.client`, either type might be returned.
       * @static
       */

      function handleCache(options, template) {
        var func;
        var filename = options.filename;
        var hasTemplate = arguments.length > 1;

        if (options.cache) {
          if (!filename) {
            throw new Error('cache option requires a filename');
          }
          func = exports.cache.get(filename);
          if (func) {
            return func;
          }
          if (!hasTemplate) {
            template = fileLoader(filename).toString().replace(_BOM, '');
          }
        } else if (!hasTemplate) {
          // istanbul ignore if: should not happen at all
          if (!filename) {
            throw new Error(
              'Internal EJS error: no file name or template ' + 'provided'
            );
          }
          template = fileLoader(filename).toString().replace(_BOM, '');
        }
        func = exports.compile(template, options);
        if (options.cache) {
          exports.cache.set(filename, func);
        }
        return func;
      }

      /**
       * Try calling handleCache with the given options and data and call the
       * callback with the result. If an error occurs, call the callback with
       * the error. Used by renderFile().
       *
       * @memberof module:ejs-internal
       * @param {Options} options    compilation options
       * @param {Object} data        template data
       * @param {RenderFileCallback} cb callback
       * @static
       */

      function tryHandleCache(options, data, cb) {
        var result;
        if (!cb) {
          if (typeof exports.promiseImpl == 'function') {
            return new exports.promiseImpl(function (resolve, reject) {
              try {
                result = handleCache(options)(data);
                resolve(result);
              } catch (err) {
                reject(err);
              }
            });
          } else {
            throw new Error('Please provide a callback function');
          }
        } else {
          try {
            result = handleCache(options)(data);
          } catch (err) {
            return cb(err);
          }

          cb(null, result);
        }
      }

      /**
       * fileLoader is independent
       *
       * @param {String} filePath ejs file path.
       * @return {String} The contents of the specified file.
       * @static
       */

      function fileLoader(filePath) {
        return exports.fileLoader(filePath);
      }

      /**
       * Get the template function.
       *
       * If `options.cache` is `true`, then the template is cached.
       *
       * @memberof module:ejs-internal
       * @param {String}  path    path for the specified file
       * @param {Options} options compilation options
       * @return {(TemplateFunction|ClientFunction)}
       * Depending on the value of `options.client`, either type might be returned
       * @static
       */

      function includeFile(path, options) {
        var opts = utils.shallowCopy(
          utils.createNullProtoObjWherePossible(),
          options
        );
        opts.filename = getIncludePath(path, opts);
        if (typeof options.includer === 'function') {
          var includerResult = options.includer(path, opts.filename);
          if (includerResult) {
            if (includerResult.filename) {
              opts.filename = includerResult.filename;
            }
            if (includerResult.template) {
              return handleCache(opts, includerResult.template);
            }
          }
        }
        return handleCache(opts);
      }

      /**
       * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
       * `lineno`.
       *
       * @implements {RethrowCallback}
       * @memberof module:ejs-internal
       * @param {Error}  err      Error object
       * @param {String} str      EJS source
       * @param {String} flnm     file name of the EJS file
       * @param {Number} lineno   line number of the error
       * @param {EscapeCallback} esc
       * @static
       */

      function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines
          .slice(start, end)
          .map(function (line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') + curr + '| ' + line;
          })
          .join('\n');

        // Alter exception message
        err.path = filename;
        err.message =
          (filename || 'ejs') +
          ':' +
          lineno +
          '\n' +
          context +
          '\n\n' +
          err.message;

        throw err;
      }

      function stripSemi(str) {
        return str.replace(/;(\s*$)/, '$1');
      }

      /**
       * Compile the given `str` of ejs into a template function.
       *
       * @param {String}  template EJS template
       *
       * @param {Options} [opts] compilation options
       *
       * @return {(TemplateFunction|ClientFunction)}
       * Depending on the value of `opts.client`, either type might be returned.
       * Note that the return type of the function also depends on the value of `opts.async`.
       * @public
       */

      exports.compile = function compile(template, opts) {
        var templ;

        // v1 compat
        // 'scope' is 'context'
        // FIXME: Remove this in a future version
        if (opts && opts.scope) {
          if (!scopeOptionWarned) {
            console.warn(
              '`scope` option is deprecated and will be removed in EJS 3'
            );
            scopeOptionWarned = true;
          }
          if (!opts.context) {
            opts.context = opts.scope;
          }
          delete opts.scope;
        }
        templ = new Template(template, opts);
        return templ.compile();
      };

      /**
       * Render the given `template` of ejs.
       *
       * If you would like to include options but not data, you need to explicitly
       * call this function with `data` being an empty object or `null`.
       *
       * @param {String}   template EJS template
       * @param {Object}  [data={}] template data
       * @param {Options} [opts={}] compilation and rendering options
       * @return {(String|Promise<String>)}
       * Return value type depends on `opts.async`.
       * @public
       */

      exports.render = function (template, d, o) {
        var data = d || utils.createNullProtoObjWherePossible();
        var opts = o || utils.createNullProtoObjWherePossible();

        // No options object -- if there are optiony names
        // in the data, copy them to options
        if (arguments.length == 2) {
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
        }

        return handleCache(opts, template)(data);
      };

      /**
       * Render an EJS file at the given `path` and callback `cb(err, str)`.
       *
       * If you would like to include options but not data, you need to explicitly
       * call this function with `data` being an empty object or `null`.
       *
       * @param {String}             path     path to the EJS file
       * @param {Object}            [data={}] template data
       * @param {Options}           [opts={}] compilation and rendering options
       * @param {RenderFileCallback} cb callback
       * @public
       */

      exports.renderFile = function () {
        var args = Array.prototype.slice.call(arguments);
        var filename = args.shift();
        var cb;
        var opts = { filename: filename };
        var data;
        var viewOpts;

        // Do we have a callback?
        if (typeof arguments[arguments.length - 1] == 'function') {
          cb = args.pop();
        }
        // Do we have data/opts?
        if (args.length) {
          // Should always have data obj
          data = args.shift();
          // Normal passed opts (data obj + opts obj)
          if (args.length) {
            // Use shallowCopy so we don't pollute passed in opts obj with new vals
            utils.shallowCopy(opts, args.pop());
          }
          // Special casing for Express (settings + opts-in-data)
          else {
            // Express 3 and 4
            if (data.settings) {
              // Pull a few things from known locations
              if (data.settings.views) {
                opts.views = data.settings.views;
              }
              if (data.settings['view cache']) {
                opts.cache = true;
              }
              // Undocumented after Express 2, but still usable, esp. for
              // items that are unsafe to be passed along with data, like `root`
              viewOpts = data.settings['view options'];
              if (viewOpts) {
                utils.shallowCopy(opts, viewOpts);
              }
            }
            // Express 2 and lower, values set in app.locals, or people who just
            // want to pass options in their data. NOTE: These values will override
            // anything previously set in settings  or settings['view options']
            utils.shallowCopyFromList(
              opts,
              data,
              _OPTS_PASSABLE_WITH_DATA_EXPRESS
            );
          }
          opts.filename = filename;
        } else {
          data = utils.createNullProtoObjWherePossible();
        }

        return tryHandleCache(opts, data, cb);
      };

      /**
       * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
       * @public
       */

      /**
       * EJS template class
       * @public
       */
      exports.Template = Template;

      exports.clearCache = function () {
        exports.cache.reset();
      };

      function Template(text, opts) {
        opts = opts || utils.createNullProtoObjWherePossible();
        var options = utils.createNullProtoObjWherePossible();
        this.templateText = text;
        /** @type {string | null} */
        this.mode = null;
        this.truncate = false;
        this.currentLine = 1;
        this.source = '';
        options.client = opts.client || false;
        options.escapeFunction =
          opts.escape || opts.escapeFunction || utils.escapeXML;
        options.compileDebug = opts.compileDebug !== false;
        options.debug = !!opts.debug;
        options.filename = opts.filename;
        options.openDelimiter =
          opts.openDelimiter ||
          exports.openDelimiter ||
          _DEFAULT_OPEN_DELIMITER;
        options.closeDelimiter =
          opts.closeDelimiter ||
          exports.closeDelimiter ||
          _DEFAULT_CLOSE_DELIMITER;
        options.delimiter =
          opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
        options.strict = opts.strict || false;
        options.context = opts.context;
        options.cache = opts.cache || false;
        options.rmWhitespace = opts.rmWhitespace;
        options.root = opts.root;
        options.includer = opts.includer;
        options.outputFunctionName = opts.outputFunctionName;
        options.localsName =
          opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
        options.views = opts.views;
        options.async = opts.async;
        options.destructuredLocals = opts.destructuredLocals;
        options.legacyInclude =
          typeof opts.legacyInclude != 'undefined'
            ? !!opts.legacyInclude
            : true;

        if (options.strict) {
          options._with = false;
        } else {
          options._with = typeof opts._with != 'undefined' ? opts._with : true;
        }

        this.opts = options;

        this.regex = this.createRegex();
      }

      Template.modes = {
        EVAL: 'eval',
        ESCAPED: 'escaped',
        RAW: 'raw',
        COMMENT: 'comment',
        LITERAL: 'literal',
      };

      Template.prototype = {
        createRegex: function () {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str
            .replace(/%/g, delim)
            .replace(/</g, open)
            .replace(/>/g, close);
          return new RegExp(str);
        },

        compile: function () {
          /** @type {string} */
          var src;
          /** @type {ClientFunction} */
          var fn;
          var opts = this.opts;
          var prepended = '';
          var appended = '';
          /** @type {EscapeCallback} */
          var escapeFn = opts.escapeFunction;
          /** @type {FunctionConstructor} */
          var ctor;
          /** @type {string} */
          var sanitizedFilename = opts.filename
            ? JSON.stringify(opts.filename)
            : 'undefined';

          if (!this.source) {
            this.generateSource();
            prepended +=
              '  var __output = "";\n' +
              '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error(
                  'outputFunctionName is not a valid JS identifier.'
                );
              }
              prepended +=
                '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error('localsName is not a valid JS identifier.');
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring =
                '  var __locals = (' + opts.localsName + ' || {}),\n';
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error(
                    'destructuredLocals[' +
                      i +
                      '] is not a valid JS identifier.'
                  );
                }
                if (i > 0) {
                  destructuring += ',\n  ';
                }
                destructuring += name + ' = __locals.' + name;
              }
              prepended += destructuring + ';\n';
            }
            if (opts._with !== false) {
              prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
              appended += '  }' + '\n';
            }
            appended += '  return __output;' + '\n';
            this.source = prepended + this.source + appended;
          }

          if (opts.compileDebug) {
            src =
              'var __line = 1' +
              '\n' +
              '  , __lines = ' +
              JSON.stringify(this.templateText) +
              '\n' +
              '  , __filename = ' +
              sanitizedFilename +
              ';' +
              '\n' +
              'try {' +
              '\n' +
              this.source +
              '} catch (e) {' +
              '\n' +
              '  rethrow(e, __lines, __filename, __line, escapeFn);' +
              '\n' +
              '}' +
              '\n';
          } else {
            src = this.source;
          }

          if (opts.client) {
            src =
              'escapeFn = escapeFn || ' +
              escapeFn.toString() +
              ';' +
              '\n' +
              src;
            if (opts.compileDebug) {
              src =
                'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
            }
          }

          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + '\n' + '//# sourceURL=' + sanitizedFilename + '\n';
          }

          try {
            if (opts.async) {
              // Have to use generated function for this, since in envs without support,
              // it breaks in parsing
              try {
                ctor = new Function(
                  'return (async function(){}).constructor;'
                )();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error(
                    'This environment does not support async/await'
                  );
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(
              opts.localsName + ', escapeFn, include, rethrow',
              src
            );
          } catch (e) {
            // istanbul ignore else
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += ' in ' + opts.filename;
              }
              e.message += ' while compiling ejs\n\n';
              e.message +=
                'If the above error is not helpful, you may want to try EJS-Lint:\n';
              e.message += 'https://github.com/RyanZim/EJS-Lint';
              if (!opts.async) {
                e.message += '\n';
                e.message +=
                  'Or, if you meant to create an async function, pass `async: true` as an option.';
              }
            }
            throw e;
          }

          // Return a callable function which will execute the function
          // created by the source-code, with the passed data as locals
          // Adds a local `include` function which allows full recursive include
          var returnedFn = opts.client
            ? fn
            : function anonymous(data) {
                var include = function (path, includeData) {
                  var d = utils.shallowCopy(
                    utils.createNullProtoObjWherePossible(),
                    data
                  );
                  if (includeData) {
                    d = utils.shallowCopy(d, includeData);
                  }
                  return includeFile(path, opts)(d);
                };
                return fn.apply(opts.context, [
                  data || utils.createNullProtoObjWherePossible(),
                  escapeFn,
                  include,
                  rethrow,
                ]);
              };
          if (opts.filename && typeof Object.defineProperty === 'function') {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, 'name', {
                value: basename,
                writable: false,
                enumerable: false,
                configurable: true,
              });
            } catch (e) {
              /* ignore */
            }
          }
          return returnedFn;
        },

        generateSource: function () {
          var opts = this.opts;

          if (opts.rmWhitespace) {
            // Have to use two separate replace here as `^` and `$` operators don't
            // work well with `\r` and empty lines don't work well with the `m` flag.
            this.templateText = this.templateText
              .replace(/[\r\n]+/g, '\n')
              .replace(/^\s+|\s+$/gm, '');
          }

          // Slurp spaces and tabs before <%_ and after _%>
          this.templateText = this.templateText
            .replace(/[ \t]*<%_/gm, '<%_')
            .replace(/_%>[ \t]*/gm, '_%>');

          var self = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;

          if (matches && matches.length) {
            matches.forEach(function (line, index) {
              var closing;
              // If this is an opening tag, check for closing tags
              // FIXME: May end up with some false positives here
              // Better to store modes as k/v with openDelimiter + delimiter as key
              // Then this can simply check against the map
              if (
                line.indexOf(o + d) === 0 && // If it is a tag
                line.indexOf(o + d + d) !== 0
              ) {
                // and is not escaped
                closing = matches[index + 2];
                if (
                  !(
                    closing == d + c ||
                    closing == '-' + d + c ||
                    closing == '_' + d + c
                  )
                ) {
                  throw new Error(
                    'Could not find matching close tag for "' + line + '".'
                  );
                }
              }
              self.scanLine(line);
            });
          }
        },

        parseTemplateText: function () {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;

          while (result) {
            firstPos = result.index;

            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }

            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }

          if (str) {
            arr.push(str);
          }

          return arr;
        },

        _addOutput: function (line) {
          if (this.truncate) {
            // Only replace single leading linebreak in the line after
            // -%> tag -- this is the single, trailing linebreak
            // after the tag that the truncation mode replaces
            // Handle Win / Unix / old Mac linebreaks -- do the \r\n
            // combo first in the regex-or
            line = line.replace(/^(?:\r\n|\r|\n)/, '');
            this.truncate = false;
          }
          if (!line) {
            return line;
          }

          // Preserve literal slashes
          line = line.replace(/\\/g, '\\\\');

          // Convert linebreaks
          line = line.replace(/\n/g, '\\n');
          line = line.replace(/\r/g, '\\r');

          // Escape double-quotes
          // - this will be the delimiter during execution
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")' + '\n';
        },

        scanLine: function (line) {
          var self = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;

          newLineCount = line.split('\n').length - 1;

          switch (line) {
            case o + d:
            case o + d + '_':
              this.mode = Template.modes.EVAL;
              break;
            case o + d + '=':
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + '-':
              this.mode = Template.modes.RAW;
              break;
            case o + d + '#':
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source +=
                '    ; __append("' +
                line.replace(o + d + d, o + d) +
                '")' +
                '\n';
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source +=
                '    ; __append("' +
                line.replace(d + d + c, d + c) +
                '")' +
                '\n';
              break;
            case d + c:
            case '-' + d + c:
            case '_' + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }

              this.mode = null;
              this.truncate =
                line.indexOf('-') === 0 || line.indexOf('_') === 0;
              break;
            default:
              // In script mode, depends on type of tag
              if (this.mode) {
                // If '//' is found without a line break, add a line break.
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                      line += '\n';
                    }
                }
                switch (this.mode) {
                  // Just executing code
                  case Template.modes.EVAL:
                    this.source += '    ; ' + line + '\n';
                    break;
                  // Exec, esc, and output
                  case Template.modes.ESCAPED:
                    this.source +=
                      '    ; __append(escapeFn(' +
                      stripSemi(line) +
                      '))' +
                      '\n';
                    break;
                  // Exec and output
                  case Template.modes.RAW:
                    this.source +=
                      '    ; __append(' + stripSemi(line) + ')' + '\n';
                    break;
                  case Template.modes.COMMENT:
                    // Do nothing
                    break;
                  // Literal <%% mode, append as raw output
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              }
              // In string mode, just add the output
              else {
                this._addOutput(line);
              }
          }

          if (self.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += '    ; __line = ' + this.currentLine + '\n';
          }
        },
      };

      /**
       * Escape characters reserved in XML.
       *
       * This is simply an export of {@link module:utils.escapeXML}.
       *
       * If `markup` is `undefined` or `null`, the empty string is returned.
       *
       * @param {String} markup Input string
       * @return {String} Escaped string
       * @public
       * @func
       * */
      exports.escapeXML = utils.escapeXML;

      /**
       * Express.js support.
       *
       * This is an alias for {@link module:ejs.renderFile}, in order to support
       * Express.js out-of-the-box.
       *
       * @func
       */

      exports.__express = exports.renderFile;

      /**
       * Version of EJS.
       *
       * @readonly
       * @type {String}
       * @public
       */

      exports.VERSION = _VERSION_STRING;

      /**
       * Name for detection of EJS.
       *
       * @readonly
       * @type {String}
       * @public
       */

      exports.name = _NAME;

      /* istanbul ignore if */
      if (typeof window != 'undefined') {
        window.ejs = exports;
      }

      /***/
    },

    /***/ 356: /***/ (__unused_webpack_module, exports) => {
      'use strict';
      /*
       * EJS Embedded JavaScript templates
       * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *         http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       */

      /**
       * Private utility functions
       * @module utils
       * @private
       */

      var regExpChars = /[|\\{}()[\]^$+*?.]/g;

      /**
       * Escape characters reserved in regular expressions.
       *
       * If `string` is `undefined` or `null`, the empty string is returned.
       *
       * @param {String} string Input string
       * @return {String} Escaped string
       * @static
       * @private
       */
      exports.escapeRegExpChars = function (string) {
        // istanbul ignore if
        if (!string) {
          return '';
        }
        return String(string).replace(regExpChars, '\\$&');
      };

      var _ENCODE_HTML_RULES = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
        "'": '&#39;',
      };
      var _MATCH_HTML = /[&<>'"]/g;

      function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
      }

      /**
       * Stringified version of constants used by {@link module:utils.escapeXML}.
       *
       * It is used in the process of generating {@link ClientFunction}s.
       *
       * @readonly
       * @type {String}
       */

      var escapeFuncStr =
        'var _ENCODE_HTML_RULES = {\n' +
        '      "&": "&amp;"\n' +
        '    , "<": "&lt;"\n' +
        '    , ">": "&gt;"\n' +
        '    , \'"\': "&#34;"\n' +
        '    , "\'": "&#39;"\n' +
        '    }\n' +
        '  , _MATCH_HTML = /[&<>\'"]/g;\n' +
        'function encode_char(c) {\n' +
        '  return _ENCODE_HTML_RULES[c] || c;\n' +
        '};\n';

      /**
       * Escape characters reserved in XML.
       *
       * If `markup` is `undefined` or `null`, the empty string is returned.
       *
       * @implements {EscapeCallback}
       * @param {String} markup Input string
       * @return {String} Escaped string
       * @static
       * @private
       */

      exports.escapeXML = function (markup) {
        return markup == undefined
          ? ''
          : String(markup).replace(_MATCH_HTML, encode_char);
      };
      exports.escapeXML.toString = function () {
        return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
      };

      /**
       * Naive copy of properties from one object to another.
       * Does not recurse into non-scalar properties
       * Does not check to see if the property has a value before copying
       *
       * @param  {Object} to   Destination object
       * @param  {Object} from Source object
       * @return {Object}      Destination object
       * @static
       * @private
       */
      exports.shallowCopy = function (to, from) {
        from = from || {};
        if (to !== null && to !== undefined) {
          for (var p in from) {
            to[p] = from[p];
          }
        }
        return to;
      };

      /**
       * Naive copy of a list of key names, from one object to another.
       * Only copies property if it is actually defined
       * Does not recurse into non-scalar properties
       *
       * @param  {Object} to   Destination object
       * @param  {Object} from Source object
       * @param  {Array} list List of properties to copy
       * @return {Object}      Destination object
       * @static
       * @private
       */
      exports.shallowCopyFromList = function (to, from, list) {
        list = list || [];
        from = from || {};
        if (to !== null && to !== undefined) {
          for (var i = 0; i < list.length; i++) {
            var p = list[i];
            if (typeof from[p] != 'undefined') {
              to[p] = from[p];
            }
          }
        }
        return to;
      };

      /**
       * Simple in-process cache implementation. Does not implement limits of any
       * sort.
       *
       * @implements {Cache}
       * @static
       * @private
       */
      exports.cache = {
        _data: {},
        set: function (key, val) {
          this._data[key] = val;
        },
        get: function (key) {
          return this._data[key];
        },
        remove: function (key) {
          delete this._data[key];
        },
        reset: function () {
          this._data = {};
        },
      };

      /**
       * Transforms hyphen case variable into camel case.
       *
       * @param {String} string Hyphen case string
       * @return {String} Camel case string
       * @static
       * @private
       */
      exports.hyphenToCamel = function (str) {
        return str.replace(/-[a-z]/g, function (match) {
          return match[1].toUpperCase();
        });
      };

      /**
       * Returns a null-prototype object in runtimes that support it
       *
       * @return {Object} Object, prototype will be set to null where possible
       * @static
       * @private
       */
      exports.createNullProtoObjWherePossible = (function () {
        if (typeof Object.create == 'function') {
          return function () {
            return Object.create(null);
          };
        }
        if (!({ __proto__: null } instanceof Object)) {
          return function () {
            return { __proto__: null };
          };
        }
        // Not possible, just pass through
        return function () {
          return {};
        };
      })();

      /***/
    },

    /***/ 1205: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      var once = __nccwpck_require__(1223);

      var noop = function () {};

      var isRequest = function (stream) {
        return stream.setHeader && typeof stream.abort === 'function';
      };

      var isChildProcess = function (stream) {
        return (
          stream.stdio &&
          Array.isArray(stream.stdio) &&
          stream.stdio.length === 3
        );
      };

      var eos = function (stream, opts, callback) {
        if (typeof opts === 'function') return eos(stream, null, opts);
        if (!opts) opts = {};

        callback = once(callback || noop);

        var ws = stream._writableState;
        var rs = stream._readableState;
        var readable =
          opts.readable || (opts.readable !== false && stream.readable);
        var writable =
          opts.writable || (opts.writable !== false && stream.writable);
        var cancelled = false;

        var onlegacyfinish = function () {
          if (!stream.writable) onfinish();
        };

        var onfinish = function () {
          writable = false;
          if (!readable) callback.call(stream);
        };

        var onend = function () {
          readable = false;
          if (!writable) callback.call(stream);
        };

        var onexit = function (exitCode) {
          callback.call(
            stream,
            exitCode ? new Error('exited with error code: ' + exitCode) : null
          );
        };

        var onerror = function (err) {
          callback.call(stream, err);
        };

        var onclose = function () {
          process.nextTick(onclosenexttick);
        };

        var onclosenexttick = function () {
          if (cancelled) return;
          if (readable && !(rs && rs.ended && !rs.destroyed))
            return callback.call(stream, new Error('premature close'));
          if (writable && !(ws && ws.ended && !ws.destroyed))
            return callback.call(stream, new Error('premature close'));
        };

        var onrequest = function () {
          stream.req.on('finish', onfinish);
        };

        if (isRequest(stream)) {
          stream.on('complete', onfinish);
          stream.on('abort', onclose);
          if (stream.req) onrequest();
          else stream.on('request', onrequest);
        } else if (writable && !ws) {
          // legacy streams
          stream.on('end', onlegacyfinish);
          stream.on('close', onlegacyfinish);
        }

        if (isChildProcess(stream)) stream.on('exit', onexit);

        stream.on('end', onend);
        stream.on('finish', onfinish);
        if (opts.error !== false) stream.on('error', onerror);
        stream.on('close', onclose);

        return function () {
          cancelled = true;
          stream.removeListener('complete', onfinish);
          stream.removeListener('abort', onclose);
          stream.removeListener('request', onrequest);
          if (stream.req) stream.req.removeListener('finish', onfinish);
          stream.removeListener('end', onlegacyfinish);
          stream.removeListener('close', onlegacyfinish);
          stream.removeListener('finish', onfinish);
          stream.removeListener('exit', onexit);
          stream.removeListener('end', onend);
          stream.removeListener('error', onerror);
          stream.removeListener('close', onclose);
        };
      };

      module.exports = eos;

      /***/
    },

    /***/ 8171: /***/ (module) => {
      'use strict';

      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;
      var defineProperty = Object.defineProperty;
      var gOPD = Object.getOwnPropertyDescriptor;

      var isArray = function isArray(arr) {
        if (typeof Array.isArray === 'function') {
          return Array.isArray(arr);
        }

        return toStr.call(arr) === '[object Array]';
      };

      var isPlainObject = function isPlainObject(obj) {
        if (!obj || toStr.call(obj) !== '[object Object]') {
          return false;
        }

        var hasOwnConstructor = hasOwn.call(obj, 'constructor');
        var hasIsPrototypeOf =
          obj.constructor &&
          obj.constructor.prototype &&
          hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
        // Not own constructor property must be Object
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {
          /**/
        }

        return typeof key === 'undefined' || hasOwn.call(obj, key);
      };

      // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
      var setProperty = function setProperty(target, options) {
        if (defineProperty && options.name === '__proto__') {
          defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true,
          });
        } else {
          target[options.name] = options.newValue;
        }
      };

      // Return undefined instead of __proto__ if '__proto__' is not an own property
      var getProperty = function getProperty(obj, name) {
        if (name === '__proto__') {
          if (!hasOwn.call(obj, name)) {
            return void 0;
          } else if (gOPD) {
            // In early versions of node, obj['__proto__'] is buggy when obj has
            // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
            return gOPD(obj, name).value;
          }
        }

        return obj[name];
      };

      module.exports = function extend() {
        var options, name, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
          deep = target;
          target = arguments[1] || {};
          // skip the boolean and the target
          i = 2;
        }
        if (
          target == null ||
          (typeof target !== 'object' && typeof target !== 'function')
        ) {
          target = {};
        }

        for (; i < length; ++i) {
          options = arguments[i];
          // Only deal with non-null/undefined values
          if (options != null) {
            // Extend the base object
            for (name in options) {
              src = getProperty(target, name);
              copy = getProperty(options, name);

              // Prevent never-ending loop
              if (target !== copy) {
                // Recurse if we're merging plain objects or arrays
                if (
                  deep &&
                  copy &&
                  (isPlainObject(copy) || (copyIsArray = isArray(copy)))
                ) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject(src) ? src : {};
                  }

                  // Never move original objects, clone them
                  setProperty(target, {
                    name: name,
                    newValue: extend(deep, clone, copy),
                  });

                  // Don't bring in undefined values
                } else if (typeof copy !== 'undefined') {
                  setProperty(target, { name: name, newValue: copy });
                }
              }
            }
          }
        }

        // Return the modified object
        return target;
      };

      /***/
    },

    /***/ 1585: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const { PassThrough: PassThroughStream } = __nccwpck_require__(2781);

      module.exports = (options) => {
        options = { ...options };

        const { array } = options;
        let { encoding } = options;
        const isBuffer = encoding === 'buffer';
        let objectMode = false;

        if (array) {
          objectMode = !(encoding || isBuffer);
        } else {
          encoding = encoding || 'utf8';
        }

        if (isBuffer) {
          encoding = null;
        }

        const stream = new PassThroughStream({ objectMode });

        if (encoding) {
          stream.setEncoding(encoding);
        }

        let length = 0;
        const chunks = [];

        stream.on('data', (chunk) => {
          chunks.push(chunk);

          if (objectMode) {
            length = chunks.length;
          } else {
            length += chunk.length;
          }
        });

        stream.getBufferedValue = () => {
          if (array) {
            return chunks;
          }

          return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
        };

        stream.getBufferedLength = () => length;

        return stream;
      };

      /***/
    },

    /***/ 1766: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const { constants: BufferConstants } = __nccwpck_require__(4300);
      const pump = __nccwpck_require__(8341);
      const bufferStream = __nccwpck_require__(1585);

      class MaxBufferError extends Error {
        constructor() {
          super('maxBuffer exceeded');
          this.name = 'MaxBufferError';
        }
      }

      async function getStream(inputStream, options) {
        if (!inputStream) {
          return Promise.reject(new Error('Expected a stream'));
        }

        options = {
          maxBuffer: Infinity,
          ...options,
        };

        const { maxBuffer } = options;

        let stream;
        await new Promise((resolve, reject) => {
          const rejectPromise = (error) => {
            // Don't retrieve an oversized buffer.
            if (
              error &&
              stream.getBufferedLength() <= BufferConstants.MAX_LENGTH
            ) {
              error.bufferedData = stream.getBufferedValue();
            }

            reject(error);
          };

          stream = pump(inputStream, bufferStream(options), (error) => {
            if (error) {
              rejectPromise(error);
              return;
            }

            resolve();
          });

          stream.on('data', () => {
            if (stream.getBufferedLength() > maxBuffer) {
              rejectPromise(new MaxBufferError());
            }
          });
        });

        return stream.getBufferedValue();
      }

      module.exports = getStream;
      // TODO: Remove this for the next major release
      module.exports['default'] = getStream;
      module.exports.buffer = (stream, options) =>
        getStream(stream, { ...options, encoding: 'buffer' });
      module.exports.array = (stream, options) =>
        getStream(stream, { ...options, array: true });
      module.exports.MaxBufferError = MaxBufferError;

      /***/
    },

    /***/ 7094: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __importDefault =
        (this && this.__importDefault) ||
        function (mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.createClient = void 0;
      const got_1 = __importDefault(__nccwpck_require__(3061));
      function wait(time) {
        return new Promise((resolve) => {
          const tid = setTimeout(() => {
            resolve();
            clearTimeout(tid);
          }, time);
        });
      }
      function rand(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const DEFAULT_OPTIONS = {
        prefixUrl: 'https://api.github.com',
        responseType: 'json',
        hooks: {
          beforeRequest: [
            async () => {
              // reduce rate limits
              await wait(rand(10, 25));
            },
          ],
        },
      };
      const client = got_1.default.extend(DEFAULT_OPTIONS);
      const createClient = (opts) => {
        return client.extend(opts || {});
      };
      exports.createClient = createClient;

      /***/
    },

    /***/ 6636: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __importDefault =
        (this && this.__importDefault) ||
        function (mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.setHttpClient = exports.getNextPage = void 0;
      const parse_link_header_1 = __importDefault(__nccwpck_require__(1940));
      const client_1 = __nccwpck_require__(7094);
      function getNextPage({ next, last }) {
        if (!next || !last) return null;
        if (!next?.page || !last?.page) return null;
        if (next.page === last.page) return null;
        return next.page;
      }
      exports.getNextPage = getNextPage;
      async function* paginateStars(url, opts) {
        let nextPage = '1';
        while (nextPage) {
          try {
            const { headers, body } = await opts.http.get(url, {
              searchParams: {
                per_page: 100,
                page: nextPage,
              },
            });
            for (const record of body) {
              yield record;
            }
            nextPage = getNextPage(
              (0, parse_link_header_1.default)(headers.link)
            );
            if (!opts.accessToken) {
              console.warn(
                'No github access token provided, limiting call to first page to avoid rate limit ban'
              );
              break;
            }
          } catch (e) {
            console.error('[http-error]:', e?.response?.body || e);
            break;
          }
        }
      }
      async function apiGetStar(opts) {
        const data = [];
        const API_STARRED_URL = `users/${opts.username}/starred`;
        for await (const star of paginateStars(API_STARRED_URL, opts)) {
          data.push(star);
        }
        if (!opts.compactByLanguage) {
          if (typeof opts.transform !== 'function') return data;
          return data.map((star) => opts.transform(star));
        }
        const sorted = data.reduce((acc, val) => {
          const language = val.language || 'miscellaneous';
          const parsed =
            typeof opts.transform !== 'function' ? val : opts.transform(val);
          if (!acc[language]) {
            acc[language] = [parsed];
          } else {
            acc[language].push(parsed);
          }
          return acc;
        }, {});
        return sorted;
      }
      function transform(star) {
        return {
          id: star.id,
          node_id: star.node_id,
          name: star.name,
          full_name: star.full_name,
          owner: {
            login: star?.owner?.login,
            id: star?.owner?.id,
            avatar_url: star?.owner?.avatar_url,
            url: star?.owner?.url,
            html_url: star?.owner?.html_url,
          },
          html_url: star.html_url,
          description: star.description,
          url: star.url,
          languages_url: star.languages_url,
          created_at: star.created_at,
          updated_at: star.updated_at,
          git_url: star.git_url,
          ssh_url: star.ssh_url,
          clone_url: star.clone_url,
          homepage: star.homepage,
          stargazers_count: star.stargazers_count,
          watchers_count: star.watchers_count,
          language: star.language,
          topics: star.topics,
        };
      }
      const DEFAULT_OPTIONS = {
        accessToken: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME,
        compactByLanguage: false,
        transform,
      };
      function setHttpClient(opts) {
        // http is provided in opts in test cases env
        if (opts.http) return opts.http;
        const headers = {};
        if (opts.accessToken) {
          headers.Authorization = `token ${opts.accessToken}`;
        }
        return (0, client_1.createClient)({ headers });
      }
      exports.setHttpClient = setHttpClient;
      async function main(options) {
        const http = setHttpClient(options);
        const opts = Object.assign({}, DEFAULT_OPTIONS, options, {
          http,
        });
        if (!options.username) {
          try {
            const { login } = await http.get('user').json();
            options.username = login;
          } catch {
            throw new Error('[options.username] is not set');
          }
        }
        return apiGetStar(opts);
      }
      exports['default'] = main;

      /***/
    },

    /***/ 237: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      const regex = __nccwpck_require__(7205);

      module.exports = BananaSlug;

      const own = Object.hasOwnProperty;

      function BananaSlug() {
        const self = this;

        if (!(self instanceof BananaSlug)) return new BananaSlug();

        self.reset();
      }

      /**
       * Generate a unique slug.
       * @param  {string} value String of text to slugify
       * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
       * @return {string}       A unique slug string
       */
      BananaSlug.prototype.slug = function (value, maintainCase) {
        const self = this;
        let slug = slugger(value, maintainCase === true);
        const originalSlug = slug;

        while (own.call(self.occurrences, slug)) {
          self.occurrences[originalSlug]++;
          slug = originalSlug + '-' + self.occurrences[originalSlug];
        }

        self.occurrences[slug] = 0;

        return slug;
      };

      /**
       * Reset - Forget all previous slugs
       * @return void
       */
      BananaSlug.prototype.reset = function () {
        this.occurrences = Object.create(null);
      };

      function slugger(string, maintainCase) {
        if (typeof string !== 'string') return '';
        if (!maintainCase) string = string.toLowerCase();
        return string.replace(regex, '').replace(/ /g, '-');
      }

      BananaSlug.slug = slugger;

      /***/
    },

    /***/ 7205: /***/ (module) => {
      // This module is generated by `script/`.
      /* eslint-disable no-control-regex, no-misleading-character-class, no-useless-escape */
      module.exports =
        /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08BE-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D04\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31BB-\u31EF\u3200-\u33FF\u4DB6-\u4DFF\u9FF0-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7C7-\uA7F6\uA828-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB68-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD47-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD-\uDDCF\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC60-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD00-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D-\uD83F\uD87B-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE4-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;

      /***/
    },

    /***/ 6457: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const types_1 = __nccwpck_require__(4597);
      function createRejection(error, ...beforeErrorGroups) {
        const promise = (async () => {
          if (error instanceof types_1.RequestError) {
            try {
              for (const hooks of beforeErrorGroups) {
                if (hooks) {
                  for (const hook of hooks) {
                    // eslint-disable-next-line no-await-in-loop
                    error = await hook(error);
                  }
                }
              }
            } catch (error_) {
              error = error_;
            }
          }
          throw error;
        })();
        const returnPromise = () => promise;
        promise.json = returnPromise;
        promise.text = returnPromise;
        promise.buffer = returnPromise;
        promise.on = returnPromise;
        return promise;
      }
      exports['default'] = createRejection;

      /***/
    },

    /***/ 6056: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __exportStar =
        (this && this.__exportStar) ||
        function (m, exports) {
          for (var p in m)
            if (
              p !== 'default' &&
              !Object.prototype.hasOwnProperty.call(exports, p)
            )
              __createBinding(exports, m, p);
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      const events_1 = __nccwpck_require__(2361);
      const is_1 = __nccwpck_require__(7678);
      const PCancelable = __nccwpck_require__(9072);
      const types_1 = __nccwpck_require__(4597);
      const parse_body_1 = __nccwpck_require__(8220);
      const core_1 = __nccwpck_require__(94);
      const proxy_events_1 = __nccwpck_require__(3021);
      const get_buffer_1 = __nccwpck_require__(4500);
      const is_response_ok_1 = __nccwpck_require__(9298);
      const proxiedRequestEvents = [
        'request',
        'response',
        'redirect',
        'uploadProgress',
        'downloadProgress',
      ];
      function asPromise(normalizedOptions) {
        let globalRequest;
        let globalResponse;
        const emitter = new events_1.EventEmitter();
        const promise = new PCancelable((resolve, reject, onCancel) => {
          const makeRequest = (retryCount) => {
            const request = new core_1.default(undefined, normalizedOptions);
            request.retryCount = retryCount;
            request._noPipe = true;
            onCancel(() => request.destroy());
            onCancel.shouldReject = false;
            onCancel(() => reject(new types_1.CancelError(request)));
            globalRequest = request;
            request.once('response', async (response) => {
              var _a;
              response.retryCount = retryCount;
              if (response.request.aborted) {
                // Canceled while downloading - will throw a `CancelError` or `TimeoutError` error
                return;
              }
              // Download body
              let rawBody;
              try {
                rawBody = await get_buffer_1.default(request);
                response.rawBody = rawBody;
              } catch (_b) {
                // The same error is caught below.
                // See request.once('error')
                return;
              }
              if (request._isAboutToError) {
                return;
              }
              // Parse body
              const contentEncoding = (
                (_a = response.headers['content-encoding']) !== null &&
                _a !== void 0
                  ? _a
                  : ''
              ).toLowerCase();
              const isCompressed = ['gzip', 'deflate', 'br'].includes(
                contentEncoding
              );
              const { options } = request;
              if (isCompressed && !options.decompress) {
                response.body = rawBody;
              } else {
                try {
                  response.body = parse_body_1.default(
                    response,
                    options.responseType,
                    options.parseJson,
                    options.encoding
                  );
                } catch (error) {
                  // Fallback to `utf8`
                  response.body = rawBody.toString();
                  if (is_response_ok_1.isResponseOk(response)) {
                    request._beforeError(error);
                    return;
                  }
                }
              }
              try {
                for (const [
                  index,
                  hook,
                ] of options.hooks.afterResponse.entries()) {
                  // @ts-expect-error TS doesn't notice that CancelableRequest is a Promise
                  // eslint-disable-next-line no-await-in-loop
                  response = await hook(response, async (updatedOptions) => {
                    const typedOptions = core_1.default.normalizeArguments(
                      undefined,
                      {
                        ...updatedOptions,
                        retry: {
                          calculateDelay: () => 0,
                        },
                        throwHttpErrors: false,
                        resolveBodyOnly: false,
                      },
                      options
                    );
                    // Remove any further hooks for that request, because we'll call them anyway.
                    // The loop continues. We don't want duplicates (asPromise recursion).
                    typedOptions.hooks.afterResponse =
                      typedOptions.hooks.afterResponse.slice(0, index);
                    for (const hook of typedOptions.hooks.beforeRetry) {
                      // eslint-disable-next-line no-await-in-loop
                      await hook(typedOptions);
                    }
                    const promise = asPromise(typedOptions);
                    onCancel(() => {
                      promise.catch(() => {});
                      promise.cancel();
                    });
                    return promise;
                  });
                }
              } catch (error) {
                request._beforeError(
                  new types_1.RequestError(error.message, error, request)
                );
                return;
              }
              if (!is_response_ok_1.isResponseOk(response)) {
                request._beforeError(new types_1.HTTPError(response));
                return;
              }
              globalResponse = response;
              resolve(
                request.options.resolveBodyOnly ? response.body : response
              );
            });
            const onError = (error) => {
              if (promise.isCanceled) {
                return;
              }
              const { options } = request;
              if (
                error instanceof types_1.HTTPError &&
                !options.throwHttpErrors
              ) {
                const { response } = error;
                resolve(
                  request.options.resolveBodyOnly ? response.body : response
                );
                return;
              }
              reject(error);
            };
            request.once('error', onError);
            const previousBody = request.options.body;
            request.once('retry', (newRetryCount, error) => {
              var _a, _b;
              if (
                previousBody ===
                  ((_a = error.request) === null || _a === void 0
                    ? void 0
                    : _a.options.body) &&
                is_1.default.nodeStream(
                  (_b = error.request) === null || _b === void 0
                    ? void 0
                    : _b.options.body
                )
              ) {
                onError(error);
                return;
              }
              makeRequest(newRetryCount);
            });
            proxy_events_1.default(request, emitter, proxiedRequestEvents);
          };
          makeRequest(0);
        });
        promise.on = (event, fn) => {
          emitter.on(event, fn);
          return promise;
        };
        const shortcut = (responseType) => {
          const newPromise = (async () => {
            // Wait until downloading has ended
            await promise;
            const { options } = globalResponse.request;
            return parse_body_1.default(
              globalResponse,
              responseType,
              options.parseJson,
              options.encoding
            );
          })();
          Object.defineProperties(
            newPromise,
            Object.getOwnPropertyDescriptors(promise)
          );
          return newPromise;
        };
        promise.json = () => {
          const { headers } = globalRequest.options;
          if (!globalRequest.writableFinished && headers.accept === undefined) {
            headers.accept = 'application/json';
          }
          return shortcut('json');
        };
        promise.buffer = () => shortcut('buffer');
        promise.text = () => shortcut('text');
        return promise;
      }
      exports['default'] = asPromise;
      __exportStar(__nccwpck_require__(4597), exports);

      /***/
    },

    /***/ 1048: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const is_1 = __nccwpck_require__(7678);
      const normalizeArguments = (options, defaults) => {
        if (is_1.default.null_(options.encoding)) {
          throw new TypeError(
            'To get a Buffer, set `options.responseType` to `buffer` instead'
          );
        }
        is_1.assert.any(
          [is_1.default.string, is_1.default.undefined],
          options.encoding
        );
        is_1.assert.any(
          [is_1.default.boolean, is_1.default.undefined],
          options.resolveBodyOnly
        );
        is_1.assert.any(
          [is_1.default.boolean, is_1.default.undefined],
          options.methodRewriting
        );
        is_1.assert.any(
          [is_1.default.boolean, is_1.default.undefined],
          options.isStream
        );
        is_1.assert.any(
          [is_1.default.string, is_1.default.undefined],
          options.responseType
        );
        // `options.responseType`
        if (options.responseType === undefined) {
          options.responseType = 'text';
        }
        // `options.retry`
        const { retry } = options;
        if (defaults) {
          options.retry = { ...defaults.retry };
        } else {
          options.retry = {
            calculateDelay: (retryObject) => retryObject.computedValue,
            limit: 0,
            methods: [],
            statusCodes: [],
            errorCodes: [],
            maxRetryAfter: undefined,
          };
        }
        if (is_1.default.object(retry)) {
          options.retry = {
            ...options.retry,
            ...retry,
          };
          options.retry.methods = [
            ...new Set(
              options.retry.methods.map((method) => method.toUpperCase())
            ),
          ];
          options.retry.statusCodes = [...new Set(options.retry.statusCodes)];
          options.retry.errorCodes = [...new Set(options.retry.errorCodes)];
        } else if (is_1.default.number(retry)) {
          options.retry.limit = retry;
        }
        if (is_1.default.undefined(options.retry.maxRetryAfter)) {
          options.retry.maxRetryAfter = Math.min(
            // TypeScript is not smart enough to handle `.filter(x => is.number(x))`.
            // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
            ...[options.timeout.request, options.timeout.connect].filter(
              is_1.default.number
            )
          );
        }
        // `options.pagination`
        if (is_1.default.object(options.pagination)) {
          if (defaults) {
            options.pagination = {
              ...defaults.pagination,
              ...options.pagination,
            };
          }
          const { pagination } = options;
          if (!is_1.default.function_(pagination.transform)) {
            throw new Error(
              '`options.pagination.transform` must be implemented'
            );
          }
          if (!is_1.default.function_(pagination.shouldContinue)) {
            throw new Error(
              '`options.pagination.shouldContinue` must be implemented'
            );
          }
          if (!is_1.default.function_(pagination.filter)) {
            throw new TypeError(
              '`options.pagination.filter` must be implemented'
            );
          }
          if (!is_1.default.function_(pagination.paginate)) {
            throw new Error(
              '`options.pagination.paginate` must be implemented'
            );
          }
        }
        // JSON mode
        if (
          options.responseType === 'json' &&
          options.headers.accept === undefined
        ) {
          options.headers.accept = 'application/json';
        }
        return options;
      };
      exports['default'] = normalizeArguments;

      /***/
    },

    /***/ 8220: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const types_1 = __nccwpck_require__(4597);
      const parseBody = (response, responseType, parseJson, encoding) => {
        const { rawBody } = response;
        try {
          if (responseType === 'text') {
            return rawBody.toString(encoding);
          }
          if (responseType === 'json') {
            return rawBody.length === 0 ? '' : parseJson(rawBody.toString());
          }
          if (responseType === 'buffer') {
            return rawBody;
          }
          throw new types_1.ParseError(
            {
              message: `Unknown body type '${responseType}'`,
              name: 'Error',
            },
            response
          );
        } catch (error) {
          throw new types_1.ParseError(error, response);
        }
      };
      exports['default'] = parseBody;

      /***/
    },

    /***/ 4597: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __exportStar =
        (this && this.__exportStar) ||
        function (m, exports) {
          for (var p in m)
            if (
              p !== 'default' &&
              !Object.prototype.hasOwnProperty.call(exports, p)
            )
              __createBinding(exports, m, p);
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.CancelError = exports.ParseError = void 0;
      const core_1 = __nccwpck_require__(94);
      /**
An error to be thrown when server response code is 2xx, and parsing body fails.
Includes a `response` property.
*/
      class ParseError extends core_1.RequestError {
        constructor(error, response) {
          const { options } = response.request;
          super(
            `${error.message} in "${options.url.toString()}"`,
            error,
            response.request
          );
          this.name = 'ParseError';
          this.code =
            this.code === 'ERR_GOT_REQUEST_ERROR'
              ? 'ERR_BODY_PARSE_FAILURE'
              : this.code;
        }
      }
      exports.ParseError = ParseError;
      /**
An error to be thrown when the request is aborted with `.cancel()`.
*/
      class CancelError extends core_1.RequestError {
        constructor(request) {
          super('Promise was canceled', {}, request);
          this.name = 'CancelError';
          this.code = 'ERR_CANCELED';
        }
        get isCanceled() {
          return true;
        }
      }
      exports.CancelError = CancelError;
      __exportStar(__nccwpck_require__(94), exports);

      /***/
    },

    /***/ 3462: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.retryAfterStatusCodes = void 0;
      exports.retryAfterStatusCodes = new Set([413, 429, 503]);
      const calculateRetryDelay = ({
        attemptCount,
        retryOptions,
        error,
        retryAfter,
      }) => {
        if (attemptCount > retryOptions.limit) {
          return 0;
        }
        const hasMethod = retryOptions.methods.includes(error.options.method);
        const hasErrorCode = retryOptions.errorCodes.includes(error.code);
        const hasStatusCode =
          error.response &&
          retryOptions.statusCodes.includes(error.response.statusCode);
        if (!hasMethod || (!hasErrorCode && !hasStatusCode)) {
          return 0;
        }
        if (error.response) {
          if (retryAfter) {
            if (
              retryOptions.maxRetryAfter === undefined ||
              retryAfter > retryOptions.maxRetryAfter
            ) {
              return 0;
            }
            return retryAfter;
          }
          if (error.response.statusCode === 413) {
            return 0;
          }
        }
        const noise = Math.random() * 100;
        return 2 ** (attemptCount - 1) * 1000 + noise;
      };
      exports['default'] = calculateRetryDelay;

      /***/
    },

    /***/ 94: /***/ (__unused_webpack_module, exports, __nccwpck_require__) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.UnsupportedProtocolError =
        exports.ReadError =
        exports.TimeoutError =
        exports.UploadError =
        exports.CacheError =
        exports.HTTPError =
        exports.MaxRedirectsError =
        exports.RequestError =
        exports.setNonEnumerableProperties =
        exports.knownHookEvents =
        exports.withoutBody =
        exports.kIsNormalizedAlready =
          void 0;
      const util_1 = __nccwpck_require__(3837);
      const stream_1 = __nccwpck_require__(2781);
      const fs_1 = __nccwpck_require__(7147);
      const url_1 = __nccwpck_require__(7310);
      const http = __nccwpck_require__(3685);
      const http_1 = __nccwpck_require__(3685);
      const https = __nccwpck_require__(5687);
      const http_timer_1 = __nccwpck_require__(8097);
      const cacheable_lookup_1 = __nccwpck_require__(2286);
      const CacheableRequest = __nccwpck_require__(8116);
      const decompressResponse = __nccwpck_require__(2391);
      // @ts-expect-error Missing types
      const http2wrapper = __nccwpck_require__(4645);
      const lowercaseKeys = __nccwpck_require__(9662);
      const is_1 = __nccwpck_require__(7678);
      const get_body_size_1 = __nccwpck_require__(4564);
      const is_form_data_1 = __nccwpck_require__(40);
      const proxy_events_1 = __nccwpck_require__(3021);
      const timed_out_1 = __nccwpck_require__(2454);
      const url_to_options_1 = __nccwpck_require__(8026);
      const options_to_url_1 = __nccwpck_require__(9219);
      const weakable_map_1 = __nccwpck_require__(7288);
      const get_buffer_1 = __nccwpck_require__(4500);
      const dns_ip_version_1 = __nccwpck_require__(4993);
      const is_response_ok_1 = __nccwpck_require__(9298);
      const deprecation_warning_1 = __nccwpck_require__(397);
      const normalize_arguments_1 = __nccwpck_require__(1048);
      const calculate_retry_delay_1 = __nccwpck_require__(3462);
      let globalDnsCache;
      const kRequest = Symbol('request');
      const kResponse = Symbol('response');
      const kResponseSize = Symbol('responseSize');
      const kDownloadedSize = Symbol('downloadedSize');
      const kBodySize = Symbol('bodySize');
      const kUploadedSize = Symbol('uploadedSize');
      const kServerResponsesPiped = Symbol('serverResponsesPiped');
      const kUnproxyEvents = Symbol('unproxyEvents');
      const kIsFromCache = Symbol('isFromCache');
      const kCancelTimeouts = Symbol('cancelTimeouts');
      const kStartedReading = Symbol('startedReading');
      const kStopReading = Symbol('stopReading');
      const kTriggerRead = Symbol('triggerRead');
      const kBody = Symbol('body');
      const kJobs = Symbol('jobs');
      const kOriginalResponse = Symbol('originalResponse');
      const kRetryTimeout = Symbol('retryTimeout');
      exports.kIsNormalizedAlready = Symbol('isNormalizedAlready');
      const supportsBrotli = is_1.default.string(process.versions.brotli);
      exports.withoutBody = new Set(['GET', 'HEAD']);
      exports.knownHookEvents = [
        'init',
        'beforeRequest',
        'beforeRedirect',
        'beforeError',
        'beforeRetry',
        // Promise-Only
        'afterResponse',
      ];
      function validateSearchParameters(searchParameters) {
        // eslint-disable-next-line guard-for-in
        for (const key in searchParameters) {
          const value = searchParameters[key];
          if (
            !is_1.default.string(value) &&
            !is_1.default.number(value) &&
            !is_1.default.boolean(value) &&
            !is_1.default.null_(value) &&
            !is_1.default.undefined(value)
          ) {
            throw new TypeError(
              `The \`searchParams\` value '${String(
                value
              )}' must be a string, number, boolean or null`
            );
          }
        }
      }
      function isClientRequest(clientRequest) {
        return (
          is_1.default.object(clientRequest) && !('statusCode' in clientRequest)
        );
      }
      const cacheableStore = new weakable_map_1.default();
      const waitForOpenFile = async (file) =>
        new Promise((resolve, reject) => {
          const onError = (error) => {
            reject(error);
          };
          // Node.js 12 has incomplete types
          if (!file.pending) {
            resolve();
          }
          file.once('error', onError);
          file.once('ready', () => {
            file.off('error', onError);
            resolve();
          });
        });
      const redirectCodes = new Set([300, 301, 302, 303, 304, 307, 308]);
      const nonEnumerableProperties = ['context', 'body', 'json', 'form'];
      exports.setNonEnumerableProperties = (sources, to) => {
        // Non enumerable properties shall not be merged
        const properties = {};
        for (const source of sources) {
          if (!source) {
            continue;
          }
          for (const name of nonEnumerableProperties) {
            if (!(name in source)) {
              continue;
            }
            properties[name] = {
              writable: true,
              configurable: true,
              enumerable: false,
              // @ts-expect-error TS doesn't see the check above
              value: source[name],
            };
          }
        }
        Object.defineProperties(to, properties);
      };
      /**
An error to be thrown when a request fails.
Contains a `code` property with error class code, like `ECONNREFUSED`.
*/
      class RequestError extends Error {
        constructor(message, error, self) {
          var _a, _b;
          super(message);
          Error.captureStackTrace(this, this.constructor);
          this.name = 'RequestError';
          this.code =
            (_a = error.code) !== null && _a !== void 0
              ? _a
              : 'ERR_GOT_REQUEST_ERROR';
          if (self instanceof Request) {
            Object.defineProperty(this, 'request', {
              enumerable: false,
              value: self,
            });
            Object.defineProperty(this, 'response', {
              enumerable: false,
              value: self[kResponse],
            });
            Object.defineProperty(this, 'options', {
              // This fails because of TS 3.7.2 useDefineForClassFields
              // Ref: https://github.com/microsoft/TypeScript/issues/34972
              enumerable: false,
              value: self.options,
            });
          } else {
            Object.defineProperty(this, 'options', {
              // This fails because of TS 3.7.2 useDefineForClassFields
              // Ref: https://github.com/microsoft/TypeScript/issues/34972
              enumerable: false,
              value: self,
            });
          }
          this.timings =
            (_b = this.request) === null || _b === void 0 ? void 0 : _b.timings;
          // Recover the original stacktrace
          if (
            is_1.default.string(error.stack) &&
            is_1.default.string(this.stack)
          ) {
            const indexOfMessage =
              this.stack.indexOf(this.message) + this.message.length;
            const thisStackTrace = this.stack
              .slice(indexOfMessage)
              .split('\n')
              .reverse();
            const errorStackTrace = error.stack
              .slice(error.stack.indexOf(error.message) + error.message.length)
              .split('\n')
              .reverse();
            // Remove duplicated traces
            while (
              errorStackTrace.length !== 0 &&
              errorStackTrace[0] === thisStackTrace[0]
            ) {
              thisStackTrace.shift();
            }
            this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace
              .reverse()
              .join('\n')}${errorStackTrace.reverse().join('\n')}`;
          }
        }
      }
      exports.RequestError = RequestError;
      /**
An error to be thrown when the server redirects you more than ten times.
Includes a `response` property.
*/
      class MaxRedirectsError extends RequestError {
        constructor(request) {
          super(
            `Redirected ${request.options.maxRedirects} times. Aborting.`,
            {},
            request
          );
          this.name = 'MaxRedirectsError';
          this.code = 'ERR_TOO_MANY_REDIRECTS';
        }
      }
      exports.MaxRedirectsError = MaxRedirectsError;
      /**
An error to be thrown when the server response code is not 2xx nor 3xx if `options.followRedirect` is `true`, but always except for 304.
Includes a `response` property.
*/
      class HTTPError extends RequestError {
        constructor(response) {
          super(
            `Response code ${response.statusCode} (${response.statusMessage})`,
            {},
            response.request
          );
          this.name = 'HTTPError';
          this.code = 'ERR_NON_2XX_3XX_RESPONSE';
        }
      }
      exports.HTTPError = HTTPError;
      /**
An error to be thrown when a cache method fails.
For example, if the database goes down or there's a filesystem error.
*/
      class CacheError extends RequestError {
        constructor(error, request) {
          super(error.message, error, request);
          this.name = 'CacheError';
          this.code =
            this.code === 'ERR_GOT_REQUEST_ERROR'
              ? 'ERR_CACHE_ACCESS'
              : this.code;
        }
      }
      exports.CacheError = CacheError;
      /**
An error to be thrown when the request body is a stream and an error occurs while reading from that stream.
*/
      class UploadError extends RequestError {
        constructor(error, request) {
          super(error.message, error, request);
          this.name = 'UploadError';
          this.code =
            this.code === 'ERR_GOT_REQUEST_ERROR' ? 'ERR_UPLOAD' : this.code;
        }
      }
      exports.UploadError = UploadError;
      /**
An error to be thrown when the request is aborted due to a timeout.
Includes an `event` and `timings` property.
*/
      class TimeoutError extends RequestError {
        constructor(error, timings, request) {
          super(error.message, error, request);
          this.name = 'TimeoutError';
          this.event = error.event;
          this.timings = timings;
        }
      }
      exports.TimeoutError = TimeoutError;
      /**
An error to be thrown when reading from response stream fails.
*/
      class ReadError extends RequestError {
        constructor(error, request) {
          super(error.message, error, request);
          this.name = 'ReadError';
          this.code =
            this.code === 'ERR_GOT_REQUEST_ERROR'
              ? 'ERR_READING_RESPONSE_STREAM'
              : this.code;
        }
      }
      exports.ReadError = ReadError;
      /**
An error to be thrown when given an unsupported protocol.
*/
      class UnsupportedProtocolError extends RequestError {
        constructor(options) {
          super(`Unsupported protocol "${options.url.protocol}"`, {}, options);
          this.name = 'UnsupportedProtocolError';
          this.code = 'ERR_UNSUPPORTED_PROTOCOL';
        }
      }
      exports.UnsupportedProtocolError = UnsupportedProtocolError;
      const proxiedRequestEvents = [
        'socket',
        'connect',
        'continue',
        'information',
        'upgrade',
        'timeout',
      ];
      class Request extends stream_1.Duplex {
        constructor(url, options = {}, defaults) {
          super({
            // This must be false, to enable throwing after destroy
            // It is used for retry logic in Promise API
            autoDestroy: false,
            // It needs to be zero because we're just proxying the data to another stream
            highWaterMark: 0,
          });
          this[kDownloadedSize] = 0;
          this[kUploadedSize] = 0;
          this.requestInitialized = false;
          this[kServerResponsesPiped] = new Set();
          this.redirects = [];
          this[kStopReading] = false;
          this[kTriggerRead] = false;
          this[kJobs] = [];
          this.retryCount = 0;
          // TODO: Remove this when targeting Node.js >= 12
          this._progressCallbacks = [];
          const unlockWrite = () => this._unlockWrite();
          const lockWrite = () => this._lockWrite();
          this.on('pipe', (source) => {
            source.prependListener('data', unlockWrite);
            source.on('data', lockWrite);
            source.prependListener('end', unlockWrite);
            source.on('end', lockWrite);
          });
          this.on('unpipe', (source) => {
            source.off('data', unlockWrite);
            source.off('data', lockWrite);
            source.off('end', unlockWrite);
            source.off('end', lockWrite);
          });
          this.on('pipe', (source) => {
            if (source instanceof http_1.IncomingMessage) {
              this.options.headers = {
                ...source.headers,
                ...this.options.headers,
              };
            }
          });
          const { json, body, form } = options;
          if (json || body || form) {
            this._lockWrite();
          }
          if (exports.kIsNormalizedAlready in options) {
            this.options = options;
          } else {
            try {
              // @ts-expect-error Common TypeScript bug saying that `this.constructor` is not accessible
              this.options = this.constructor.normalizeArguments(
                url,
                options,
                defaults
              );
            } catch (error) {
              // TODO: Move this to `_destroy()`
              if (is_1.default.nodeStream(options.body)) {
                options.body.destroy();
              }
              this.destroy(error);
              return;
            }
          }
          (async () => {
            var _a;
            try {
              if (this.options.body instanceof fs_1.ReadStream) {
                await waitForOpenFile(this.options.body);
              }
              const { url: normalizedURL } = this.options;
              if (!normalizedURL) {
                throw new TypeError('Missing `url` property');
              }
              this.requestUrl = normalizedURL.toString();
              decodeURI(this.requestUrl);
              await this._finalizeBody();
              await this._makeRequest();
              if (this.destroyed) {
                (_a = this[kRequest]) === null || _a === void 0
                  ? void 0
                  : _a.destroy();
                return;
              }
              // Queued writes etc.
              for (const job of this[kJobs]) {
                job();
              }
              // Prevent memory leak
              this[kJobs].length = 0;
              this.requestInitialized = true;
            } catch (error) {
              if (error instanceof RequestError) {
                this._beforeError(error);
                return;
              }
              // This is a workaround for https://github.com/nodejs/node/issues/33335
              if (!this.destroyed) {
                this.destroy(error);
              }
            }
          })();
        }
        static normalizeArguments(url, options, defaults) {
          var _a, _b, _c, _d, _e;
          const rawOptions = options;
          if (is_1.default.object(url) && !is_1.default.urlInstance(url)) {
            options = { ...defaults, ...url, ...options };
          } else {
            if (url && options && options.url !== undefined) {
              throw new TypeError(
                'The `url` option is mutually exclusive with the `input` argument'
              );
            }
            options = { ...defaults, ...options };
            if (url !== undefined) {
              options.url = url;
            }
            if (is_1.default.urlInstance(options.url)) {
              options.url = new url_1.URL(options.url.toString());
            }
          }
          // TODO: Deprecate URL options in Got 12.
          // Support extend-specific options
          if (options.cache === false) {
            options.cache = undefined;
          }
          if (options.dnsCache === false) {
            options.dnsCache = undefined;
          }
          // Nice type assertions
          is_1.assert.any(
            [is_1.default.string, is_1.default.undefined],
            options.method
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.headers
          );
          is_1.assert.any(
            [
              is_1.default.string,
              is_1.default.urlInstance,
              is_1.default.undefined,
            ],
            options.prefixUrl
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.cookieJar
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.string, is_1.default.undefined],
            options.searchParams
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.string, is_1.default.undefined],
            options.cache
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.number, is_1.default.undefined],
            options.timeout
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.context
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.hooks
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.decompress
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.ignoreInvalidCookies
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.followRedirect
          );
          is_1.assert.any(
            [is_1.default.number, is_1.default.undefined],
            options.maxRedirects
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.throwHttpErrors
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.http2
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.allowGetBody
          );
          is_1.assert.any(
            [is_1.default.string, is_1.default.undefined],
            options.localAddress
          );
          is_1.assert.any(
            [dns_ip_version_1.isDnsLookupIpVersion, is_1.default.undefined],
            options.dnsLookupIpVersion
          );
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.https
          );
          is_1.assert.any(
            [is_1.default.boolean, is_1.default.undefined],
            options.rejectUnauthorized
          );
          if (options.https) {
            is_1.assert.any(
              [is_1.default.boolean, is_1.default.undefined],
              options.https.rejectUnauthorized
            );
            is_1.assert.any(
              [is_1.default.function_, is_1.default.undefined],
              options.https.checkServerIdentity
            );
            is_1.assert.any(
              [
                is_1.default.string,
                is_1.default.object,
                is_1.default.array,
                is_1.default.undefined,
              ],
              options.https.certificateAuthority
            );
            is_1.assert.any(
              [
                is_1.default.string,
                is_1.default.object,
                is_1.default.array,
                is_1.default.undefined,
              ],
              options.https.key
            );
            is_1.assert.any(
              [
                is_1.default.string,
                is_1.default.object,
                is_1.default.array,
                is_1.default.undefined,
              ],
              options.https.certificate
            );
            is_1.assert.any(
              [is_1.default.string, is_1.default.undefined],
              options.https.passphrase
            );
            is_1.assert.any(
              [
                is_1.default.string,
                is_1.default.buffer,
                is_1.default.array,
                is_1.default.undefined,
              ],
              options.https.pfx
            );
          }
          is_1.assert.any(
            [is_1.default.object, is_1.default.undefined],
            options.cacheOptions
          );
          // `options.method`
          if (is_1.default.string(options.method)) {
            options.method = options.method.toUpperCase();
          } else {
            options.method = 'GET';
          }
          // `options.headers`
          if (
            options.headers ===
            (defaults === null || defaults === void 0
              ? void 0
              : defaults.headers)
          ) {
            options.headers = { ...options.headers };
          } else {
            options.headers = lowercaseKeys({
              ...(defaults === null || defaults === void 0
                ? void 0
                : defaults.headers),
              ...options.headers,
            });
          }
          // Disallow legacy `url.Url`
          if ('slashes' in options) {
            throw new TypeError(
              'The legacy `url.Url` has been deprecated. Use `URL` instead.'
            );
          }
          // `options.auth`
          if ('auth' in options) {
            throw new TypeError(
              'Parameter `auth` is deprecated. Use `username` / `password` instead.'
            );
          }
          // `options.searchParams`
          if ('searchParams' in options) {
            if (
              options.searchParams &&
              options.searchParams !==
                (defaults === null || defaults === void 0
                  ? void 0
                  : defaults.searchParams)
            ) {
              let searchParameters;
              if (
                is_1.default.string(options.searchParams) ||
                options.searchParams instanceof url_1.URLSearchParams
              ) {
                searchParameters = new url_1.URLSearchParams(
                  options.searchParams
                );
              } else {
                validateSearchParameters(options.searchParams);
                searchParameters = new url_1.URLSearchParams();
                // eslint-disable-next-line guard-for-in
                for (const key in options.searchParams) {
                  const value = options.searchParams[key];
                  if (value === null) {
                    searchParameters.append(key, '');
                  } else if (value !== undefined) {
                    searchParameters.append(key, value);
                  }
                }
              }
              // `normalizeArguments()` is also used to merge options
              (_a =
                defaults === null || defaults === void 0
                  ? void 0
                  : defaults.searchParams) === null || _a === void 0
                ? void 0
                : _a.forEach((value, key) => {
                    // Only use default if one isn't already defined
                    if (!searchParameters.has(key)) {
                      searchParameters.append(key, value);
                    }
                  });
              options.searchParams = searchParameters;
            }
          }
          // `options.username` & `options.password`
          options.username =
            (_b = options.username) !== null && _b !== void 0 ? _b : '';
          options.password =
            (_c = options.password) !== null && _c !== void 0 ? _c : '';
          // `options.prefixUrl` & `options.url`
          if (is_1.default.undefined(options.prefixUrl)) {
            options.prefixUrl =
              (_d =
                defaults === null || defaults === void 0
                  ? void 0
                  : defaults.prefixUrl) !== null && _d !== void 0
                ? _d
                : '';
          } else {
            options.prefixUrl = options.prefixUrl.toString();
            if (options.prefixUrl !== '' && !options.prefixUrl.endsWith('/')) {
              options.prefixUrl += '/';
            }
          }
          if (is_1.default.string(options.url)) {
            if (options.url.startsWith('/')) {
              throw new Error(
                '`input` must not start with a slash when using `prefixUrl`'
              );
            }
            options.url = options_to_url_1.default(
              options.prefixUrl + options.url,
              options
            );
          } else if (
            (is_1.default.undefined(options.url) && options.prefixUrl !== '') ||
            options.protocol
          ) {
            options.url = options_to_url_1.default(options.prefixUrl, options);
          }
          if (options.url) {
            if ('port' in options) {
              delete options.port;
            }
            // Make it possible to change `options.prefixUrl`
            let { prefixUrl } = options;
            Object.defineProperty(options, 'prefixUrl', {
              set: (value) => {
                const url = options.url;
                if (!url.href.startsWith(value)) {
                  throw new Error(
                    `Cannot change \`prefixUrl\` from ${prefixUrl} to ${value}: ${url.href}`
                  );
                }
                options.url = new url_1.URL(
                  value + url.href.slice(prefixUrl.length)
                );
                prefixUrl = value;
              },
              get: () => prefixUrl,
            });
            // Support UNIX sockets
            let { protocol } = options.url;
            if (protocol === 'unix:') {
              protocol = 'http:';
              options.url = new url_1.URL(
                `http://unix${options.url.pathname}${options.url.search}`
              );
            }
            // Set search params
            if (options.searchParams) {
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              options.url.search = options.searchParams.toString();
            }
            // Protocol check
            if (protocol !== 'http:' && protocol !== 'https:') {
              throw new UnsupportedProtocolError(options);
            }
            // Update `username`
            if (options.username === '') {
              options.username = options.url.username;
            } else {
              options.url.username = options.username;
            }
            // Update `password`
            if (options.password === '') {
              options.password = options.url.password;
            } else {
              options.url.password = options.password;
            }
          }
          // `options.cookieJar`
          const { cookieJar } = options;
          if (cookieJar) {
            let { setCookie, getCookieString } = cookieJar;
            is_1.assert.function_(setCookie);
            is_1.assert.function_(getCookieString);
            /* istanbul ignore next: Horrible `tough-cookie` v3 check */
            if (setCookie.length === 4 && getCookieString.length === 0) {
              setCookie = util_1.promisify(setCookie.bind(options.cookieJar));
              getCookieString = util_1.promisify(
                getCookieString.bind(options.cookieJar)
              );
              options.cookieJar = {
                setCookie,
                getCookieString: getCookieString,
              };
            }
          }
          // `options.cache`
          const { cache } = options;
          if (cache) {
            if (!cacheableStore.has(cache)) {
              cacheableStore.set(
                cache,
                new CacheableRequest((requestOptions, handler) => {
                  const result = requestOptions[kRequest](
                    requestOptions,
                    handler
                  );
                  // TODO: remove this when `cacheable-request` supports async request functions.
                  if (is_1.default.promise(result)) {
                    // @ts-expect-error
                    // We only need to implement the error handler in order to support HTTP2 caching.
                    // The result will be a promise anyway.
                    result.once = (event, handler) => {
                      if (event === 'error') {
                        result.catch(handler);
                      } else if (event === 'abort') {
                        // The empty catch is needed here in case when
                        // it rejects before it's `await`ed in `_makeRequest`.
                        (async () => {
                          try {
                            const request = await result;
                            request.once('abort', handler);
                          } catch (_a) {}
                        })();
                      } else {
                        /* istanbul ignore next: safety check */
                        throw new Error(
                          `Unknown HTTP2 promise event: ${event}`
                        );
                      }
                      return result;
                    };
                  }
                  return result;
                }, cache)
              );
            }
          }
          // `options.cacheOptions`
          options.cacheOptions = { ...options.cacheOptions };
          // `options.dnsCache`
          if (options.dnsCache === true) {
            if (!globalDnsCache) {
              globalDnsCache = new cacheable_lookup_1.default();
            }
            options.dnsCache = globalDnsCache;
          } else if (
            !is_1.default.undefined(options.dnsCache) &&
            !options.dnsCache.lookup
          ) {
            throw new TypeError(
              `Parameter \`dnsCache\` must be a CacheableLookup instance or a boolean, got ${is_1.default(
                options.dnsCache
              )}`
            );
          }
          // `options.timeout`
          if (is_1.default.number(options.timeout)) {
            options.timeout = { request: options.timeout };
          } else if (defaults && options.timeout !== defaults.timeout) {
            options.timeout = {
              ...defaults.timeout,
              ...options.timeout,
            };
          } else {
            options.timeout = { ...options.timeout };
          }
          // `options.context`
          if (!options.context) {
            options.context = {};
          }
          // `options.hooks`
          const areHooksDefault =
            options.hooks ===
            (defaults === null || defaults === void 0
              ? void 0
              : defaults.hooks);
          options.hooks = { ...options.hooks };
          for (const event of exports.knownHookEvents) {
            if (event in options.hooks) {
              if (is_1.default.array(options.hooks[event])) {
                // See https://github.com/microsoft/TypeScript/issues/31445#issuecomment-576929044
                options.hooks[event] = [...options.hooks[event]];
              } else {
                throw new TypeError(
                  `Parameter \`${event}\` must be an Array, got ${is_1.default(
                    options.hooks[event]
                  )}`
                );
              }
            } else {
              options.hooks[event] = [];
            }
          }
          if (defaults && !areHooksDefault) {
            for (const event of exports.knownHookEvents) {
              const defaultHooks = defaults.hooks[event];
              if (defaultHooks.length > 0) {
                // See https://github.com/microsoft/TypeScript/issues/31445#issuecomment-576929044
                options.hooks[event] = [
                  ...defaults.hooks[event],
                  ...options.hooks[event],
                ];
              }
            }
          }
          // DNS options
          if ('family' in options) {
            deprecation_warning_1.default(
              '"options.family" was never documented, please use "options.dnsLookupIpVersion"'
            );
          }
          // HTTPS options
          if (
            defaults === null || defaults === void 0 ? void 0 : defaults.https
          ) {
            options.https = { ...defaults.https, ...options.https };
          }
          if ('rejectUnauthorized' in options) {
            deprecation_warning_1.default(
              '"options.rejectUnauthorized" is now deprecated, please use "options.https.rejectUnauthorized"'
            );
          }
          if ('checkServerIdentity' in options) {
            deprecation_warning_1.default(
              '"options.checkServerIdentity" was never documented, please use "options.https.checkServerIdentity"'
            );
          }
          if ('ca' in options) {
            deprecation_warning_1.default(
              '"options.ca" was never documented, please use "options.https.certificateAuthority"'
            );
          }
          if ('key' in options) {
            deprecation_warning_1.default(
              '"options.key" was never documented, please use "options.https.key"'
            );
          }
          if ('cert' in options) {
            deprecation_warning_1.default(
              '"options.cert" was never documented, please use "options.https.certificate"'
            );
          }
          if ('passphrase' in options) {
            deprecation_warning_1.default(
              '"options.passphrase" was never documented, please use "options.https.passphrase"'
            );
          }
          if ('pfx' in options) {
            deprecation_warning_1.default(
              '"options.pfx" was never documented, please use "options.https.pfx"'
            );
          }
          // Other options
          if ('followRedirects' in options) {
            throw new TypeError(
              'The `followRedirects` option does not exist. Use `followRedirect` instead.'
            );
          }
          if (options.agent) {
            for (const key in options.agent) {
              if (key !== 'http' && key !== 'https' && key !== 'http2') {
                throw new TypeError(
                  `Expected the \`options.agent\` properties to be \`http\`, \`https\` or \`http2\`, got \`${key}\``
                );
              }
            }
          }
          options.maxRedirects =
            (_e = options.maxRedirects) !== null && _e !== void 0 ? _e : 0;
          // Set non-enumerable properties
          exports.setNonEnumerableProperties([defaults, rawOptions], options);
          return normalize_arguments_1.default(options, defaults);
        }
        _lockWrite() {
          const onLockedWrite = () => {
            throw new TypeError('The payload has been already provided');
          };
          this.write = onLockedWrite;
          this.end = onLockedWrite;
        }
        _unlockWrite() {
          this.write = super.write;
          this.end = super.end;
        }
        async _finalizeBody() {
          const { options } = this;
          const { headers } = options;
          const isForm = !is_1.default.undefined(options.form);
          const isJSON = !is_1.default.undefined(options.json);
          const isBody = !is_1.default.undefined(options.body);
          const hasPayload = isForm || isJSON || isBody;
          const cannotHaveBody =
            exports.withoutBody.has(options.method) &&
            !(options.method === 'GET' && options.allowGetBody);
          this._cannotHaveBody = cannotHaveBody;
          if (hasPayload) {
            if (cannotHaveBody) {
              throw new TypeError(
                `The \`${options.method}\` method cannot be used with a body`
              );
            }
            if (
              [isBody, isForm, isJSON].filter((isTrue) => isTrue).length > 1
            ) {
              throw new TypeError(
                'The `body`, `json` and `form` options are mutually exclusive'
              );
            }
            if (
              isBody &&
              !(options.body instanceof stream_1.Readable) &&
              !is_1.default.string(options.body) &&
              !is_1.default.buffer(options.body) &&
              !is_form_data_1.default(options.body)
            ) {
              throw new TypeError(
                'The `body` option must be a stream.Readable, string or Buffer'
              );
            }
            if (isForm && !is_1.default.object(options.form)) {
              throw new TypeError('The `form` option must be an Object');
            }
            {
              // Serialize body
              const noContentType = !is_1.default.string(
                headers['content-type']
              );
              if (isBody) {
                // Special case for https://github.com/form-data/form-data
                if (is_form_data_1.default(options.body) && noContentType) {
                  headers[
                    'content-type'
                  ] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
                }
                this[kBody] = options.body;
              } else if (isForm) {
                if (noContentType) {
                  headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                this[kBody] = new url_1.URLSearchParams(
                  options.form
                ).toString();
              } else {
                if (noContentType) {
                  headers['content-type'] = 'application/json';
                }
                this[kBody] = options.stringifyJson(options.json);
              }
              const uploadBodySize = await get_body_size_1.default(
                this[kBody],
                options.headers
              );
              // See https://tools.ietf.org/html/rfc7230#section-3.3.2
              // A user agent SHOULD send a Content-Length in a request message when
              // no Transfer-Encoding is sent and the request method defines a meaning
              // for an enclosed payload body.  For example, a Content-Length header
              // field is normally sent in a POST request even when the value is 0
              // (indicating an empty payload body).  A user agent SHOULD NOT send a
              // Content-Length header field when the request message does not contain
              // a payload body and the method semantics do not anticipate such a
              // body.
              if (
                is_1.default.undefined(headers['content-length']) &&
                is_1.default.undefined(headers['transfer-encoding'])
              ) {
                if (
                  !cannotHaveBody &&
                  !is_1.default.undefined(uploadBodySize)
                ) {
                  headers['content-length'] = String(uploadBodySize);
                }
              }
            }
          } else if (cannotHaveBody) {
            this._lockWrite();
          } else {
            this._unlockWrite();
          }
          this[kBodySize] = Number(headers['content-length']) || undefined;
        }
        async _onResponseBase(response) {
          const { options } = this;
          const { url } = options;
          this[kOriginalResponse] = response;
          if (options.decompress) {
            response = decompressResponse(response);
          }
          const statusCode = response.statusCode;
          const typedResponse = response;
          typedResponse.statusMessage = typedResponse.statusMessage
            ? typedResponse.statusMessage
            : http.STATUS_CODES[statusCode];
          typedResponse.url = options.url.toString();
          typedResponse.requestUrl = this.requestUrl;
          typedResponse.redirectUrls = this.redirects;
          typedResponse.request = this;
          typedResponse.isFromCache = response.fromCache || false;
          typedResponse.ip = this.ip;
          typedResponse.retryCount = this.retryCount;
          this[kIsFromCache] = typedResponse.isFromCache;
          this[kResponseSize] =
            Number(response.headers['content-length']) || undefined;
          this[kResponse] = response;
          response.once('end', () => {
            this[kResponseSize] = this[kDownloadedSize];
            this.emit('downloadProgress', this.downloadProgress);
          });
          response.once('error', (error) => {
            // Force clean-up, because some packages don't do this.
            // TODO: Fix decompress-response
            response.destroy();
            this._beforeError(new ReadError(error, this));
          });
          response.once('aborted', () => {
            this._beforeError(
              new ReadError(
                {
                  name: 'Error',
                  message: 'The server aborted pending request',
                  code: 'ECONNRESET',
                },
                this
              )
            );
          });
          this.emit('downloadProgress', this.downloadProgress);
          const rawCookies = response.headers['set-cookie'];
          if (is_1.default.object(options.cookieJar) && rawCookies) {
            let promises = rawCookies.map(async (rawCookie) =>
              options.cookieJar.setCookie(rawCookie, url.toString())
            );
            if (options.ignoreInvalidCookies) {
              promises = promises.map(async (p) => p.catch(() => {}));
            }
            try {
              await Promise.all(promises);
            } catch (error) {
              this._beforeError(error);
              return;
            }
          }
          if (
            options.followRedirect &&
            response.headers.location &&
            redirectCodes.has(statusCode)
          ) {
            // We're being redirected, we don't care about the response.
            // It'd be best to abort the request, but we can't because
            // we would have to sacrifice the TCP connection. We don't want that.
            response.resume();
            if (this[kRequest]) {
              this[kCancelTimeouts]();
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete this[kRequest];
              this[kUnproxyEvents]();
            }
            const shouldBeGet =
              statusCode === 303 &&
              options.method !== 'GET' &&
              options.method !== 'HEAD';
            if (shouldBeGet || !options.methodRewriting) {
              // Server responded with "see other", indicating that the resource exists at another location,
              // and the client should request it from that location via GET or HEAD.
              options.method = 'GET';
              if ('body' in options) {
                delete options.body;
              }
              if ('json' in options) {
                delete options.json;
              }
              if ('form' in options) {
                delete options.form;
              }
              this[kBody] = undefined;
              delete options.headers['content-length'];
            }
            if (this.redirects.length >= options.maxRedirects) {
              this._beforeError(new MaxRedirectsError(this));
              return;
            }
            try {
              // Do not remove. See https://github.com/sindresorhus/got/pull/214
              const redirectBuffer = Buffer.from(
                response.headers.location,
                'binary'
              ).toString();
              // Handles invalid URLs. See https://github.com/sindresorhus/got/issues/604
              const redirectUrl = new url_1.URL(redirectBuffer, url);
              const redirectString = redirectUrl.toString();
              decodeURI(redirectString);
              // Redirecting to a different site, clear sensitive data.
              if (
                redirectUrl.hostname !== url.hostname ||
                redirectUrl.port !== url.port
              ) {
                if ('host' in options.headers) {
                  delete options.headers.host;
                }
                if ('cookie' in options.headers) {
                  delete options.headers.cookie;
                }
                if ('authorization' in options.headers) {
                  delete options.headers.authorization;
                }
                if (options.username || options.password) {
                  options.username = '';
                  options.password = '';
                }
              } else {
                redirectUrl.username = options.username;
                redirectUrl.password = options.password;
              }
              this.redirects.push(redirectString);
              options.url = redirectUrl;
              for (const hook of options.hooks.beforeRedirect) {
                // eslint-disable-next-line no-await-in-loop
                await hook(options, typedResponse);
              }
              this.emit('redirect', typedResponse, options);
              await this._makeRequest();
            } catch (error) {
              this._beforeError(error);
              return;
            }
            return;
          }
          if (
            options.isStream &&
            options.throwHttpErrors &&
            !is_response_ok_1.isResponseOk(typedResponse)
          ) {
            this._beforeError(new HTTPError(typedResponse));
            return;
          }
          response.on('readable', () => {
            if (this[kTriggerRead]) {
              this._read();
            }
          });
          this.on('resume', () => {
            response.resume();
          });
          this.on('pause', () => {
            response.pause();
          });
          response.once('end', () => {
            this.push(null);
          });
          this.emit('response', response);
          for (const destination of this[kServerResponsesPiped]) {
            if (destination.headersSent) {
              continue;
            }
            // eslint-disable-next-line guard-for-in
            for (const key in response.headers) {
              const isAllowed = options.decompress
                ? key !== 'content-encoding'
                : true;
              const value = response.headers[key];
              if (isAllowed) {
                destination.setHeader(key, value);
              }
            }
            destination.statusCode = statusCode;
          }
        }
        async _onResponse(response) {
          try {
            await this._onResponseBase(response);
          } catch (error) {
            /* istanbul ignore next: better safe than sorry */
            this._beforeError(error);
          }
        }
        _onRequest(request) {
          const { options } = this;
          const { timeout, url } = options;
          http_timer_1.default(request);
          this[kCancelTimeouts] = timed_out_1.default(request, timeout, url);
          const responseEventName = options.cache
            ? 'cacheableResponse'
            : 'response';
          request.once(responseEventName, (response) => {
            void this._onResponse(response);
          });
          request.once('error', (error) => {
            var _a;
            // Force clean-up, because some packages (e.g. nock) don't do this.
            request.destroy();
            // Node.js <= 12.18.2 mistakenly emits the response `end` first.
            (_a = request.res) === null || _a === void 0
              ? void 0
              : _a.removeAllListeners('end');
            error =
              error instanceof timed_out_1.TimeoutError
                ? new TimeoutError(error, this.timings, this)
                : new RequestError(error.message, error, this);
            this._beforeError(error);
          });
          this[kUnproxyEvents] = proxy_events_1.default(
            request,
            this,
            proxiedRequestEvents
          );
          this[kRequest] = request;
          this.emit('uploadProgress', this.uploadProgress);
          // Send body
          const body = this[kBody];
          const currentRequest = this.redirects.length === 0 ? this : request;
          if (is_1.default.nodeStream(body)) {
            body.pipe(currentRequest);
            body.once('error', (error) => {
              this._beforeError(new UploadError(error, this));
            });
          } else {
            this._unlockWrite();
            if (!is_1.default.undefined(body)) {
              this._writeRequest(body, undefined, () => {});
              currentRequest.end();
              this._lockWrite();
            } else if (this._cannotHaveBody || this._noPipe) {
              currentRequest.end();
              this._lockWrite();
            }
          }
          this.emit('request', request);
        }
        async _createCacheableRequest(url, options) {
          return new Promise((resolve, reject) => {
            // TODO: Remove `utils/url-to-options.ts` when `cacheable-request` is fixed
            Object.assign(options, url_to_options_1.default(url));
            // `http-cache-semantics` checks this
            // TODO: Fix this ignore.
            // @ts-expect-error
            delete options.url;
            let request;
            // This is ugly
            const cacheRequest = cacheableStore.get(options.cache)(
              options,
              async (response) => {
                // TODO: Fix `cacheable-response`
                response._readableState.autoDestroy = false;
                if (request) {
                  (await request).emit('cacheableResponse', response);
                }
                resolve(response);
              }
            );
            // Restore options
            options.url = url;
            cacheRequest.once('error', reject);
            cacheRequest.once('request', async (requestOrPromise) => {
              request = requestOrPromise;
              resolve(request);
            });
          });
        }
        async _makeRequest() {
          var _a, _b, _c, _d, _e;
          const { options } = this;
          const { headers } = options;
          for (const key in headers) {
            if (is_1.default.undefined(headers[key])) {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete headers[key];
            } else if (is_1.default.null_(headers[key])) {
              throw new TypeError(
                `Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`
              );
            }
          }
          if (
            options.decompress &&
            is_1.default.undefined(headers['accept-encoding'])
          ) {
            headers['accept-encoding'] = supportsBrotli
              ? 'gzip, deflate, br'
              : 'gzip, deflate';
          }
          // Set cookies
          if (options.cookieJar) {
            const cookieString = await options.cookieJar.getCookieString(
              options.url.toString()
            );
            if (is_1.default.nonEmptyString(cookieString)) {
              options.headers.cookie = cookieString;
            }
          }
          for (const hook of options.hooks.beforeRequest) {
            // eslint-disable-next-line no-await-in-loop
            const result = await hook(options);
            if (!is_1.default.undefined(result)) {
              // @ts-expect-error Skip the type mismatch to support abstract responses
              options.request = () => result;
              break;
            }
          }
          if (options.body && this[kBody] !== options.body) {
            this[kBody] = options.body;
          }
          const { agent, request, timeout, url } = options;
          if (options.dnsCache && !('lookup' in options)) {
            options.lookup = options.dnsCache.lookup;
          }
          // UNIX sockets
          if (url.hostname === 'unix') {
            const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(
              `${url.pathname}${url.search}`
            );
            if (
              matches === null || matches === void 0 ? void 0 : matches.groups
            ) {
              const { socketPath, path } = matches.groups;
              Object.assign(options, {
                socketPath,
                path,
                host: '',
              });
            }
          }
          const isHttps = url.protocol === 'https:';
          // Fallback function
          let fallbackFn;
          if (options.http2) {
            fallbackFn = http2wrapper.auto;
          } else {
            fallbackFn = isHttps ? https.request : http.request;
          }
          const realFn =
            (_a = options.request) !== null && _a !== void 0 ? _a : fallbackFn;
          // Cache support
          const fn = options.cache ? this._createCacheableRequest : realFn;
          // Pass an agent directly when HTTP2 is disabled
          if (agent && !options.http2) {
            options.agent = agent[isHttps ? 'https' : 'http'];
          }
          // Prepare plain HTTP request options
          options[kRequest] = realFn;
          delete options.request;
          // TODO: Fix this ignore.
          // @ts-expect-error
          delete options.timeout;
          const requestOptions = options;
          requestOptions.shared =
            (_b = options.cacheOptions) === null || _b === void 0
              ? void 0
              : _b.shared;
          requestOptions.cacheHeuristic =
            (_c = options.cacheOptions) === null || _c === void 0
              ? void 0
              : _c.cacheHeuristic;
          requestOptions.immutableMinTimeToLive =
            (_d = options.cacheOptions) === null || _d === void 0
              ? void 0
              : _d.immutableMinTimeToLive;
          requestOptions.ignoreCargoCult =
            (_e = options.cacheOptions) === null || _e === void 0
              ? void 0
              : _e.ignoreCargoCult;
          // If `dnsLookupIpVersion` is not present do not override `family`
          if (options.dnsLookupIpVersion !== undefined) {
            try {
              requestOptions.family =
                dns_ip_version_1.dnsLookupIpVersionToFamily(
                  options.dnsLookupIpVersion
                );
            } catch (_f) {
              throw new Error('Invalid `dnsLookupIpVersion` option value');
            }
          }
          // HTTPS options remapping
          if (options.https) {
            if ('rejectUnauthorized' in options.https) {
              requestOptions.rejectUnauthorized =
                options.https.rejectUnauthorized;
            }
            if (options.https.checkServerIdentity) {
              requestOptions.checkServerIdentity =
                options.https.checkServerIdentity;
            }
            if (options.https.certificateAuthority) {
              requestOptions.ca = options.https.certificateAuthority;
            }
            if (options.https.certificate) {
              requestOptions.cert = options.https.certificate;
            }
            if (options.https.key) {
              requestOptions.key = options.https.key;
            }
            if (options.https.passphrase) {
              requestOptions.passphrase = options.https.passphrase;
            }
            if (options.https.pfx) {
              requestOptions.pfx = options.https.pfx;
            }
          }
          try {
            let requestOrResponse = await fn(url, requestOptions);
            if (is_1.default.undefined(requestOrResponse)) {
              requestOrResponse = fallbackFn(url, requestOptions);
            }
            // Restore options
            options.request = request;
            options.timeout = timeout;
            options.agent = agent;
            // HTTPS options restore
            if (options.https) {
              if ('rejectUnauthorized' in options.https) {
                delete requestOptions.rejectUnauthorized;
              }
              if (options.https.checkServerIdentity) {
                // @ts-expect-error - This one will be removed when we remove the alias.
                delete requestOptions.checkServerIdentity;
              }
              if (options.https.certificateAuthority) {
                delete requestOptions.ca;
              }
              if (options.https.certificate) {
                delete requestOptions.cert;
              }
              if (options.https.key) {
                delete requestOptions.key;
              }
              if (options.https.passphrase) {
                delete requestOptions.passphrase;
              }
              if (options.https.pfx) {
                delete requestOptions.pfx;
              }
            }
            if (isClientRequest(requestOrResponse)) {
              this._onRequest(requestOrResponse);
              // Emit the response after the stream has been ended
            } else if (this.writable) {
              this.once('finish', () => {
                void this._onResponse(requestOrResponse);
              });
              this._unlockWrite();
              this.end();
              this._lockWrite();
            } else {
              void this._onResponse(requestOrResponse);
            }
          } catch (error) {
            if (error instanceof CacheableRequest.CacheError) {
              throw new CacheError(error, this);
            }
            throw new RequestError(error.message, error, this);
          }
        }
        async _error(error) {
          try {
            for (const hook of this.options.hooks.beforeError) {
              // eslint-disable-next-line no-await-in-loop
              error = await hook(error);
            }
          } catch (error_) {
            error = new RequestError(error_.message, error_, this);
          }
          this.destroy(error);
        }
        _beforeError(error) {
          if (this[kStopReading]) {
            return;
          }
          const { options } = this;
          const retryCount = this.retryCount + 1;
          this[kStopReading] = true;
          if (!(error instanceof RequestError)) {
            error = new RequestError(error.message, error, this);
          }
          const typedError = error;
          const { response } = typedError;
          void (async () => {
            if (response && !response.body) {
              response.setEncoding(this._readableState.encoding);
              try {
                response.rawBody = await get_buffer_1.default(response);
                response.body = response.rawBody.toString();
              } catch (_a) {}
            }
            if (this.listenerCount('retry') !== 0) {
              let backoff;
              try {
                let retryAfter;
                if (response && 'retry-after' in response.headers) {
                  retryAfter = Number(response.headers['retry-after']);
                  if (Number.isNaN(retryAfter)) {
                    retryAfter =
                      Date.parse(response.headers['retry-after']) - Date.now();
                    if (retryAfter <= 0) {
                      retryAfter = 1;
                    }
                  } else {
                    retryAfter *= 1000;
                  }
                }
                backoff = await options.retry.calculateDelay({
                  attemptCount: retryCount,
                  retryOptions: options.retry,
                  error: typedError,
                  retryAfter,
                  computedValue: calculate_retry_delay_1.default({
                    attemptCount: retryCount,
                    retryOptions: options.retry,
                    error: typedError,
                    retryAfter,
                    computedValue: 0,
                  }),
                });
              } catch (error_) {
                void this._error(
                  new RequestError(error_.message, error_, this)
                );
                return;
              }
              if (backoff) {
                const retry = async () => {
                  try {
                    for (const hook of this.options.hooks.beforeRetry) {
                      // eslint-disable-next-line no-await-in-loop
                      await hook(this.options, typedError, retryCount);
                    }
                  } catch (error_) {
                    void this._error(
                      new RequestError(error_.message, error, this)
                    );
                    return;
                  }
                  // Something forced us to abort the retry
                  if (this.destroyed) {
                    return;
                  }
                  this.destroy();
                  this.emit('retry', retryCount, error);
                };
                this[kRetryTimeout] = setTimeout(retry, backoff);
                return;
              }
            }
            void this._error(typedError);
          })();
        }
        _read() {
          this[kTriggerRead] = true;
          const response = this[kResponse];
          if (response && !this[kStopReading]) {
            // We cannot put this in the `if` above
            // because `.read()` also triggers the `end` event
            if (response.readableLength) {
              this[kTriggerRead] = false;
            }
            let data;
            while ((data = response.read()) !== null) {
              this[kDownloadedSize] += data.length;
              this[kStartedReading] = true;
              const progress = this.downloadProgress;
              if (progress.percent < 1) {
                this.emit('downloadProgress', progress);
              }
              this.push(data);
            }
          }
        }
        // Node.js 12 has incorrect types, so the encoding must be a string
        _write(chunk, encoding, callback) {
          const write = () => {
            this._writeRequest(chunk, encoding, callback);
          };
          if (this.requestInitialized) {
            write();
          } else {
            this[kJobs].push(write);
          }
        }
        _writeRequest(chunk, encoding, callback) {
          if (this[kRequest].destroyed) {
            // Probably the `ClientRequest` instance will throw
            return;
          }
          this._progressCallbacks.push(() => {
            this[kUploadedSize] += Buffer.byteLength(chunk, encoding);
            const progress = this.uploadProgress;
            if (progress.percent < 1) {
              this.emit('uploadProgress', progress);
            }
          });
          // TODO: What happens if it's from cache? Then this[kRequest] won't be defined.
          this[kRequest].write(chunk, encoding, (error) => {
            if (!error && this._progressCallbacks.length > 0) {
              this._progressCallbacks.shift()();
            }
            callback(error);
          });
        }
        _final(callback) {
          const endRequest = () => {
            // FIX: Node.js 10 calls the write callback AFTER the end callback!
            while (this._progressCallbacks.length !== 0) {
              this._progressCallbacks.shift()();
            }
            // We need to check if `this[kRequest]` is present,
            // because it isn't when we use cache.
            if (!(kRequest in this)) {
              callback();
              return;
            }
            if (this[kRequest].destroyed) {
              callback();
              return;
            }
            this[kRequest].end((error) => {
              if (!error) {
                this[kBodySize] = this[kUploadedSize];
                this.emit('uploadProgress', this.uploadProgress);
                this[kRequest].emit('upload-complete');
              }
              callback(error);
            });
          };
          if (this.requestInitialized) {
            endRequest();
          } else {
            this[kJobs].push(endRequest);
          }
        }
        _destroy(error, callback) {
          var _a;
          this[kStopReading] = true;
          // Prevent further retries
          clearTimeout(this[kRetryTimeout]);
          if (kRequest in this) {
            this[kCancelTimeouts]();
            // TODO: Remove the next `if` when these get fixed:
            // - https://github.com/nodejs/node/issues/32851
            if (
              !((_a = this[kResponse]) === null || _a === void 0
                ? void 0
                : _a.complete)
            ) {
              this[kRequest].destroy();
            }
          }
          if (
            error !== null &&
            !is_1.default.undefined(error) &&
            !(error instanceof RequestError)
          ) {
            error = new RequestError(error.message, error, this);
          }
          callback(error);
        }
        get _isAboutToError() {
          return this[kStopReading];
        }
        /**
    The remote IP address.
    */
        get ip() {
          var _a;
          return (_a = this.socket) === null || _a === void 0
            ? void 0
            : _a.remoteAddress;
        }
        /**
    Indicates whether the request has been aborted or not.
    */
        get aborted() {
          var _a, _b, _c;
          return (
            ((_b =
              (_a = this[kRequest]) === null || _a === void 0
                ? void 0
                : _a.destroyed) !== null && _b !== void 0
              ? _b
              : this.destroyed) &&
            !((_c = this[kOriginalResponse]) === null || _c === void 0
              ? void 0
              : _c.complete)
          );
        }
        get socket() {
          var _a, _b;
          return (_b =
            (_a = this[kRequest]) === null || _a === void 0
              ? void 0
              : _a.socket) !== null && _b !== void 0
            ? _b
            : undefined;
        }
        /**
    Progress event for downloading (receiving a response).
    */
        get downloadProgress() {
          let percent;
          if (this[kResponseSize]) {
            percent = this[kDownloadedSize] / this[kResponseSize];
          } else if (this[kResponseSize] === this[kDownloadedSize]) {
            percent = 1;
          } else {
            percent = 0;
          }
          return {
            percent,
            transferred: this[kDownloadedSize],
            total: this[kResponseSize],
          };
        }
        /**
    Progress event for uploading (sending a request).
    */
        get uploadProgress() {
          let percent;
          if (this[kBodySize]) {
            percent = this[kUploadedSize] / this[kBodySize];
          } else if (this[kBodySize] === this[kUploadedSize]) {
            percent = 1;
          } else {
            percent = 0;
          }
          return {
            percent,
            transferred: this[kUploadedSize],
            total: this[kBodySize],
          };
        }
        /**
    The object contains the following properties:

    - `start` - Time when the request started.
    - `socket` - Time when a socket was assigned to the request.
    - `lookup` - Time when the DNS lookup finished.
    - `connect` - Time when the socket successfully connected.
    - `secureConnect` - Time when the socket securely connected.
    - `upload` - Time when the request finished uploading.
    - `response` - Time when the request fired `response` event.
    - `end` - Time when the response fired `end` event.
    - `error` - Time when the request fired `error` event.
    - `abort` - Time when the request fired `abort` event.
    - `phases`
        - `wait` - `timings.socket - timings.start`
        - `dns` - `timings.lookup - timings.socket`
        - `tcp` - `timings.connect - timings.lookup`
        - `tls` - `timings.secureConnect - timings.connect`
        - `request` - `timings.upload - (timings.secureConnect || timings.connect)`
        - `firstByte` - `timings.response - timings.upload`
        - `download` - `timings.end - timings.response`
        - `total` - `(timings.end || timings.error || timings.abort) - timings.start`

    If something has not been measured yet, it will be `undefined`.

    __Note__: The time is a `number` representing the milliseconds elapsed since the UNIX epoch.
    */
        get timings() {
          var _a;
          return (_a = this[kRequest]) === null || _a === void 0
            ? void 0
            : _a.timings;
        }
        /**
    Whether the response was retrieved from the cache.
    */
        get isFromCache() {
          return this[kIsFromCache];
        }
        pipe(destination, options) {
          if (this[kStartedReading]) {
            throw new Error(
              'Failed to pipe. The response has been emitted already.'
            );
          }
          if (destination instanceof http_1.ServerResponse) {
            this[kServerResponsesPiped].add(destination);
          }
          return super.pipe(destination, options);
        }
        unpipe(destination) {
          if (destination instanceof http_1.ServerResponse) {
            this[kServerResponsesPiped].delete(destination);
          }
          super.unpipe(destination);
          return this;
        }
      }
      exports['default'] = Request;

      /***/
    },

    /***/ 4993: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.dnsLookupIpVersionToFamily = exports.isDnsLookupIpVersion =
        void 0;
      const conversionTable = {
        auto: 0,
        ipv4: 4,
        ipv6: 6,
      };
      exports.isDnsLookupIpVersion = (value) => {
        return value in conversionTable;
      };
      exports.dnsLookupIpVersionToFamily = (dnsLookupIpVersion) => {
        if (exports.isDnsLookupIpVersion(dnsLookupIpVersion)) {
          return conversionTable[dnsLookupIpVersion];
        }
        throw new Error('Invalid DNS lookup IP version');
      };

      /***/
    },

    /***/ 4564: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const fs_1 = __nccwpck_require__(7147);
      const util_1 = __nccwpck_require__(3837);
      const is_1 = __nccwpck_require__(7678);
      const is_form_data_1 = __nccwpck_require__(40);
      const statAsync = util_1.promisify(fs_1.stat);
      exports['default'] = async (body, headers) => {
        if (headers && 'content-length' in headers) {
          return Number(headers['content-length']);
        }
        if (!body) {
          return 0;
        }
        if (is_1.default.string(body)) {
          return Buffer.byteLength(body);
        }
        if (is_1.default.buffer(body)) {
          return body.length;
        }
        if (is_form_data_1.default(body)) {
          return util_1.promisify(body.getLength.bind(body))();
        }
        if (body instanceof fs_1.ReadStream) {
          const { size } = await statAsync(body.path);
          if (size === 0) {
            return undefined;
          }
          return size;
        }
        return undefined;
      };

      /***/
    },

    /***/ 4500: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      // TODO: Update https://github.com/sindresorhus/get-stream
      const getBuffer = async (stream) => {
        const chunks = [];
        let length = 0;
        for await (const chunk of stream) {
          chunks.push(chunk);
          length += Buffer.byteLength(chunk);
        }
        if (Buffer.isBuffer(chunks[0])) {
          return Buffer.concat(chunks, length);
        }
        return Buffer.from(chunks.join(''));
      };
      exports['default'] = getBuffer;

      /***/
    },

    /***/ 40: /***/ (__unused_webpack_module, exports, __nccwpck_require__) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const is_1 = __nccwpck_require__(7678);
      exports['default'] = (body) =>
        is_1.default.nodeStream(body) &&
        is_1.default.function_(body.getBoundary);

      /***/
    },

    /***/ 9298: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.isResponseOk = void 0;
      exports.isResponseOk = (response) => {
        const { statusCode } = response;
        const limitStatusCode = response.request.options.followRedirect
          ? 299
          : 399;
        return (
          (statusCode >= 200 && statusCode <= limitStatusCode) ||
          statusCode === 304
        );
      };

      /***/
    },

    /***/ 9219: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      /* istanbul ignore file: deprecated */
      const url_1 = __nccwpck_require__(7310);
      const keys = [
        'protocol',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
      ];
      exports['default'] = (origin, options) => {
        var _a, _b;
        if (options.path) {
          if (options.pathname) {
            throw new TypeError(
              'Parameters `path` and `pathname` are mutually exclusive.'
            );
          }
          if (options.search) {
            throw new TypeError(
              'Parameters `path` and `search` are mutually exclusive.'
            );
          }
          if (options.searchParams) {
            throw new TypeError(
              'Parameters `path` and `searchParams` are mutually exclusive.'
            );
          }
        }
        if (options.search && options.searchParams) {
          throw new TypeError(
            'Parameters `search` and `searchParams` are mutually exclusive.'
          );
        }
        if (!origin) {
          if (!options.protocol) {
            throw new TypeError('No URL protocol specified');
          }
          origin = `${options.protocol}//${
            (_b =
              (_a = options.hostname) !== null && _a !== void 0
                ? _a
                : options.host) !== null && _b !== void 0
              ? _b
              : ''
          }`;
        }
        const url = new url_1.URL(origin);
        if (options.path) {
          const searchIndex = options.path.indexOf('?');
          if (searchIndex === -1) {
            options.pathname = options.path;
          } else {
            options.pathname = options.path.slice(0, searchIndex);
            options.search = options.path.slice(searchIndex + 1);
          }
          delete options.path;
        }
        for (const key of keys) {
          if (options[key]) {
            url[key] = options[key].toString();
          }
        }
        return url;
      };

      /***/
    },

    /***/ 3021: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      function default_1(from, to, events) {
        const fns = {};
        for (const event of events) {
          fns[event] = (...args) => {
            to.emit(event, ...args);
          };
          from.on(event, fns[event]);
        }
        return () => {
          for (const event of events) {
            from.off(event, fns[event]);
          }
        };
      }
      exports['default'] = default_1;

      /***/
    },

    /***/ 2454: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.TimeoutError = void 0;
      const net = __nccwpck_require__(1808);
      const unhandle_1 = __nccwpck_require__(1593);
      const reentry = Symbol('reentry');
      const noop = () => {};
      class TimeoutError extends Error {
        constructor(threshold, event) {
          super(`Timeout awaiting '${event}' for ${threshold}ms`);
          this.event = event;
          this.name = 'TimeoutError';
          this.code = 'ETIMEDOUT';
        }
      }
      exports.TimeoutError = TimeoutError;
      exports['default'] = (request, delays, options) => {
        if (reentry in request) {
          return noop;
        }
        request[reentry] = true;
        const cancelers = [];
        const { once, unhandleAll } = unhandle_1.default();
        const addTimeout = (delay, callback, event) => {
          var _a;
          const timeout = setTimeout(callback, delay, delay, event);
          (_a = timeout.unref) === null || _a === void 0
            ? void 0
            : _a.call(timeout);
          const cancel = () => {
            clearTimeout(timeout);
          };
          cancelers.push(cancel);
          return cancel;
        };
        const { host, hostname } = options;
        const timeoutHandler = (delay, event) => {
          request.destroy(new TimeoutError(delay, event));
        };
        const cancelTimeouts = () => {
          for (const cancel of cancelers) {
            cancel();
          }
          unhandleAll();
        };
        request.once('error', (error) => {
          cancelTimeouts();
          // Save original behavior
          /* istanbul ignore next */
          if (request.listenerCount('error') === 0) {
            throw error;
          }
        });
        request.once('close', cancelTimeouts);
        once(request, 'response', (response) => {
          once(response, 'end', cancelTimeouts);
        });
        if (typeof delays.request !== 'undefined') {
          addTimeout(delays.request, timeoutHandler, 'request');
        }
        if (typeof delays.socket !== 'undefined') {
          const socketTimeoutHandler = () => {
            timeoutHandler(delays.socket, 'socket');
          };
          request.setTimeout(delays.socket, socketTimeoutHandler);
          // `request.setTimeout(0)` causes a memory leak.
          // We can just remove the listener and forget about the timer - it's unreffed.
          // See https://github.com/sindresorhus/got/issues/690
          cancelers.push(() => {
            request.removeListener('timeout', socketTimeoutHandler);
          });
        }
        once(request, 'socket', (socket) => {
          var _a;
          const { socketPath } = request;
          /* istanbul ignore next: hard to test */
          if (socket.connecting) {
            const hasPath = Boolean(
              socketPath !== null && socketPath !== void 0
                ? socketPath
                : net.isIP(
                    (_a =
                      hostname !== null && hostname !== void 0
                        ? hostname
                        : host) !== null && _a !== void 0
                      ? _a
                      : ''
                  ) !== 0
            );
            if (
              typeof delays.lookup !== 'undefined' &&
              !hasPath &&
              typeof socket.address().address === 'undefined'
            ) {
              const cancelTimeout = addTimeout(
                delays.lookup,
                timeoutHandler,
                'lookup'
              );
              once(socket, 'lookup', cancelTimeout);
            }
            if (typeof delays.connect !== 'undefined') {
              const timeConnect = () =>
                addTimeout(delays.connect, timeoutHandler, 'connect');
              if (hasPath) {
                once(socket, 'connect', timeConnect());
              } else {
                once(socket, 'lookup', (error) => {
                  if (error === null) {
                    once(socket, 'connect', timeConnect());
                  }
                });
              }
            }
            if (
              typeof delays.secureConnect !== 'undefined' &&
              options.protocol === 'https:'
            ) {
              once(socket, 'connect', () => {
                const cancelTimeout = addTimeout(
                  delays.secureConnect,
                  timeoutHandler,
                  'secureConnect'
                );
                once(socket, 'secureConnect', cancelTimeout);
              });
            }
          }
          if (typeof delays.send !== 'undefined') {
            const timeRequest = () =>
              addTimeout(delays.send, timeoutHandler, 'send');
            /* istanbul ignore next: hard to test */
            if (socket.connecting) {
              once(socket, 'connect', () => {
                once(request, 'upload-complete', timeRequest());
              });
            } else {
              once(request, 'upload-complete', timeRequest());
            }
          }
        });
        if (typeof delays.response !== 'undefined') {
          once(request, 'upload-complete', () => {
            const cancelTimeout = addTimeout(
              delays.response,
              timeoutHandler,
              'response'
            );
            once(request, 'response', cancelTimeout);
          });
        }
        return cancelTimeouts;
      };

      /***/
    },

    /***/ 1593: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      // When attaching listeners, it's very easy to forget about them.
      // Especially if you do error handling and set timeouts.
      // So instead of checking if it's proper to throw an error on every timeout ever,
      // use this simple tool which will remove all listeners you have attached.
      exports['default'] = () => {
        const handlers = [];
        return {
          once(origin, event, fn) {
            origin.once(event, fn);
            handlers.push({ origin, event, fn });
          },
          unhandleAll() {
            for (const handler of handlers) {
              const { origin, event, fn } = handler;
              origin.removeListener(event, fn);
            }
            handlers.length = 0;
          },
        };
      };

      /***/
    },

    /***/ 8026: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const is_1 = __nccwpck_require__(7678);
      exports['default'] = (url) => {
        // Cast to URL
        url = url;
        const options = {
          protocol: url.protocol,
          hostname:
            is_1.default.string(url.hostname) && url.hostname.startsWith('[')
              ? url.hostname.slice(1, -1)
              : url.hostname,
          host: url.host,
          hash: url.hash,
          search: url.search,
          pathname: url.pathname,
          href: url.href,
          path: `${url.pathname || ''}${url.search || ''}`,
        };
        if (is_1.default.string(url.port) && url.port.length > 0) {
          options.port = Number(url.port);
        }
        if (url.username || url.password) {
          options.auth = `${url.username || ''}:${url.password || ''}`;
        }
        return options;
      };

      /***/
    },

    /***/ 7288: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      class WeakableMap {
        constructor() {
          this.weakMap = new WeakMap();
          this.map = new Map();
        }
        set(key, value) {
          if (typeof key === 'object') {
            this.weakMap.set(key, value);
          } else {
            this.map.set(key, value);
          }
        }
        get(key) {
          if (typeof key === 'object') {
            return this.weakMap.get(key);
          }
          return this.map.get(key);
        }
        has(key) {
          if (typeof key === 'object') {
            return this.weakMap.has(key);
          }
          return this.map.has(key);
        }
      }
      exports['default'] = WeakableMap;

      /***/
    },

    /***/ 4337: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __exportStar =
        (this && this.__exportStar) ||
        function (m, exports) {
          for (var p in m)
            if (
              p !== 'default' &&
              !Object.prototype.hasOwnProperty.call(exports, p)
            )
              __createBinding(exports, m, p);
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.defaultHandler = void 0;
      const is_1 = __nccwpck_require__(7678);
      const as_promise_1 = __nccwpck_require__(6056);
      const create_rejection_1 = __nccwpck_require__(6457);
      const core_1 = __nccwpck_require__(94);
      const deep_freeze_1 = __nccwpck_require__(285);
      const errors = {
        RequestError: as_promise_1.RequestError,
        CacheError: as_promise_1.CacheError,
        ReadError: as_promise_1.ReadError,
        HTTPError: as_promise_1.HTTPError,
        MaxRedirectsError: as_promise_1.MaxRedirectsError,
        TimeoutError: as_promise_1.TimeoutError,
        ParseError: as_promise_1.ParseError,
        CancelError: as_promise_1.CancelError,
        UnsupportedProtocolError: as_promise_1.UnsupportedProtocolError,
        UploadError: as_promise_1.UploadError,
      };
      // The `delay` package weighs 10KB (!)
      const delay = async (ms) =>
        new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      const { normalizeArguments } = core_1.default;
      const mergeOptions = (...sources) => {
        let mergedOptions;
        for (const source of sources) {
          mergedOptions = normalizeArguments(undefined, source, mergedOptions);
        }
        return mergedOptions;
      };
      const getPromiseOrStream = (options) =>
        options.isStream
          ? new core_1.default(undefined, options)
          : as_promise_1.default(options);
      const isGotInstance = (value) =>
        'defaults' in value && 'options' in value.defaults;
      const aliases = ['get', 'post', 'put', 'patch', 'head', 'delete'];
      exports.defaultHandler = (options, next) => next(options);
      const callInitHooks = (hooks, options) => {
        if (hooks) {
          for (const hook of hooks) {
            hook(options);
          }
        }
      };
      const create = (defaults) => {
        // Proxy properties from next handlers
        defaults._rawHandlers = defaults.handlers;
        defaults.handlers = defaults.handlers.map((fn) => (options, next) => {
          // This will be assigned by assigning result
          let root;
          const result = fn(options, (newOptions) => {
            root = next(newOptions);
            return root;
          });
          if (result !== root && !options.isStream && root) {
            const typedResult = result;
            const {
              then: promiseThen,
              catch: promiseCatch,
              finally: promiseFianlly,
            } = typedResult;
            Object.setPrototypeOf(typedResult, Object.getPrototypeOf(root));
            Object.defineProperties(
              typedResult,
              Object.getOwnPropertyDescriptors(root)
            );
            // These should point to the new promise
            // eslint-disable-next-line promise/prefer-await-to-then
            typedResult.then = promiseThen;
            typedResult.catch = promiseCatch;
            typedResult.finally = promiseFianlly;
          }
          return result;
        });
        // Got interface
        const got = (url, options = {}, _defaults) => {
          var _a, _b;
          let iteration = 0;
          const iterateHandlers = (newOptions) => {
            return defaults.handlers[iteration++](
              newOptions,
              iteration === defaults.handlers.length
                ? getPromiseOrStream
                : iterateHandlers
            );
          };
          // TODO: Remove this in Got 12.
          if (is_1.default.plainObject(url)) {
            const mergedOptions = {
              ...url,
              ...options,
            };
            core_1.setNonEnumerableProperties([url, options], mergedOptions);
            options = mergedOptions;
            url = undefined;
          }
          try {
            // Call `init` hooks
            let initHookError;
            try {
              callInitHooks(defaults.options.hooks.init, options);
              callInitHooks(
                (_a = options.hooks) === null || _a === void 0
                  ? void 0
                  : _a.init,
                options
              );
            } catch (error) {
              initHookError = error;
            }
            // Normalize options & call handlers
            const normalizedOptions = normalizeArguments(
              url,
              options,
              _defaults !== null && _defaults !== void 0
                ? _defaults
                : defaults.options
            );
            normalizedOptions[core_1.kIsNormalizedAlready] = true;
            if (initHookError) {
              throw new as_promise_1.RequestError(
                initHookError.message,
                initHookError,
                normalizedOptions
              );
            }
            return iterateHandlers(normalizedOptions);
          } catch (error) {
            if (options.isStream) {
              throw error;
            } else {
              return create_rejection_1.default(
                error,
                defaults.options.hooks.beforeError,
                (_b = options.hooks) === null || _b === void 0
                  ? void 0
                  : _b.beforeError
              );
            }
          }
        };
        got.extend = (...instancesOrOptions) => {
          const optionsArray = [defaults.options];
          let handlers = [...defaults._rawHandlers];
          let isMutableDefaults;
          for (const value of instancesOrOptions) {
            if (isGotInstance(value)) {
              optionsArray.push(value.defaults.options);
              handlers.push(...value.defaults._rawHandlers);
              isMutableDefaults = value.defaults.mutableDefaults;
            } else {
              optionsArray.push(value);
              if ('handlers' in value) {
                handlers.push(...value.handlers);
              }
              isMutableDefaults = value.mutableDefaults;
            }
          }
          handlers = handlers.filter(
            (handler) => handler !== exports.defaultHandler
          );
          if (handlers.length === 0) {
            handlers.push(exports.defaultHandler);
          }
          return create({
            options: mergeOptions(...optionsArray),
            handlers,
            mutableDefaults: Boolean(isMutableDefaults),
          });
        };
        // Pagination
        const paginateEach = async function* (url, options) {
          // TODO: Remove this `@ts-expect-error` when upgrading to TypeScript 4.
          // Error: Argument of type 'Merge<Options, PaginationOptions<T, R>> | undefined' is not assignable to parameter of type 'Options | undefined'.
          // @ts-expect-error
          let normalizedOptions = normalizeArguments(
            url,
            options,
            defaults.options
          );
          normalizedOptions.resolveBodyOnly = false;
          const pagination = normalizedOptions.pagination;
          if (!is_1.default.object(pagination)) {
            throw new TypeError('`options.pagination` must be implemented');
          }
          const all = [];
          let { countLimit } = pagination;
          let numberOfRequests = 0;
          while (numberOfRequests < pagination.requestLimit) {
            if (numberOfRequests !== 0) {
              // eslint-disable-next-line no-await-in-loop
              await delay(pagination.backoff);
            }
            // @ts-expect-error FIXME!
            // TODO: Throw when result is not an instance of Response
            // eslint-disable-next-line no-await-in-loop
            const result = await got(undefined, undefined, normalizedOptions);
            // eslint-disable-next-line no-await-in-loop
            const parsed = await pagination.transform(result);
            const current = [];
            for (const item of parsed) {
              if (pagination.filter(item, all, current)) {
                if (!pagination.shouldContinue(item, all, current)) {
                  return;
                }
                yield item;
                if (pagination.stackAllItems) {
                  all.push(item);
                }
                current.push(item);
                if (--countLimit <= 0) {
                  return;
                }
              }
            }
            const optionsToMerge = pagination.paginate(result, all, current);
            if (optionsToMerge === false) {
              return;
            }
            if (optionsToMerge === result.request.options) {
              normalizedOptions = result.request.options;
            } else if (optionsToMerge !== undefined) {
              normalizedOptions = normalizeArguments(
                undefined,
                optionsToMerge,
                normalizedOptions
              );
            }
            numberOfRequests++;
          }
        };
        got.paginate = paginateEach;
        got.paginate.all = async (url, options) => {
          const results = [];
          for await (const item of paginateEach(url, options)) {
            results.push(item);
          }
          return results;
        };
        // For those who like very descriptive names
        got.paginate.each = paginateEach;
        // Stream API
        got.stream = (url, options) => got(url, { ...options, isStream: true });
        // Shortcuts
        for (const method of aliases) {
          got[method] = (url, options) => got(url, { ...options, method });
          got.stream[method] = (url, options) => {
            return got(url, { ...options, method, isStream: true });
          };
        }
        Object.assign(got, errors);
        Object.defineProperty(got, 'defaults', {
          value: defaults.mutableDefaults
            ? defaults
            : deep_freeze_1.default(defaults),
          writable: defaults.mutableDefaults,
          configurable: defaults.mutableDefaults,
          enumerable: true,
        });
        got.mergeOptions = mergeOptions;
        return got;
      };
      exports['default'] = create;
      __exportStar(__nccwpck_require__(2613), exports);

      /***/
    },

    /***/ 3061: /***/ function (module, exports, __nccwpck_require__) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __exportStar =
        (this && this.__exportStar) ||
        function (m, exports) {
          for (var p in m)
            if (
              p !== 'default' &&
              !Object.prototype.hasOwnProperty.call(exports, p)
            )
              __createBinding(exports, m, p);
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      const url_1 = __nccwpck_require__(7310);
      const create_1 = __nccwpck_require__(4337);
      const defaults = {
        options: {
          method: 'GET',
          retry: {
            limit: 2,
            methods: ['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE'],
            statusCodes: [408, 413, 429, 500, 502, 503, 504, 521, 522, 524],
            errorCodes: [
              'ETIMEDOUT',
              'ECONNRESET',
              'EADDRINUSE',
              'ECONNREFUSED',
              'EPIPE',
              'ENOTFOUND',
              'ENETUNREACH',
              'EAI_AGAIN',
            ],
            maxRetryAfter: undefined,
            calculateDelay: ({ computedValue }) => computedValue,
          },
          timeout: {},
          headers: {
            'user-agent': 'got (https://github.com/sindresorhus/got)',
          },
          hooks: {
            init: [],
            beforeRequest: [],
            beforeRedirect: [],
            beforeRetry: [],
            beforeError: [],
            afterResponse: [],
          },
          cache: undefined,
          dnsCache: undefined,
          decompress: true,
          throwHttpErrors: true,
          followRedirect: true,
          isStream: false,
          responseType: 'text',
          resolveBodyOnly: false,
          maxRedirects: 10,
          prefixUrl: '',
          methodRewriting: true,
          ignoreInvalidCookies: false,
          context: {},
          // TODO: Set this to `true` when Got 12 gets released
          http2: false,
          allowGetBody: false,
          https: undefined,
          pagination: {
            transform: (response) => {
              if (response.request.options.responseType === 'json') {
                return response.body;
              }
              return JSON.parse(response.body);
            },
            paginate: (response) => {
              if (!Reflect.has(response.headers, 'link')) {
                return false;
              }
              const items = response.headers.link.split(',');
              let next;
              for (const item of items) {
                const parsed = item.split(';');
                if (parsed[1].includes('next')) {
                  next = parsed[0].trimStart().trim();
                  next = next.slice(1, -1);
                  break;
                }
              }
              if (next) {
                const options = {
                  url: new url_1.URL(next),
                };
                return options;
              }
              return false;
            },
            filter: () => true,
            shouldContinue: () => true,
            countLimit: Infinity,
            backoff: 0,
            requestLimit: 10000,
            stackAllItems: true,
          },
          parseJson: (text) => JSON.parse(text),
          stringifyJson: (object) => JSON.stringify(object),
          cacheOptions: {},
        },
        handlers: [create_1.defaultHandler],
        mutableDefaults: false,
      };
      const got = create_1.default(defaults);
      exports['default'] = got;
      // For CommonJS default export support
      module.exports = got;
      module.exports['default'] = got;
      module.exports.__esModule = true; // Workaround for TS issue: https://github.com/sindresorhus/got/pull/1267
      __exportStar(__nccwpck_require__(4337), exports);
      __exportStar(__nccwpck_require__(6056), exports);

      /***/
    },

    /***/ 2613: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      /***/
    },

    /***/ 285: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const is_1 = __nccwpck_require__(7678);
      function deepFreeze(object) {
        for (const value of Object.values(object)) {
          if (is_1.default.plainObject(value) || is_1.default.array(value)) {
            deepFreeze(value);
          }
        }
        return Object.freeze(object);
      }
      exports['default'] = deepFreeze;

      /***/
    },

    /***/ 397: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      const alreadyWarned = new Set();
      exports['default'] = (message) => {
        if (alreadyWarned.has(message)) {
          return;
        }
        alreadyWarned.add(message);
        // @ts-expect-error Missing types.
        process.emitWarning(`Got: ${message}`, {
          type: 'DeprecationWarning',
        });
      };

      /***/
    },

    /***/ 1002: /***/ (module) => {
      'use strict';

      // rfc7231 6.1
      const statusCodeCacheableByDefault = new Set([
        200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501,
      ]);

      // This implementation does not understand partial responses (206)
      const understoodStatuses = new Set([
        200, 203, 204, 300, 301, 302, 303, 307, 308, 404, 405, 410, 414, 501,
      ]);

      const errorStatusCodes = new Set([500, 502, 503, 504]);

      const hopByHopHeaders = {
        date: true, // included, because we add Age update Date
        connection: true,
        'keep-alive': true,
        'proxy-authenticate': true,
        'proxy-authorization': true,
        te: true,
        trailer: true,
        'transfer-encoding': true,
        upgrade: true,
      };

      const excludedFromRevalidationUpdate = {
        // Since the old body is reused, it doesn't make sense to change properties of the body
        'content-length': true,
        'content-encoding': true,
        'transfer-encoding': true,
        'content-range': true,
      };

      function toNumberOrZero(s) {
        const n = parseInt(s, 10);
        return isFinite(n) ? n : 0;
      }

      // RFC 5861
      function isErrorResponse(response) {
        // consider undefined response as faulty
        if (!response) {
          return true;
        }
        return errorStatusCodes.has(response.status);
      }

      function parseCacheControl(header) {
        const cc = {};
        if (!header) return cc;

        // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
        // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
        const parts = header.trim().split(/\s*,\s*/); // TODO: lame parsing
        for (const part of parts) {
          const [k, v] = part.split(/\s*=\s*/, 2);
          cc[k] = v === undefined ? true : v.replace(/^"|"$/g, ''); // TODO: lame unquoting
        }

        return cc;
      }

      function formatCacheControl(cc) {
        let parts = [];
        for (const k in cc) {
          const v = cc[k];
          parts.push(v === true ? k : k + '=' + v);
        }
        if (!parts.length) {
          return undefined;
        }
        return parts.join(', ');
      }

      module.exports = class CachePolicy {
        constructor(
          req,
          res,
          {
            shared,
            cacheHeuristic,
            immutableMinTimeToLive,
            ignoreCargoCult,
            _fromObject,
          } = {}
        ) {
          if (_fromObject) {
            this._fromObject(_fromObject);
            return;
          }

          if (!res || !res.headers) {
            throw Error('Response headers missing');
          }
          this._assertRequestHasHeaders(req);

          this._responseTime = this.now();
          this._isShared = shared !== false;
          this._cacheHeuristic =
            undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
          this._immutableMinTtl =
            undefined !== immutableMinTimeToLive
              ? immutableMinTimeToLive
              : 24 * 3600 * 1000;

          this._status = 'status' in res ? res.status : 200;
          this._resHeaders = res.headers;
          this._rescc = parseCacheControl(res.headers['cache-control']);
          this._method = 'method' in req ? req.method : 'GET';
          this._url = req.url;
          this._host = req.headers.host;
          this._noAuthorization = !req.headers.authorization;
          this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
          this._reqcc = parseCacheControl(req.headers['cache-control']);

          // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
          // so there's no point stricly adhering to the blindly copy&pasted directives.
          if (
            ignoreCargoCult &&
            'pre-check' in this._rescc &&
            'post-check' in this._rescc
          ) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, {
              'cache-control': formatCacheControl(this._rescc),
            });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
          }

          // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
          // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
          if (
            res.headers['cache-control'] == null &&
            /no-cache/.test(res.headers.pragma)
          ) {
            this._rescc['no-cache'] = true;
          }
        }

        now() {
          return Date.now();
        }

        storable() {
          // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
          return !!(
            !this._reqcc['no-store'] &&
            // A cache MUST NOT store a response to any request, unless:
            // The request method is understood by the cache and defined as being cacheable, and
            ('GET' === this._method ||
              'HEAD' === this._method ||
              ('POST' === this._method && this._hasExplicitExpiration())) &&
            // the response status code is understood by the cache, and
            understoodStatuses.has(this._status) &&
            // the "no-store" cache directive does not appear in request or response header fields, and
            !this._rescc['no-store'] &&
            // the "private" response directive does not appear in the response, if the cache is shared, and
            (!this._isShared || !this._rescc.private) &&
            // the Authorization header field does not appear in the request, if the cache is shared,
            (!this._isShared ||
              this._noAuthorization ||
              this._allowsStoringAuthenticated()) &&
            // the response either:
            // contains an Expires header field, or
            (this._resHeaders.expires ||
              // contains a max-age response directive, or
              // contains a s-maxage response directive and the cache is shared, or
              // contains a public response directive.
              this._rescc['max-age'] ||
              (this._isShared && this._rescc['s-maxage']) ||
              this._rescc.public ||
              // has a status code that is defined as cacheable by default
              statusCodeCacheableByDefault.has(this._status))
          );
        }

        _hasExplicitExpiration() {
          // 4.2.1 Calculating Freshness Lifetime
          return (
            (this._isShared && this._rescc['s-maxage']) ||
            this._rescc['max-age'] ||
            this._resHeaders.expires
          );
        }

        _assertRequestHasHeaders(req) {
          if (!req || !req.headers) {
            throw Error('Request headers missing');
          }
        }

        satisfiesWithoutRevalidation(req) {
          this._assertRequestHasHeaders(req);

          // When presented with a request, a cache MUST NOT reuse a stored response, unless:
          // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
          // unless the stored response is successfully validated (Section 4.3), and
          const requestCC = parseCacheControl(req.headers['cache-control']);
          if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return false;
          }

          if (requestCC['max-age'] && this.age() > requestCC['max-age']) {
            return false;
          }

          if (
            requestCC['min-fresh'] &&
            this.timeToLive() < 1000 * requestCC['min-fresh']
          ) {
            return false;
          }

          // the stored response is either:
          // fresh, or allowed to be served stale
          if (this.stale()) {
            const allowsStale =
              requestCC['max-stale'] &&
              !this._rescc['must-revalidate'] &&
              (true === requestCC['max-stale'] ||
                requestCC['max-stale'] > this.age() - this.maxAge());
            if (!allowsStale) {
              return false;
            }
          }

          return this._requestMatches(req, false);
        }

        _requestMatches(req, allowHeadMethod) {
          // The presented effective request URI and that of the stored response match, and
          return (
            (!this._url || this._url === req.url) &&
            this._host === req.headers.host &&
            // the request method associated with the stored response allows it to be used for the presented request, and
            (!req.method ||
              this._method === req.method ||
              (allowHeadMethod && 'HEAD' === req.method)) &&
            // selecting header fields nominated by the stored response (if any) match those presented, and
            this._varyMatches(req)
          );
        }

        _allowsStoringAuthenticated() {
          //  following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
          return (
            this._rescc['must-revalidate'] ||
            this._rescc.public ||
            this._rescc['s-maxage']
          );
        }

        _varyMatches(req) {
          if (!this._resHeaders.vary) {
            return true;
          }

          // A Vary header field-value of "*" always fails to match
          if (this._resHeaders.vary === '*') {
            return false;
          }

          const fields = this._resHeaders.vary
            .trim()
            .toLowerCase()
            .split(/\s*,\s*/);
          for (const name of fields) {
            if (req.headers[name] !== this._reqHeaders[name]) return false;
          }
          return true;
        }

        _copyWithoutHopByHopHeaders(inHeaders) {
          const headers = {};
          for (const name in inHeaders) {
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
          }
          // 9.1.  Connection
          if (inHeaders.connection) {
            const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (const name of tokens) {
              delete headers[name];
            }
          }
          if (headers.warning) {
            const warnings = headers.warning.split(/,/).filter((warning) => {
              return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
              delete headers.warning;
            } else {
              headers.warning = warnings.join(',').trim();
            }
          }
          return headers;
        }

        responseHeaders() {
          const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
          const age = this.age();

          // A cache SHOULD generate 113 warning if it heuristically chose a freshness
          // lifetime greater than 24 hours and the response's age is greater than 24 hours.
          if (
            age > 3600 * 24 &&
            !this._hasExplicitExpiration() &&
            this.maxAge() > 3600 * 24
          ) {
            headers.warning =
              (headers.warning ? `${headers.warning}, ` : '') +
              '113 - "rfc7234 5.5.4"';
          }
          headers.age = `${Math.round(age)}`;
          headers.date = new Date(this.now()).toUTCString();
          return headers;
        }

        /**
         * Value of the Date response header or current time if Date was invalid
         * @return timestamp
         */
        date() {
          const serverDate = Date.parse(this._resHeaders.date);
          if (isFinite(serverDate)) {
            return serverDate;
          }
          return this._responseTime;
        }

        /**
         * Value of the Age header, in seconds, updated for the current time.
         * May be fractional.
         *
         * @return Number
         */
        age() {
          let age = this._ageValue();

          const residentTime = (this.now() - this._responseTime) / 1000;
          return age + residentTime;
        }

        _ageValue() {
          return toNumberOrZero(this._resHeaders.age);
        }

        /**
         * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
         *
         * For an up-to-date value, see `timeToLive()`.
         *
         * @return Number
         */
        maxAge() {
          if (!this.storable() || this._rescc['no-cache']) {
            return 0;
          }

          // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
          // so this implementation requires explicit opt-in via public header
          if (
            this._isShared &&
            this._resHeaders['set-cookie'] &&
            !this._rescc.public &&
            !this._rescc.immutable
          ) {
            return 0;
          }

          if (this._resHeaders.vary === '*') {
            return 0;
          }

          if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
              return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
              return toNumberOrZero(this._rescc['s-maxage']);
            }
          }

          // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
          if (this._rescc['max-age']) {
            return toNumberOrZero(this._rescc['max-age']);
          }

          const defaultMinTtl = this._rescc.immutable
            ? this._immutableMinTtl
            : 0;

          const serverDate = this.date();
          if (this._resHeaders.expires) {
            const expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < serverDate) {
              return 0;
            }
            return Math.max(defaultMinTtl, (expires - serverDate) / 1000);
          }

          if (this._resHeaders['last-modified']) {
            const lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && serverDate > lastModified) {
              return Math.max(
                defaultMinTtl,
                ((serverDate - lastModified) / 1000) * this._cacheHeuristic
              );
            }
          }

          return defaultMinTtl;
        }

        timeToLive() {
          const age = this.maxAge() - this.age();
          const staleIfErrorAge =
            age + toNumberOrZero(this._rescc['stale-if-error']);
          const staleWhileRevalidateAge =
            age + toNumberOrZero(this._rescc['stale-while-revalidate']);
          return (
            Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1000
          );
        }

        stale() {
          return this.maxAge() <= this.age();
        }

        _useStaleIfError() {
          return (
            this.maxAge() + toNumberOrZero(this._rescc['stale-if-error']) >
            this.age()
          );
        }

        useStaleWhileRevalidate() {
          return (
            this.maxAge() +
              toNumberOrZero(this._rescc['stale-while-revalidate']) >
            this.age()
          );
        }

        static fromObject(obj) {
          return new this(undefined, undefined, { _fromObject: obj });
        }

        _fromObject(obj) {
          if (this._responseTime) throw Error('Reinitialized');
          if (!obj || obj.v !== 1) throw Error('Invalid serialization');

          this._responseTime = obj.t;
          this._isShared = obj.sh;
          this._cacheHeuristic = obj.ch;
          this._immutableMinTtl =
            obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
          this._status = obj.st;
          this._resHeaders = obj.resh;
          this._rescc = obj.rescc;
          this._method = obj.m;
          this._url = obj.u;
          this._host = obj.h;
          this._noAuthorization = obj.a;
          this._reqHeaders = obj.reqh;
          this._reqcc = obj.reqcc;
        }

        toObject() {
          return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc,
          };
        }

        /**
         * Headers for sending to the origin server to revalidate stale response.
         * Allows server to return 304 to allow reuse of the previous response.
         *
         * Hop by hop headers are always stripped.
         * Revalidation headers may be added or removed, depending on request.
         */
        revalidationHeaders(incomingReq) {
          this._assertRequestHasHeaders(incomingReq);
          const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);

          // This implementation does not understand range requests
          delete headers['if-range'];

          if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
          }

          /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */
          if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match']
              ? `${headers['if-none-match']}, ${this._resHeaders.etag}`
              : this._resHeaders.etag;
          }

          // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
          const forbidsWeakValidators =
            headers['accept-ranges'] ||
            headers['if-match'] ||
            headers['if-unmodified-since'] ||
            (this._method && this._method != 'GET');

          /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */
          if (forbidsWeakValidators) {
            delete headers['if-modified-since'];

            if (headers['if-none-match']) {
              const etags = headers['if-none-match']
                .split(/,/)
                .filter((etag) => {
                  return !/^\s*W\//.test(etag);
                });
              if (!etags.length) {
                delete headers['if-none-match'];
              } else {
                headers['if-none-match'] = etags.join(',').trim();
              }
            }
          } else if (
            this._resHeaders['last-modified'] &&
            !headers['if-modified-since']
          ) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
          }

          return headers;
        }

        /**
         * Creates new CachePolicy with information combined from the previews response,
         * and the new revalidation response.
         *
         * Returns {policy, modified} where modified is a boolean indicating
         * whether the response body has been modified, and old cached body can't be used.
         *
         * @return {Object} {policy: CachePolicy, modified: Boolean}
         */
        revalidatedPolicy(request, response) {
          this._assertRequestHasHeaders(request);
          if (this._useStaleIfError() && isErrorResponse(response)) {
            // I consider the revalidation request unsuccessful
            return {
              modified: false,
              matches: false,
              policy: this,
            };
          }
          if (!response || !response.headers) {
            throw Error('Response headers missing');
          }

          // These aren't going to be supported exactly, since one CachePolicy object
          // doesn't know about all the other cached objects.
          let matches = false;
          if (response.status !== undefined && response.status != 304) {
            matches = false;
          } else if (
            response.headers.etag &&
            !/^\s*W\//.test(response.headers.etag)
          ) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches =
              this._resHeaders.etag &&
              this._resHeaders.etag.replace(/^\s*W\//, '') ===
                response.headers.etag;
          } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches =
              this._resHeaders.etag.replace(/^\s*W\//, '') ===
              response.headers.etag.replace(/^\s*W\//, '');
          } else if (this._resHeaders['last-modified']) {
            matches =
              this._resHeaders['last-modified'] ===
              response.headers['last-modified'];
          } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (
              !this._resHeaders.etag &&
              !this._resHeaders['last-modified'] &&
              !response.headers.etag &&
              !response.headers['last-modified']
            ) {
              matches = true;
            }
          }

          if (!matches) {
            return {
              policy: new this.constructor(request, response),
              // Client receiving 304 without body, even if it's invalid/mismatched has no option
              // but to reuse a cached body. We don't have a good way to tell clients to do
              // error recovery in such case.
              modified: response.status != 304,
              matches: false,
            };
          }

          // use other header fields provided in the 304 (Not Modified) response to replace all instances
          // of the corresponding header fields in the stored response.
          const headers = {};
          for (const k in this._resHeaders) {
            headers[k] =
              k in response.headers && !excludedFromRevalidationUpdate[k]
                ? response.headers[k]
                : this._resHeaders[k];
          }

          const newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers,
          });
          return {
            policy: new this.constructor(request, newResponse, {
              shared: this._isShared,
              cacheHeuristic: this._cacheHeuristic,
              immutableMinTimeToLive: this._immutableMinTtl,
            }),
            modified: false,
            matches: true,
          };
        }
      };

      /***/
    },

    /***/ 9898: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const EventEmitter = __nccwpck_require__(2361);
      const tls = __nccwpck_require__(4404);
      const http2 = __nccwpck_require__(5158);
      const QuickLRU = __nccwpck_require__(9273);

      const kCurrentStreamsCount = Symbol('currentStreamsCount');
      const kRequest = Symbol('request');
      const kOriginSet = Symbol('cachedOriginSet');
      const kGracefullyClosing = Symbol('gracefullyClosing');

      const nameKeys = [
        // `http2.connect()` options
        'maxDeflateDynamicTableSize',
        'maxSessionMemory',
        'maxHeaderListPairs',
        'maxOutstandingPings',
        'maxReservedRemoteStreams',
        'maxSendHeaderBlockLength',
        'paddingStrategy',

        // `tls.connect()` options
        'localAddress',
        'path',
        'rejectUnauthorized',
        'minDHSize',

        // `tls.createSecureContext()` options
        'ca',
        'cert',
        'clientCertEngine',
        'ciphers',
        'key',
        'pfx',
        'servername',
        'minVersion',
        'maxVersion',
        'secureProtocol',
        'crl',
        'honorCipherOrder',
        'ecdhCurve',
        'dhparam',
        'secureOptions',
        'sessionIdContext',
      ];

      const getSortedIndex = (array, value, compare) => {
        let low = 0;
        let high = array.length;

        while (low < high) {
          const mid = (low + high) >>> 1;

          /* istanbul ignore next */
          if (compare(array[mid], value)) {
            // This never gets called because we use descending sort. Better to have this anyway.
            low = mid + 1;
          } else {
            high = mid;
          }
        }

        return low;
      };

      const compareSessions = (a, b) => {
        return (
          a.remoteSettings.maxConcurrentStreams >
          b.remoteSettings.maxConcurrentStreams
        );
      };

      // See https://tools.ietf.org/html/rfc8336
      const closeCoveredSessions = (where, session) => {
        // Clients SHOULD NOT emit new requests on any connection whose Origin
        // Set is a proper subset of another connection's Origin Set, and they
        // SHOULD close it once all outstanding requests are satisfied.
        for (const coveredSession of where) {
          if (
            // The set is a proper subset when its length is less than the other set.
            coveredSession[kOriginSet].length < session[kOriginSet].length &&
            // And the other set includes all elements of the subset.
            coveredSession[kOriginSet].every((origin) =>
              session[kOriginSet].includes(origin)
            ) &&
            // Makes sure that the session can handle all requests from the covered session.
            coveredSession[kCurrentStreamsCount] +
              session[kCurrentStreamsCount] <=
              session.remoteSettings.maxConcurrentStreams
          ) {
            // This allows pending requests to finish and prevents making new requests.
            gracefullyClose(coveredSession);
          }
        }
      };

      // This is basically inverted `closeCoveredSessions(...)`.
      const closeSessionIfCovered = (where, coveredSession) => {
        for (const session of where) {
          if (
            coveredSession[kOriginSet].length < session[kOriginSet].length &&
            coveredSession[kOriginSet].every((origin) =>
              session[kOriginSet].includes(origin)
            ) &&
            coveredSession[kCurrentStreamsCount] +
              session[kCurrentStreamsCount] <=
              session.remoteSettings.maxConcurrentStreams
          ) {
            gracefullyClose(coveredSession);
          }
        }
      };

      const getSessions = ({ agent, isFree }) => {
        const result = {};

        // eslint-disable-next-line guard-for-in
        for (const normalizedOptions in agent.sessions) {
          const sessions = agent.sessions[normalizedOptions];

          const filtered = sessions.filter((session) => {
            const result =
              session[Agent.kCurrentStreamsCount] <
              session.remoteSettings.maxConcurrentStreams;

            return isFree ? result : !result;
          });

          if (filtered.length !== 0) {
            result[normalizedOptions] = filtered;
          }
        }

        return result;
      };

      const gracefullyClose = (session) => {
        session[kGracefullyClosing] = true;

        if (session[kCurrentStreamsCount] === 0) {
          session.close();
        }
      };

      class Agent extends EventEmitter {
        constructor({
          timeout = 60000,
          maxSessions = Infinity,
          maxFreeSessions = 10,
          maxCachedTlsSessions = 100,
        } = {}) {
          super();

          // A session is considered busy when its current streams count
          // is equal to or greater than the `maxConcurrentStreams` value.

          // A session is considered free when its current streams count
          // is less than the `maxConcurrentStreams` value.

          // SESSIONS[NORMALIZED_OPTIONS] = [];
          this.sessions = {};

          // The queue for creating new sessions. It looks like this:
          // QUEUE[NORMALIZED_OPTIONS][NORMALIZED_ORIGIN] = ENTRY_FUNCTION
          //
          // The entry function has `listeners`, `completed` and `destroyed` properties.
          // `listeners` is an array of objects containing `resolve` and `reject` functions.
          // `completed` is a boolean. It's set to true after ENTRY_FUNCTION is executed.
          // `destroyed` is a boolean. If it's set to true, the session will be destroyed if hasn't connected yet.
          this.queue = {};

          // Each session will use this timeout value.
          this.timeout = timeout;

          // Max sessions in total
          this.maxSessions = maxSessions;

          // Max free sessions in total
          // TODO: decreasing `maxFreeSessions` should close some sessions
          this.maxFreeSessions = maxFreeSessions;

          this._freeSessionsCount = 0;
          this._sessionsCount = 0;

          // We don't support push streams by default.
          this.settings = {
            enablePush: false,
          };

          // Reusing TLS sessions increases performance.
          this.tlsSessionCache = new QuickLRU({
            maxSize: maxCachedTlsSessions,
          });
        }

        static normalizeOrigin(url, servername) {
          if (typeof url === 'string') {
            url = new URL(url);
          }

          if (servername && url.hostname !== servername) {
            url.hostname = servername;
          }

          return url.origin;
        }

        normalizeOptions(options) {
          let normalized = '';

          if (options) {
            for (const key of nameKeys) {
              if (options[key]) {
                normalized += `:${options[key]}`;
              }
            }
          }

          return normalized;
        }

        _tryToCreateNewSession(normalizedOptions, normalizedOrigin) {
          if (
            !(normalizedOptions in this.queue) ||
            !(normalizedOrigin in this.queue[normalizedOptions])
          ) {
            return;
          }

          const item = this.queue[normalizedOptions][normalizedOrigin];

          // The entry function can be run only once.
          // BUG: The session may be never created when:
          // - the first condition is false AND
          // - this function is never called with the same arguments in the future.
          if (this._sessionsCount < this.maxSessions && !item.completed) {
            item.completed = true;

            item();
          }
        }

        getSession(origin, options, listeners) {
          return new Promise((resolve, reject) => {
            if (Array.isArray(listeners)) {
              listeners = [...listeners];

              // Resolve the current promise ASAP, we're just moving the listeners.
              // They will be executed at a different time.
              resolve();
            } else {
              listeners = [{ resolve, reject }];
            }

            const normalizedOptions = this.normalizeOptions(options);
            const normalizedOrigin = Agent.normalizeOrigin(
              origin,
              options && options.servername
            );

            if (normalizedOrigin === undefined) {
              for (const { reject } of listeners) {
                reject(
                  new TypeError(
                    'The `origin` argument needs to be a string or an URL object'
                  )
                );
              }

              return;
            }

            if (normalizedOptions in this.sessions) {
              const sessions = this.sessions[normalizedOptions];

              let maxConcurrentStreams = -1;
              let currentStreamsCount = -1;
              let optimalSession;

              // We could just do this.sessions[normalizedOptions].find(...) but that isn't optimal.
              // Additionally, we are looking for session which has biggest current pending streams count.
              for (const session of sessions) {
                const sessionMaxConcurrentStreams =
                  session.remoteSettings.maxConcurrentStreams;

                if (sessionMaxConcurrentStreams < maxConcurrentStreams) {
                  break;
                }

                if (session[kOriginSet].includes(normalizedOrigin)) {
                  const sessionCurrentStreamsCount =
                    session[kCurrentStreamsCount];

                  if (
                    sessionCurrentStreamsCount >= sessionMaxConcurrentStreams ||
                    session[kGracefullyClosing] ||
                    // Unfortunately the `close` event isn't called immediately,
                    // so `session.destroyed` is `true`, but `session.closed` is `false`.
                    session.destroyed
                  ) {
                    continue;
                  }

                  // We only need set this once.
                  if (!optimalSession) {
                    maxConcurrentStreams = sessionMaxConcurrentStreams;
                  }

                  // We're looking for the session which has biggest current pending stream count,
                  // in order to minimalize the amount of active sessions.
                  if (sessionCurrentStreamsCount > currentStreamsCount) {
                    optimalSession = session;
                    currentStreamsCount = sessionCurrentStreamsCount;
                  }
                }
              }

              if (optimalSession) {
                /* istanbul ignore next: safety check */
                if (listeners.length !== 1) {
                  for (const { reject } of listeners) {
                    const error = new Error(
                      `Expected the length of listeners to be 1, got ${listeners.length}.\n` +
                        'Please report this to https://github.com/szmarczak/http2-wrapper/'
                    );

                    reject(error);
                  }

                  return;
                }

                listeners[0].resolve(optimalSession);
                return;
              }
            }

            if (normalizedOptions in this.queue) {
              if (normalizedOrigin in this.queue[normalizedOptions]) {
                // There's already an item in the queue, just attach ourselves to it.
                this.queue[normalizedOptions][normalizedOrigin].listeners.push(
                  ...listeners
                );

                // This shouldn't be executed here.
                // See the comment inside _tryToCreateNewSession.
                this._tryToCreateNewSession(
                  normalizedOptions,
                  normalizedOrigin
                );
                return;
              }
            } else {
              this.queue[normalizedOptions] = {};
            }

            // The entry must be removed from the queue IMMEDIATELY when:
            // 1. the session connects successfully,
            // 2. an error occurs.
            const removeFromQueue = () => {
              // Our entry can be replaced. We cannot remove the new one.
              if (
                normalizedOptions in this.queue &&
                this.queue[normalizedOptions][normalizedOrigin] === entry
              ) {
                delete this.queue[normalizedOptions][normalizedOrigin];

                if (Object.keys(this.queue[normalizedOptions]).length === 0) {
                  delete this.queue[normalizedOptions];
                }
              }
            };

            // The main logic is here
            const entry = () => {
              const name = `${normalizedOrigin}:${normalizedOptions}`;
              let receivedSettings = false;

              try {
                const session = http2.connect(origin, {
                  createConnection: this.createConnection,
                  settings: this.settings,
                  session: this.tlsSessionCache.get(name),
                  ...options,
                });
                session[kCurrentStreamsCount] = 0;
                session[kGracefullyClosing] = false;

                const isFree = () =>
                  session[kCurrentStreamsCount] <
                  session.remoteSettings.maxConcurrentStreams;
                let wasFree = true;

                session.socket.once('session', (tlsSession) => {
                  this.tlsSessionCache.set(name, tlsSession);
                });

                session.once('error', (error) => {
                  // Listeners are empty when the session successfully connected.
                  for (const { reject } of listeners) {
                    reject(error);
                  }

                  // The connection got broken, purge the cache.
                  this.tlsSessionCache.delete(name);
                });

                session.setTimeout(this.timeout, () => {
                  // Terminates all streams owned by this session.
                  // TODO: Maybe the streams should have a "Session timed out" error?
                  session.destroy();
                });

                session.once('close', () => {
                  if (receivedSettings) {
                    // 1. If it wasn't free then no need to decrease because
                    //    it has been decreased already in session.request().
                    // 2. `stream.once('close')` won't increment the count
                    //    because the session is already closed.
                    if (wasFree) {
                      this._freeSessionsCount--;
                    }

                    this._sessionsCount--;

                    // This cannot be moved to the stream logic,
                    // because there may be a session that hadn't made a single request.
                    const where = this.sessions[normalizedOptions];
                    where.splice(where.indexOf(session), 1);

                    if (where.length === 0) {
                      delete this.sessions[normalizedOptions];
                    }
                  } else {
                    // Broken connection
                    const error = new Error(
                      'Session closed without receiving a SETTINGS frame'
                    );
                    error.code = 'HTTP2WRAPPER_NOSETTINGS';

                    for (const { reject } of listeners) {
                      reject(error);
                    }

                    removeFromQueue();
                  }

                  // There may be another session awaiting.
                  this._tryToCreateNewSession(
                    normalizedOptions,
                    normalizedOrigin
                  );
                });

                // Iterates over the queue and processes listeners.
                const processListeners = () => {
                  if (!(normalizedOptions in this.queue) || !isFree()) {
                    return;
                  }

                  for (const origin of session[kOriginSet]) {
                    if (origin in this.queue[normalizedOptions]) {
                      const { listeners } =
                        this.queue[normalizedOptions][origin];

                      // Prevents session overloading.
                      while (listeners.length !== 0 && isFree()) {
                        // We assume `resolve(...)` calls `request(...)` *directly*,
                        // otherwise the session will get overloaded.
                        listeners.shift().resolve(session);
                      }

                      const where = this.queue[normalizedOptions];
                      if (where[origin].listeners.length === 0) {
                        delete where[origin];

                        if (Object.keys(where).length === 0) {
                          delete this.queue[normalizedOptions];
                          break;
                        }
                      }

                      // We're no longer free, no point in continuing.
                      if (!isFree()) {
                        break;
                      }
                    }
                  }
                };

                // The Origin Set cannot shrink. No need to check if it suddenly became covered by another one.
                session.on('origin', () => {
                  session[kOriginSet] = session.originSet;

                  if (!isFree()) {
                    // The session is full.
                    return;
                  }

                  processListeners();

                  // Close covered sessions (if possible).
                  closeCoveredSessions(
                    this.sessions[normalizedOptions],
                    session
                  );
                });

                session.once('remoteSettings', () => {
                  // Fix Node.js bug preventing the process from exiting
                  session.ref();
                  session.unref();

                  this._sessionsCount++;

                  // The Agent could have been destroyed already.
                  if (entry.destroyed) {
                    const error = new Error('Agent has been destroyed');

                    for (const listener of listeners) {
                      listener.reject(error);
                    }

                    session.destroy();
                    return;
                  }

                  session[kOriginSet] = session.originSet;

                  {
                    const where = this.sessions;

                    if (normalizedOptions in where) {
                      const sessions = where[normalizedOptions];
                      sessions.splice(
                        getSortedIndex(sessions, session, compareSessions),
                        0,
                        session
                      );
                    } else {
                      where[normalizedOptions] = [session];
                    }
                  }

                  this._freeSessionsCount += 1;
                  receivedSettings = true;

                  this.emit('session', session);

                  processListeners();
                  removeFromQueue();

                  // TODO: Close last recently used (or least used?) session
                  if (
                    session[kCurrentStreamsCount] === 0 &&
                    this._freeSessionsCount > this.maxFreeSessions
                  ) {
                    session.close();
                  }

                  // Check if we haven't managed to execute all listeners.
                  if (listeners.length !== 0) {
                    // Request for a new session with predefined listeners.
                    this.getSession(normalizedOrigin, options, listeners);
                    listeners.length = 0;
                  }

                  // `session.remoteSettings.maxConcurrentStreams` might get increased
                  session.on('remoteSettings', () => {
                    processListeners();

                    // In case the Origin Set changes
                    closeCoveredSessions(
                      this.sessions[normalizedOptions],
                      session
                    );
                  });
                });

                // Shim `session.request()` in order to catch all streams
                session[kRequest] = session.request;
                session.request = (headers, streamOptions) => {
                  if (session[kGracefullyClosing]) {
                    throw new Error(
                      'The session is gracefully closing. No new streams are allowed.'
                    );
                  }

                  const stream = session[kRequest](headers, streamOptions);

                  // The process won't exit until the session is closed or all requests are gone.
                  session.ref();

                  ++session[kCurrentStreamsCount];

                  if (
                    session[kCurrentStreamsCount] ===
                    session.remoteSettings.maxConcurrentStreams
                  ) {
                    this._freeSessionsCount--;
                  }

                  stream.once('close', () => {
                    wasFree = isFree();

                    --session[kCurrentStreamsCount];

                    if (!session.destroyed && !session.closed) {
                      closeSessionIfCovered(
                        this.sessions[normalizedOptions],
                        session
                      );

                      if (isFree() && !session.closed) {
                        if (!wasFree) {
                          this._freeSessionsCount++;

                          wasFree = true;
                        }

                        const isEmpty = session[kCurrentStreamsCount] === 0;

                        if (isEmpty) {
                          session.unref();
                        }

                        if (
                          isEmpty &&
                          (this._freeSessionsCount > this.maxFreeSessions ||
                            session[kGracefullyClosing])
                        ) {
                          session.close();
                        } else {
                          closeCoveredSessions(
                            this.sessions[normalizedOptions],
                            session
                          );
                          processListeners();
                        }
                      }
                    }
                  });

                  return stream;
                };
              } catch (error) {
                for (const listener of listeners) {
                  listener.reject(error);
                }

                removeFromQueue();
              }
            };

            entry.listeners = listeners;
            entry.completed = false;
            entry.destroyed = false;

            this.queue[normalizedOptions][normalizedOrigin] = entry;
            this._tryToCreateNewSession(normalizedOptions, normalizedOrigin);
          });
        }

        request(origin, options, headers, streamOptions) {
          return new Promise((resolve, reject) => {
            this.getSession(origin, options, [
              {
                reject,
                resolve: (session) => {
                  try {
                    resolve(session.request(headers, streamOptions));
                  } catch (error) {
                    reject(error);
                  }
                },
              },
            ]);
          });
        }

        createConnection(origin, options) {
          return Agent.connect(origin, options);
        }

        static connect(origin, options) {
          options.ALPNProtocols = ['h2'];

          const port = origin.port || 443;
          const host = origin.hostname || origin.host;

          if (typeof options.servername === 'undefined') {
            options.servername = host;
          }

          return tls.connect(port, host, options);
        }

        closeFreeSessions() {
          for (const sessions of Object.values(this.sessions)) {
            for (const session of sessions) {
              if (session[kCurrentStreamsCount] === 0) {
                session.close();
              }
            }
          }
        }

        destroy(reason) {
          for (const sessions of Object.values(this.sessions)) {
            for (const session of sessions) {
              session.destroy(reason);
            }
          }

          for (const entriesOfAuthority of Object.values(this.queue)) {
            for (const entry of Object.values(entriesOfAuthority)) {
              entry.destroyed = true;
            }
          }

          // New requests should NOT attach to destroyed sessions
          this.queue = {};
        }

        get freeSessions() {
          return getSessions({ agent: this, isFree: true });
        }

        get busySessions() {
          return getSessions({ agent: this, isFree: false });
        }
      }

      Agent.kCurrentStreamsCount = kCurrentStreamsCount;
      Agent.kGracefullyClosing = kGracefullyClosing;

      module.exports = {
        Agent,
        globalAgent: new Agent(),
      };

      /***/
    },

    /***/ 7167: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const http = __nccwpck_require__(3685);
      const https = __nccwpck_require__(5687);
      const resolveALPN = __nccwpck_require__(6624);
      const QuickLRU = __nccwpck_require__(9273);
      const Http2ClientRequest = __nccwpck_require__(9632);
      const calculateServerName = __nccwpck_require__(1982);
      const urlToOptions = __nccwpck_require__(2686);

      const cache = new QuickLRU({ maxSize: 100 });
      const queue = new Map();

      const installSocket = (agent, socket, options) => {
        socket._httpMessage = { shouldKeepAlive: true };

        const onFree = () => {
          agent.emit('free', socket, options);
        };

        socket.on('free', onFree);

        const onClose = () => {
          agent.removeSocket(socket, options);
        };

        socket.on('close', onClose);

        const onRemove = () => {
          agent.removeSocket(socket, options);
          socket.off('close', onClose);
          socket.off('free', onFree);
          socket.off('agentRemove', onRemove);
        };

        socket.on('agentRemove', onRemove);

        agent.emit('free', socket, options);
      };

      const resolveProtocol = async (options) => {
        const name = `${options.host}:${
          options.port
        }:${options.ALPNProtocols.sort()}`;

        if (!cache.has(name)) {
          if (queue.has(name)) {
            const result = await queue.get(name);
            return result.alpnProtocol;
          }

          const { path, agent } = options;
          options.path = options.socketPath;

          const resultPromise = resolveALPN(options);
          queue.set(name, resultPromise);

          try {
            const { socket, alpnProtocol } = await resultPromise;
            cache.set(name, alpnProtocol);

            options.path = path;

            if (alpnProtocol === 'h2') {
              // https://github.com/nodejs/node/issues/33343
              socket.destroy();
            } else {
              const { globalAgent } = https;
              const defaultCreateConnection =
                https.Agent.prototype.createConnection;

              if (agent) {
                if (agent.createConnection === defaultCreateConnection) {
                  installSocket(agent, socket, options);
                } else {
                  socket.destroy();
                }
              } else if (
                globalAgent.createConnection === defaultCreateConnection
              ) {
                installSocket(globalAgent, socket, options);
              } else {
                socket.destroy();
              }
            }

            queue.delete(name);

            return alpnProtocol;
          } catch (error) {
            queue.delete(name);

            throw error;
          }
        }

        return cache.get(name);
      };

      module.exports = async (input, options, callback) => {
        if (typeof input === 'string' || input instanceof URL) {
          input = urlToOptions(new URL(input));
        }

        if (typeof options === 'function') {
          callback = options;
          options = undefined;
        }

        options = {
          ALPNProtocols: ['h2', 'http/1.1'],
          ...input,
          ...options,
          resolveSocket: true,
        };

        if (
          !Array.isArray(options.ALPNProtocols) ||
          options.ALPNProtocols.length === 0
        ) {
          throw new Error(
            'The `ALPNProtocols` option must be an Array with at least one entry'
          );
        }

        options.protocol = options.protocol || 'https:';
        const isHttps = options.protocol === 'https:';

        options.host = options.hostname || options.host || 'localhost';
        options.session = options.tlsSession;
        options.servername = options.servername || calculateServerName(options);
        options.port = options.port || (isHttps ? 443 : 80);
        options._defaultAgent = isHttps ? https.globalAgent : http.globalAgent;

        const agents = options.agent;

        if (agents) {
          if (agents.addRequest) {
            throw new Error(
              'The `options.agent` object can contain only `http`, `https` or `http2` properties'
            );
          }

          options.agent = agents[isHttps ? 'https' : 'http'];
        }

        if (isHttps) {
          const protocol = await resolveProtocol(options);

          if (protocol === 'h2') {
            if (agents) {
              options.agent = agents.http2;
            }

            return new Http2ClientRequest(options, callback);
          }
        }

        return http.request(options, callback);
      };

      module.exports.protocolCache = cache;

      /***/
    },

    /***/ 9632: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const http2 = __nccwpck_require__(5158);
      const { Writable } = __nccwpck_require__(2781);
      const { Agent, globalAgent } = __nccwpck_require__(9898);
      const IncomingMessage = __nccwpck_require__(2575);
      const urlToOptions = __nccwpck_require__(2686);
      const proxyEvents = __nccwpck_require__(1818);
      const isRequestPseudoHeader = __nccwpck_require__(1199);
      const {
        ERR_INVALID_ARG_TYPE,
        ERR_INVALID_PROTOCOL,
        ERR_HTTP_HEADERS_SENT,
        ERR_INVALID_HTTP_TOKEN,
        ERR_HTTP_INVALID_HEADER_VALUE,
        ERR_INVALID_CHAR,
      } = __nccwpck_require__(7087);

      const {
        HTTP2_HEADER_STATUS,
        HTTP2_HEADER_METHOD,
        HTTP2_HEADER_PATH,
        HTTP2_METHOD_CONNECT,
      } = http2.constants;

      const kHeaders = Symbol('headers');
      const kOrigin = Symbol('origin');
      const kSession = Symbol('session');
      const kOptions = Symbol('options');
      const kFlushedHeaders = Symbol('flushedHeaders');
      const kJobs = Symbol('jobs');

      const isValidHttpToken = /^[\^`\-\w!#$%&*+.|~]+$/;
      const isInvalidHeaderValue = /[^\t\u0020-\u007E\u0080-\u00FF]/;

      class ClientRequest extends Writable {
        constructor(input, options, callback) {
          super({
            autoDestroy: false,
          });

          const hasInput = typeof input === 'string' || input instanceof URL;
          if (hasInput) {
            input = urlToOptions(input instanceof URL ? input : new URL(input));
          }

          if (typeof options === 'function' || options === undefined) {
            // (options, callback)
            callback = options;
            options = hasInput ? input : { ...input };
          } else {
            // (input, options, callback)
            options = { ...input, ...options };
          }

          if (options.h2session) {
            this[kSession] = options.h2session;
          } else if (options.agent === false) {
            this.agent = new Agent({ maxFreeSessions: 0 });
          } else if (
            typeof options.agent === 'undefined' ||
            options.agent === null
          ) {
            if (typeof options.createConnection === 'function') {
              // This is a workaround - we don't have to create the session on our own.
              this.agent = new Agent({ maxFreeSessions: 0 });
              this.agent.createConnection = options.createConnection;
            } else {
              this.agent = globalAgent;
            }
          } else if (typeof options.agent.request === 'function') {
            this.agent = options.agent;
          } else {
            throw new ERR_INVALID_ARG_TYPE(
              'options.agent',
              ['Agent-like Object', 'undefined', 'false'],
              options.agent
            );
          }

          if (options.protocol && options.protocol !== 'https:') {
            throw new ERR_INVALID_PROTOCOL(options.protocol, 'https:');
          }

          const port =
            options.port ||
            options.defaultPort ||
            (this.agent && this.agent.defaultPort) ||
            443;
          const host = options.hostname || options.host || 'localhost';

          // Don't enforce the origin via options. It may be changed in an Agent.
          delete options.hostname;
          delete options.host;
          delete options.port;

          const { timeout } = options;
          options.timeout = undefined;

          this[kHeaders] = Object.create(null);
          this[kJobs] = [];

          this.socket = null;
          this.connection = null;

          this.method = options.method || 'GET';
          this.path = options.path;

          this.res = null;
          this.aborted = false;
          this.reusedSocket = false;

          if (options.headers) {
            for (const [header, value] of Object.entries(options.headers)) {
              this.setHeader(header, value);
            }
          }

          if (options.auth && !('authorization' in this[kHeaders])) {
            this[kHeaders].authorization =
              'Basic ' + Buffer.from(options.auth).toString('base64');
          }

          options.session = options.tlsSession;
          options.path = options.socketPath;

          this[kOptions] = options;

          // Clients that generate HTTP/2 requests directly SHOULD use the :authority pseudo-header field instead of the Host header field.
          if (port === 443) {
            this[kOrigin] = `https://${host}`;

            if (!(':authority' in this[kHeaders])) {
              this[kHeaders][':authority'] = host;
            }
          } else {
            this[kOrigin] = `https://${host}:${port}`;

            if (!(':authority' in this[kHeaders])) {
              this[kHeaders][':authority'] = `${host}:${port}`;
            }
          }

          if (timeout) {
            this.setTimeout(timeout);
          }

          if (callback) {
            this.once('response', callback);
          }

          this[kFlushedHeaders] = false;
        }

        get method() {
          return this[kHeaders][HTTP2_HEADER_METHOD];
        }

        set method(value) {
          if (value) {
            this[kHeaders][HTTP2_HEADER_METHOD] = value.toUpperCase();
          }
        }

        get path() {
          return this[kHeaders][HTTP2_HEADER_PATH];
        }

        set path(value) {
          if (value) {
            this[kHeaders][HTTP2_HEADER_PATH] = value;
          }
        }

        get _mustNotHaveABody() {
          return (
            this.method === 'GET' ||
            this.method === 'HEAD' ||
            this.method === 'DELETE'
          );
        }

        _write(chunk, encoding, callback) {
          // https://github.com/nodejs/node/blob/654df09ae0c5e17d1b52a900a545f0664d8c7627/lib/internal/http2/util.js#L148-L156
          if (this._mustNotHaveABody) {
            callback(
              new Error('The GET, HEAD and DELETE methods must NOT have a body')
            );
            /* istanbul ignore next: Node.js 12 throws directly */
            return;
          }

          this.flushHeaders();

          const callWrite = () =>
            this._request.write(chunk, encoding, callback);
          if (this._request) {
            callWrite();
          } else {
            this[kJobs].push(callWrite);
          }
        }

        _final(callback) {
          if (this.destroyed) {
            return;
          }

          this.flushHeaders();

          const callEnd = () => {
            // For GET, HEAD and DELETE
            if (this._mustNotHaveABody) {
              callback();
              return;
            }

            this._request.end(callback);
          };

          if (this._request) {
            callEnd();
          } else {
            this[kJobs].push(callEnd);
          }
        }

        abort() {
          if (this.res && this.res.complete) {
            return;
          }

          if (!this.aborted) {
            process.nextTick(() => this.emit('abort'));
          }

          this.aborted = true;

          this.destroy();
        }

        _destroy(error, callback) {
          if (this.res) {
            this.res._dump();
          }

          if (this._request) {
            this._request.destroy();
          }

          callback(error);
        }

        async flushHeaders() {
          if (this[kFlushedHeaders] || this.destroyed) {
            return;
          }

          this[kFlushedHeaders] = true;

          const isConnectMethod = this.method === HTTP2_METHOD_CONNECT;

          // The real magic is here
          const onStream = (stream) => {
            this._request = stream;

            if (this.destroyed) {
              stream.destroy();
              return;
            }

            // Forwards `timeout`, `continue`, `close` and `error` events to this instance.
            if (!isConnectMethod) {
              proxyEvents(stream, this, [
                'timeout',
                'continue',
                'close',
                'error',
              ]);
            }

            // Wait for the `finish` event. We don't want to emit the `response` event
            // before `request.end()` is called.
            const waitForEnd = (fn) => {
              return (...args) => {
                if (!this.writable && !this.destroyed) {
                  fn(...args);
                } else {
                  this.once('finish', () => {
                    fn(...args);
                  });
                }
              };
            };

            // This event tells we are ready to listen for the data.
            stream.once(
              'response',
              waitForEnd((headers, flags, rawHeaders) => {
                // If we were to emit raw request stream, it would be as fast as the native approach.
                // Note that wrapping the raw stream in a Proxy instance won't improve the performance (already tested it).
                const response = new IncomingMessage(
                  this.socket,
                  stream.readableHighWaterMark
                );
                this.res = response;

                response.req = this;
                response.statusCode = headers[HTTP2_HEADER_STATUS];
                response.headers = headers;
                response.rawHeaders = rawHeaders;

                response.once('end', () => {
                  if (this.aborted) {
                    response.aborted = true;
                    response.emit('aborted');
                  } else {
                    response.complete = true;

                    // Has no effect, just be consistent with the Node.js behavior
                    response.socket = null;
                    response.connection = null;
                  }
                });

                if (isConnectMethod) {
                  response.upgrade = true;

                  // The HTTP1 API says the socket is detached here,
                  // but we can't do that so we pass the original HTTP2 request.
                  if (this.emit('connect', response, stream, Buffer.alloc(0))) {
                    this.emit('close');
                  } else {
                    // No listeners attached, destroy the original request.
                    stream.destroy();
                  }
                } else {
                  // Forwards data
                  stream.on('data', (chunk) => {
                    if (!response._dumped && !response.push(chunk)) {
                      stream.pause();
                    }
                  });

                  stream.once('end', () => {
                    response.push(null);
                  });

                  if (!this.emit('response', response)) {
                    // No listeners attached, dump the response.
                    response._dump();
                  }
                }
              })
            );

            // Emits `information` event
            stream.once(
              'headers',
              waitForEnd((headers) =>
                this.emit('information', {
                  statusCode: headers[HTTP2_HEADER_STATUS],
                })
              )
            );

            stream.once(
              'trailers',
              waitForEnd((trailers, flags, rawTrailers) => {
                const { res } = this;

                // Assigns trailers to the response object.
                res.trailers = trailers;
                res.rawTrailers = rawTrailers;
              })
            );

            const { socket } = stream.session;
            this.socket = socket;
            this.connection = socket;

            for (const job of this[kJobs]) {
              job();
            }

            this.emit('socket', this.socket);
          };

          // Makes a HTTP2 request
          if (this[kSession]) {
            try {
              onStream(this[kSession].request(this[kHeaders]));
            } catch (error) {
              this.emit('error', error);
            }
          } else {
            this.reusedSocket = true;

            try {
              onStream(
                await this.agent.request(
                  this[kOrigin],
                  this[kOptions],
                  this[kHeaders]
                )
              );
            } catch (error) {
              this.emit('error', error);
            }
          }
        }

        getHeader(name) {
          if (typeof name !== 'string') {
            throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
          }

          return this[kHeaders][name.toLowerCase()];
        }

        get headersSent() {
          return this[kFlushedHeaders];
        }

        removeHeader(name) {
          if (typeof name !== 'string') {
            throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
          }

          if (this.headersSent) {
            throw new ERR_HTTP_HEADERS_SENT('remove');
          }

          delete this[kHeaders][name.toLowerCase()];
        }

        setHeader(name, value) {
          if (this.headersSent) {
            throw new ERR_HTTP_HEADERS_SENT('set');
          }

          if (
            typeof name !== 'string' ||
            (!isValidHttpToken.test(name) && !isRequestPseudoHeader(name))
          ) {
            throw new ERR_INVALID_HTTP_TOKEN('Header name', name);
          }

          if (typeof value === 'undefined') {
            throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name);
          }

          if (isInvalidHeaderValue.test(value)) {
            throw new ERR_INVALID_CHAR('header content', name);
          }

          this[kHeaders][name.toLowerCase()] = value;
        }

        setNoDelay() {
          // HTTP2 sockets cannot be malformed, do nothing.
        }

        setSocketKeepAlive() {
          // HTTP2 sockets cannot be malformed, do nothing.
        }

        setTimeout(ms, callback) {
          const applyTimeout = () => this._request.setTimeout(ms, callback);

          if (this._request) {
            applyTimeout();
          } else {
            this[kJobs].push(applyTimeout);
          }

          return this;
        }

        get maxHeadersCount() {
          if (!this.destroyed && this._request) {
            return this._request.session.localSettings.maxHeaderListSize;
          }

          return undefined;
        }

        set maxHeadersCount(_value) {
          // Updating HTTP2 settings would affect all requests, do nothing.
        }
      }

      module.exports = ClientRequest;

      /***/
    },

    /***/ 2575: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const { Readable } = __nccwpck_require__(2781);

      class IncomingMessage extends Readable {
        constructor(socket, highWaterMark) {
          super({
            highWaterMark,
            autoDestroy: false,
          });

          this.statusCode = null;
          this.statusMessage = '';
          this.httpVersion = '2.0';
          this.httpVersionMajor = 2;
          this.httpVersionMinor = 0;
          this.headers = {};
          this.trailers = {};
          this.req = null;

          this.aborted = false;
          this.complete = false;
          this.upgrade = null;

          this.rawHeaders = [];
          this.rawTrailers = [];

          this.socket = socket;
          this.connection = socket;

          this._dumped = false;
        }

        _destroy(error) {
          this.req._request.destroy(error);
        }

        setTimeout(ms, callback) {
          this.req.setTimeout(ms, callback);
          return this;
        }

        _dump() {
          if (!this._dumped) {
            this._dumped = true;

            this.removeAllListeners('data');
            this.resume();
          }
        }

        _read() {
          if (this.req) {
            this.req._request.resume();
          }
        }
      }

      module.exports = IncomingMessage;

      /***/
    },

    /***/ 4645: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const http2 = __nccwpck_require__(5158);
      const agent = __nccwpck_require__(9898);
      const ClientRequest = __nccwpck_require__(9632);
      const IncomingMessage = __nccwpck_require__(2575);
      const auto = __nccwpck_require__(7167);

      const request = (url, options, callback) => {
        return new ClientRequest(url, options, callback);
      };

      const get = (url, options, callback) => {
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const req = new ClientRequest(url, options, callback);
        req.end();

        return req;
      };

      module.exports = {
        ...http2,
        ClientRequest,
        IncomingMessage,
        ...agent,
        request,
        get,
        auto,
      };

      /***/
    },

    /***/ 1982: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const net = __nccwpck_require__(1808);
      /* istanbul ignore file: https://github.com/nodejs/node/blob/v13.0.1/lib/_http_agent.js */

      module.exports = (options) => {
        let servername = options.host;
        const hostHeader = options.headers && options.headers.host;

        if (hostHeader) {
          if (hostHeader.startsWith('[')) {
            const index = hostHeader.indexOf(']');
            if (index === -1) {
              servername = hostHeader;
            } else {
              servername = hostHeader.slice(1, -1);
            }
          } else {
            servername = hostHeader.split(':', 1)[0];
          }
        }

        if (net.isIP(servername)) {
          return '';
        }

        return servername;
      };

      /***/
    },

    /***/ 7087: /***/ (module) => {
      'use strict';

      /* istanbul ignore file: https://github.com/nodejs/node/blob/master/lib/internal/errors.js */

      const makeError = (Base, key, getMessage) => {
        module.exports[key] = class NodeError extends Base {
          constructor(...args) {
            super(
              typeof getMessage === 'string' ? getMessage : getMessage(args)
            );
            this.name = `${super.name} [${key}]`;
            this.code = key;
          }
        };
      };

      makeError(TypeError, 'ERR_INVALID_ARG_TYPE', (args) => {
        const type = args[0].includes('.') ? 'property' : 'argument';

        let valid = args[1];
        const isManyTypes = Array.isArray(valid);

        if (isManyTypes) {
          valid = `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}`;
        }

        return `The "${args[0]}" ${type} must be ${
          isManyTypes ? 'one of' : 'of'
        } type ${valid}. Received ${typeof args[2]}`;
      });

      makeError(TypeError, 'ERR_INVALID_PROTOCOL', (args) => {
        return `Protocol "${args[0]}" not supported. Expected "${args[1]}"`;
      });

      makeError(Error, 'ERR_HTTP_HEADERS_SENT', (args) => {
        return `Cannot ${args[0]} headers after they are sent to the client`;
      });

      makeError(TypeError, 'ERR_INVALID_HTTP_TOKEN', (args) => {
        return `${args[0]} must be a valid HTTP token [${args[1]}]`;
      });

      makeError(TypeError, 'ERR_HTTP_INVALID_HEADER_VALUE', (args) => {
        return `Invalid value "${args[0]} for header "${args[1]}"`;
      });

      makeError(TypeError, 'ERR_INVALID_CHAR', (args) => {
        return `Invalid character in ${args[0]} [${args[1]}]`;
      });

      /***/
    },

    /***/ 1199: /***/ (module) => {
      'use strict';

      module.exports = (header) => {
        switch (header) {
          case ':method':
          case ':scheme':
          case ':authority':
          case ':path':
            return true;
          default:
            return false;
        }
      };

      /***/
    },

    /***/ 1818: /***/ (module) => {
      'use strict';

      module.exports = (from, to, events) => {
        for (const event of events) {
          from.on(event, (...args) => to.emit(event, ...args));
        }
      };

      /***/
    },

    /***/ 2686: /***/ (module) => {
      'use strict';

      /* istanbul ignore file: https://github.com/nodejs/node/blob/a91293d4d9ab403046ab5eb022332e4e3d249bd3/lib/internal/url.js#L1257 */

      module.exports = (url) => {
        const options = {
          protocol: url.protocol,
          hostname:
            typeof url.hostname === 'string' && url.hostname.startsWith('[')
              ? url.hostname.slice(1, -1)
              : url.hostname,
          host: url.host,
          hash: url.hash,
          search: url.search,
          pathname: url.pathname,
          href: url.href,
          path: `${url.pathname || ''}${url.search || ''}`,
        };

        if (typeof url.port === 'string' && url.port.length !== 0) {
          options.port = Number(url.port);
        }

        if (url.username || url.password) {
          options.auth = `${url.username || ''}:${url.password || ''}`;
        }

        return options;
      };

      /***/
    },

    /***/ 2820: /***/ (__unused_webpack_module, exports) => {
      //TODO: handle reviver/dehydrate function like normal
      //and handle indentation, like normal.
      //if anyone needs this... please send pull request.

      exports.stringify = function stringify(o) {
        if ('undefined' == typeof o) return o;

        if (o && Buffer.isBuffer(o))
          return JSON.stringify(':base64:' + o.toString('base64'));

        if (o && o.toJSON) o = o.toJSON();

        if (o && 'object' === typeof o) {
          var s = '';
          var array = Array.isArray(o);
          s = array ? '[' : '{';
          var first = true;

          for (var k in o) {
            var ignore =
              'function' == typeof o[k] ||
              (!array && 'undefined' === typeof o[k]);
            if (Object.hasOwnProperty.call(o, k) && !ignore) {
              if (!first) s += ',';
              first = false;
              if (array) {
                if (o[k] == undefined) s += 'null';
                else s += stringify(o[k]);
              } else if (o[k] !== void 0) {
                s += stringify(k) + ':' + stringify(o[k]);
              }
            }
          }

          s += array ? ']' : '}';

          return s;
        } else if ('string' === typeof o) {
          return JSON.stringify(/^:/.test(o) ? ':' + o : o);
        } else if ('undefined' === typeof o) {
          return 'null';
        } else return JSON.stringify(o);
      };

      exports.parse = function (s) {
        return JSON.parse(s, function (key, value) {
          if ('string' === typeof value) {
            if (/^:base64:/.test(value))
              return Buffer.from(value.substring(8), 'base64');
            else return /^:/.test(value) ? value.substring(1) : value;
          }
          return value;
        });
      };

      /***/
    },

    /***/ 1531: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const EventEmitter = __nccwpck_require__(2361);
      const JSONB = __nccwpck_require__(2820);
      const compressBrotli = __nccwpck_require__(5728);

      const loadStore = (options) => {
        const adapters = {
          redis: '@keyv/redis',
          mongodb: '@keyv/mongo',
          mongo: '@keyv/mongo',
          sqlite: '@keyv/sqlite',
          postgresql: '@keyv/postgres',
          postgres: '@keyv/postgres',
          mysql: '@keyv/mysql',
          etcd: '@keyv/etcd',
        };
        if (options.adapter || options.uri) {
          const adapter = options.adapter || /^[^:]*/.exec(options.uri)[0];
          return new (require(adapters[adapter]))(options);
        }

        return new Map();
      };

      const iterableAdapters = [
        'sqlite',
        'postgres',
        'mysql',
        'mongo',
        'redis',
      ];

      class Keyv extends EventEmitter {
        constructor(uri, options) {
          super();
          this.opts = {
            namespace: 'keyv',
            serialize: JSONB.stringify,
            deserialize: JSONB.parse,
            ...(typeof uri === 'string' ? { uri } : uri),
            ...options,
          };

          if (!this.opts.store) {
            const adapterOptions = { ...this.opts };
            this.opts.store = loadStore(adapterOptions);
          }

          if (this.opts.compress) {
            const brotli = compressBrotli(this.opts.compress.opts);
            this.opts.serialize = async ({ value, expires }) =>
              brotli.serialize({
                value: await brotli.compress(value),
                expires,
              });
            this.opts.deserialize = async (data) => {
              const { value, expires } = brotli.deserialize(data);
              return { value: await brotli.decompress(value), expires };
            };
          }

          if (typeof this.opts.store.on === 'function') {
            this.opts.store.on('error', (error) => this.emit('error', error));
          }

          this.opts.store.namespace = this.opts.namespace;

          const generateIterator = (iterator) =>
            async function* () {
              for await (const [key, raw] of typeof iterator === 'function'
                ? iterator(this.opts.store.namespace)
                : iterator) {
                const data =
                  typeof raw === 'string' ? this.opts.deserialize(raw) : raw;
                if (
                  this.opts.store.namespace &&
                  !key.includes(this.opts.store.namespace)
                ) {
                  continue;
                }

                if (
                  typeof data.expires === 'number' &&
                  Date.now() > data.expires
                ) {
                  this.delete(key);
                  continue;
                }

                yield [this._getKeyUnprefix(key), data.value];
              }
            };

          // Attach iterators
          if (
            typeof this.opts.store[Symbol.iterator] === 'function' &&
            this.opts.store instanceof Map
          ) {
            this.iterator = generateIterator(this.opts.store);
          } else if (
            typeof this.opts.store.iterator === 'function' &&
            this.opts.store.opts &&
            this._checkIterableAdaptar()
          ) {
            this.iterator = generateIterator(
              this.opts.store.iterator.bind(this.opts.store)
            );
          }
        }

        _checkIterableAdaptar() {
          return (
            iterableAdapters.includes(this.opts.store.opts.dialect) ||
            iterableAdapters.findIndex((element) =>
              this.opts.store.opts.url.includes(element)
            ) >= 0
          );
        }

        _getKeyPrefix(key) {
          return `${this.opts.namespace}:${key}`;
        }

        _getKeyPrefixArray(keys) {
          return keys.map((key) => `${this.opts.namespace}:${key}`);
        }

        _getKeyUnprefix(key) {
          return this.opts.store.namespace
            ? key.split(':').splice(1).join(':')
            : key;
        }

        get(key, options) {
          const { store } = this.opts;
          const isArray = Array.isArray(key);
          const keyPrefixed = isArray
            ? this._getKeyPrefixArray(key)
            : this._getKeyPrefix(key);
          if (isArray && store.getMany === undefined) {
            const promises = [];
            for (const key of keyPrefixed) {
              promises.push(
                Promise.resolve()
                  .then(() => store.get(key))
                  .then((data) =>
                    typeof data === 'string'
                      ? this.opts.deserialize(data)
                      : data
                  )
                  .then((data) => {
                    if (data === undefined || data === null) {
                      return undefined;
                    }

                    if (
                      typeof data.expires === 'number' &&
                      Date.now() > data.expires
                    ) {
                      return this.delete(key).then(() => undefined);
                    }

                    return options && options.raw ? data : data.value;
                  })
              );
            }

            return Promise.allSettled(promises).then((values) => {
              const data = [];
              for (const value of values) {
                data.push(value.value);
              }

              return data.every((x) => x === undefined) ? [] : data;
            });
          }

          return Promise.resolve()
            .then(() =>
              isArray ? store.getMany(keyPrefixed) : store.get(keyPrefixed)
            )
            .then((data) =>
              typeof data === 'string' ? this.opts.deserialize(data) : data
            )
            .then((data) => {
              // Console.log('get', data);
              if (data === undefined || data === null) {
                return undefined;
              }

              if (isArray) {
                const result = [];
                if (data.length === 0) {
                  return [];
                }

                for (let row of data) {
                  if (typeof row === 'string') {
                    row = this.opts.deserialize(row);
                  }

                  if (row === undefined || row === null) {
                    result.push(undefined);
                    continue;
                  }

                  if (
                    typeof row.expires === 'number' &&
                    Date.now() > row.expires
                  ) {
                    this.delete(key).then(() => undefined);
                    result.push(undefined);
                  } else {
                    result.push(options && options.raw ? row : row.value);
                  }
                }

                return result.every((x) => x === undefined) ? [] : result;
              }

              if (
                typeof data.expires === 'number' &&
                Date.now() > data.expires
              ) {
                return this.delete(key).then(() => undefined);
              }

              return options && options.raw ? data : data.value;
            });
        }

        set(key, value, ttl) {
          const keyPrefixed = this._getKeyPrefix(key);
          if (typeof ttl === 'undefined') {
            ttl = this.opts.ttl;
          }

          if (ttl === 0) {
            ttl = undefined;
          }

          const { store } = this.opts;

          return Promise.resolve()
            .then(() => {
              const expires = typeof ttl === 'number' ? Date.now() + ttl : null;
              if (typeof value === 'symbol') {
                this.emit('error', 'symbol cannot be serialized');
              }

              value = { value, expires };
              return this.opts.serialize(value);
            })
            .then((value) => store.set(keyPrefixed, value, ttl))
            .then(() => true);
        }

        delete(key) {
          const { store } = this.opts;
          if (Array.isArray(key)) {
            const keyPrefixed = this._getKeyPrefixArray(key);
            if (store.deleteMany === undefined) {
              const promises = [];
              for (const key of keyPrefixed) {
                promises.push(store.delete(key));
              }

              return Promise.allSettled(promises).then((values) =>
                values.every((x) => x.value === true)
              );
            }

            return Promise.resolve().then(() => store.deleteMany(keyPrefixed));
          }

          const keyPrefixed = this._getKeyPrefix(key);
          return Promise.resolve().then(() => store.delete(keyPrefixed));
        }

        clear() {
          const { store } = this.opts;
          return Promise.resolve().then(() => store.clear());
        }

        has(key) {
          const keyPrefixed = this._getKeyPrefix(key);
          const { store } = this.opts;
          return Promise.resolve().then(async () => {
            if (typeof store.has === 'function') {
              return store.has(keyPrefixed);
            }

            const value = await store.get(keyPrefixed);
            return value !== undefined;
          });
        }
      }

      module.exports = Keyv;

      /***/
    },

    /***/ 9662: /***/ (module) => {
      'use strict';

      module.exports = (object) => {
        const result = {};

        for (const [key, value] of Object.entries(object)) {
          result[key.toLowerCase()] = value;
        }

        return result;
      };

      /***/
    },

    /***/ 2610: /***/ (module) => {
      'use strict';

      // We define these manually to ensure they're always copied
      // even if they would move up the prototype chain
      // https://nodejs.org/api/http.html#http_class_http_incomingmessage
      const knownProps = [
        'destroy',
        'setTimeout',
        'socket',
        'headers',
        'trailers',
        'rawHeaders',
        'statusCode',
        'httpVersion',
        'httpVersionMinor',
        'httpVersionMajor',
        'rawTrailers',
        'statusMessage',
      ];

      module.exports = (fromStream, toStream) => {
        const fromProps = new Set(Object.keys(fromStream).concat(knownProps));

        for (const prop of fromProps) {
          // Don't overwrite existing properties
          if (prop in toStream) {
            continue;
          }

          toStream[prop] =
            typeof fromStream[prop] === 'function'
              ? fromStream[prop].bind(fromStream)
              : fromStream[prop];
        }
      };

      /***/
    },

    /***/ 1223: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      var wrappy = __nccwpck_require__(2940);
      module.exports = wrappy(once);
      module.exports.strict = wrappy(onceStrict);

      once.proto = once(function () {
        Object.defineProperty(Function.prototype, 'once', {
          value: function () {
            return once(this);
          },
          configurable: true,
        });

        Object.defineProperty(Function.prototype, 'onceStrict', {
          value: function () {
            return onceStrict(this);
          },
          configurable: true,
        });
      });

      function once(fn) {
        var f = function () {
          if (f.called) return f.value;
          f.called = true;
          return (f.value = fn.apply(this, arguments));
        };
        f.called = false;
        return f;
      }

      function onceStrict(fn) {
        var f = function () {
          if (f.called) throw new Error(f.onceError);
          f.called = true;
          return (f.value = fn.apply(this, arguments));
        };
        var name = fn.name || 'Function wrapped with `once`';
        f.onceError = name + " shouldn't be called more than once";
        f.called = false;
        return f;
      }

      /***/
    },

    /***/ 9072: /***/ (module) => {
      'use strict';

      class CancelError extends Error {
        constructor(reason) {
          super(reason || 'Promise was canceled');
          this.name = 'CancelError';
        }

        get isCanceled() {
          return true;
        }
      }

      class PCancelable {
        static fn(userFn) {
          return (...arguments_) => {
            return new PCancelable((resolve, reject, onCancel) => {
              arguments_.push(onCancel);
              // eslint-disable-next-line promise/prefer-await-to-then
              userFn(...arguments_).then(resolve, reject);
            });
          };
        }

        constructor(executor) {
          this._cancelHandlers = [];
          this._isPending = true;
          this._isCanceled = false;
          this._rejectOnCancel = true;

          this._promise = new Promise((resolve, reject) => {
            this._reject = reject;

            const onResolve = (value) => {
              this._isPending = false;
              resolve(value);
            };

            const onReject = (error) => {
              this._isPending = false;
              reject(error);
            };

            const onCancel = (handler) => {
              if (!this._isPending) {
                throw new Error(
                  'The `onCancel` handler was attached after the promise settled.'
                );
              }

              this._cancelHandlers.push(handler);
            };

            Object.defineProperties(onCancel, {
              shouldReject: {
                get: () => this._rejectOnCancel,
                set: (boolean) => {
                  this._rejectOnCancel = boolean;
                },
              },
            });

            return executor(onResolve, onReject, onCancel);
          });
        }

        then(onFulfilled, onRejected) {
          // eslint-disable-next-line promise/prefer-await-to-then
          return this._promise.then(onFulfilled, onRejected);
        }

        catch(onRejected) {
          return this._promise.catch(onRejected);
        }

        finally(onFinally) {
          return this._promise.finally(onFinally);
        }

        cancel(reason) {
          if (!this._isPending || this._isCanceled) {
            return;
          }

          if (this._cancelHandlers.length > 0) {
            try {
              for (const handler of this._cancelHandlers) {
                handler();
              }
            } catch (error) {
              this._reject(error);
            }
          }

          this._isCanceled = true;
          if (this._rejectOnCancel) {
            this._reject(new CancelError(reason));
          }
        }

        get isCanceled() {
          return this._isCanceled;
        }
      }

      Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);

      module.exports = PCancelable;
      module.exports.CancelError = CancelError;

      /***/
    },

    /***/ 1940: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var qs = __nccwpck_require__(3477),
        url = __nccwpck_require__(7310),
        xtend = __nccwpck_require__(1208);

      const PARSE_LINK_HEADER_MAXLEN =
        parseInt(process.env.PARSE_LINK_HEADER_MAXLEN) || 2000;
      const PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED =
        process.env.PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED != null;

      function hasRel(x) {
        return x && x.rel;
      }

      function intoRels(acc, x) {
        function splitRel(rel) {
          acc[rel] = xtend(x, { rel: rel });
        }

        x.rel.split(/\s+/).forEach(splitRel);

        return acc;
      }

      function createObjects(acc, p) {
        // rel="next" => 1: rel 2: next
        var m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
        if (m) acc[m[1]] = m[2];
        return acc;
      }

      function parseLink(link) {
        try {
          var m = link.match(/<?([^>]*)>(.*)/),
            linkUrl = m[1],
            parts = m[2].split(';'),
            parsedUrl = url.parse(linkUrl),
            qry = qs.parse(parsedUrl.query);

          parts.shift();

          var info = parts.reduce(createObjects, {});

          info = xtend(qry, info);
          info.url = linkUrl;
          return info;
        } catch (e) {
          return null;
        }
      }

      function checkHeader(linkHeader) {
        if (!linkHeader) return false;

        if (linkHeader.length > PARSE_LINK_HEADER_MAXLEN) {
          if (PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED) {
            throw new Error(
              'Input string too long, it should be under ' +
                PARSE_LINK_HEADER_MAXLEN +
                ' characters.'
            );
          } else {
            return false;
          }
        }
        return true;
      }

      module.exports = function (linkHeader) {
        if (!checkHeader(linkHeader)) return null;

        return linkHeader
          .split(/,\s*</)
          .map(parseLink)
          .filter(hasRel)
          .reduce(intoRels, {});
      };

      /***/
    },

    /***/ 8341: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      var once = __nccwpck_require__(1223);
      var eos = __nccwpck_require__(1205);
      var fs = __nccwpck_require__(7147); // we only need fs to get the ReadStream and WriteStream prototypes

      var noop = function () {};
      var ancient = /^v?\.0/.test(process.version);

      var isFn = function (fn) {
        return typeof fn === 'function';
      };

      var isFS = function (stream) {
        if (!ancient) return false; // newer node version do not need to care about fs is a special way
        if (!fs) return false; // browser
        return (
          (stream instanceof (fs.ReadStream || noop) ||
            stream instanceof (fs.WriteStream || noop)) &&
          isFn(stream.close)
        );
      };

      var isRequest = function (stream) {
        return stream.setHeader && isFn(stream.abort);
      };

      var destroyer = function (stream, reading, writing, callback) {
        callback = once(callback);

        var closed = false;
        stream.on('close', function () {
          closed = true;
        });

        eos(stream, { readable: reading, writable: writing }, function (err) {
          if (err) return callback(err);
          closed = true;
          callback();
        });

        var destroyed = false;
        return function (err) {
          if (closed) return;
          if (destroyed) return;
          destroyed = true;

          if (isFS(stream)) return stream.close(noop); // use close for fs streams to avoid fd leaks
          if (isRequest(stream)) return stream.abort(); // request.destroy just do .end - .abort is what we want

          if (isFn(stream.destroy)) return stream.destroy();

          callback(err || new Error('stream was destroyed'));
        };
      };

      var call = function (fn) {
        fn();
      };

      var pipe = function (from, to) {
        return from.pipe(to);
      };

      var pump = function () {
        var streams = Array.prototype.slice.call(arguments);
        var callback =
          (isFn(streams[streams.length - 1] || noop) && streams.pop()) || noop;

        if (Array.isArray(streams[0])) streams = streams[0];
        if (streams.length < 2)
          throw new Error('pump requires two streams per minimum');

        var error;
        var destroys = streams.map(function (stream, i) {
          var reading = i < streams.length - 1;
          var writing = i > 0;
          return destroyer(stream, reading, writing, function (err) {
            if (!error) error = err;
            if (err) destroys.forEach(call);
            if (reading) return;
            destroys.forEach(call);
            callback(error);
          });
        });

        return streams.reduce(pipe);
      };

      module.exports = pump;

      /***/
    },

    /***/ 9273: /***/ (module) => {
      'use strict';

      class QuickLRU {
        constructor(options = {}) {
          if (!(options.maxSize && options.maxSize > 0)) {
            throw new TypeError('`maxSize` must be a number greater than 0');
          }

          this.maxSize = options.maxSize;
          this.onEviction = options.onEviction;
          this.cache = new Map();
          this.oldCache = new Map();
          this._size = 0;
        }

        _set(key, value) {
          this.cache.set(key, value);
          this._size++;

          if (this._size >= this.maxSize) {
            this._size = 0;

            if (typeof this.onEviction === 'function') {
              for (const [key, value] of this.oldCache.entries()) {
                this.onEviction(key, value);
              }
            }

            this.oldCache = this.cache;
            this.cache = new Map();
          }
        }

        get(key) {
          if (this.cache.has(key)) {
            return this.cache.get(key);
          }

          if (this.oldCache.has(key)) {
            const value = this.oldCache.get(key);
            this.oldCache.delete(key);
            this._set(key, value);
            return value;
          }
        }

        set(key, value) {
          if (this.cache.has(key)) {
            this.cache.set(key, value);
          } else {
            this._set(key, value);
          }

          return this;
        }

        has(key) {
          return this.cache.has(key) || this.oldCache.has(key);
        }

        peek(key) {
          if (this.cache.has(key)) {
            return this.cache.get(key);
          }

          if (this.oldCache.has(key)) {
            return this.oldCache.get(key);
          }
        }

        delete(key) {
          const deleted = this.cache.delete(key);
          if (deleted) {
            this._size--;
          }

          return this.oldCache.delete(key) || deleted;
        }

        clear() {
          this.cache.clear();
          this.oldCache.clear();
          this._size = 0;
        }

        *keys() {
          for (const [key] of this) {
            yield key;
          }
        }

        *values() {
          for (const [, value] of this) {
            yield value;
          }
        }

        *[Symbol.iterator]() {
          for (const item of this.cache) {
            yield item;
          }

          for (const item of this.oldCache) {
            const [key] = item;
            if (!this.cache.has(key)) {
              yield item;
            }
          }
        }

        get size() {
          let oldCacheSize = 0;
          for (const key of this.oldCache.keys()) {
            if (!this.cache.has(key)) {
              oldCacheSize++;
            }
          }

          return Math.min(this._size + oldCacheSize, this.maxSize);
        }
      }

      module.exports = QuickLRU;

      /***/
    },

    /***/ 6624: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const tls = __nccwpck_require__(4404);

      module.exports = (options = {}) =>
        new Promise((resolve, reject) => {
          const socket = tls.connect(options, () => {
            if (options.resolveSocket) {
              socket.off('error', reject);
              resolve({ alpnProtocol: socket.alpnProtocol, socket });
            } else {
              socket.destroy();
              resolve({ alpnProtocol: socket.alpnProtocol });
            }
          });

          socket.on('error', reject);
        });

      /***/
    },

    /***/ 9004: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const Readable = __nccwpck_require__(2781).Readable;
      const lowercaseKeys = __nccwpck_require__(9662);

      class Response extends Readable {
        constructor(statusCode, headers, body, url) {
          if (typeof statusCode !== 'number') {
            throw new TypeError('Argument `statusCode` should be a number');
          }
          if (typeof headers !== 'object') {
            throw new TypeError('Argument `headers` should be an object');
          }
          if (!(body instanceof Buffer)) {
            throw new TypeError('Argument `body` should be a buffer');
          }
          if (typeof url !== 'string') {
            throw new TypeError('Argument `url` should be a string');
          }

          super();
          this.statusCode = statusCode;
          this.headers = lowercaseKeys(headers);
          this.body = body;
          this.url = url;
        }

        _read() {
          this.push(this.body);
          this.push(null);
        }
      }

      module.exports = Response;

      /***/
    },

    /***/ 4294: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = __nccwpck_require__(4219);

      /***/
    },

    /***/ 4219: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var net = __nccwpck_require__(1808);
      var tls = __nccwpck_require__(4404);
      var http = __nccwpck_require__(3685);
      var https = __nccwpck_require__(5687);
      var events = __nccwpck_require__(2361);
      var assert = __nccwpck_require__(9491);
      var util = __nccwpck_require__(3837);

      exports.httpOverHttp = httpOverHttp;
      exports.httpsOverHttp = httpsOverHttp;
      exports.httpOverHttps = httpOverHttps;
      exports.httpsOverHttps = httpsOverHttps;

      function httpOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        return agent;
      }

      function httpsOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function httpOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        return agent;
      }

      function httpsOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function TunnelingAgent(options) {
        var self = this;
        self.options = options || {};
        self.proxyOptions = self.options.proxy || {};
        self.maxSockets =
          self.options.maxSockets || http.Agent.defaultMaxSockets;
        self.requests = [];
        self.sockets = [];

        self.on('free', function onFree(socket, host, port, localAddress) {
          var options = toOptions(host, port, localAddress);
          for (var i = 0, len = self.requests.length; i < len; ++i) {
            var pending = self.requests[i];
            if (
              pending.host === options.host &&
              pending.port === options.port
            ) {
              // Detect the request to connect same origin server,
              // reuse the connection.
              self.requests.splice(i, 1);
              pending.request.onSocket(socket);
              return;
            }
          }
          socket.destroy();
          self.removeSocket(socket);
        });
      }
      util.inherits(TunnelingAgent, events.EventEmitter);

      TunnelingAgent.prototype.addRequest = function addRequest(
        req,
        host,
        port,
        localAddress
      ) {
        var self = this;
        var options = mergeOptions(
          { request: req },
          self.options,
          toOptions(host, port, localAddress)
        );

        if (self.sockets.length >= this.maxSockets) {
          // We are over limit so we'll add it to the queue.
          self.requests.push(options);
          return;
        }

        // If we are under maxSockets create a new one.
        self.createSocket(options, function (socket) {
          socket.on('free', onFree);
          socket.on('close', onCloseOrRemove);
          socket.on('agentRemove', onCloseOrRemove);
          req.onSocket(socket);

          function onFree() {
            self.emit('free', socket, options);
          }

          function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener('free', onFree);
            socket.removeListener('close', onCloseOrRemove);
            socket.removeListener('agentRemove', onCloseOrRemove);
          }
        });
      };

      TunnelingAgent.prototype.createSocket = function createSocket(
        options,
        cb
      ) {
        var self = this;
        var placeholder = {};
        self.sockets.push(placeholder);

        var connectOptions = mergeOptions({}, self.proxyOptions, {
          method: 'CONNECT',
          path: options.host + ':' + options.port,
          agent: false,
          headers: {
            host: options.host + ':' + options.port,
          },
        });
        if (options.localAddress) {
          connectOptions.localAddress = options.localAddress;
        }
        if (connectOptions.proxyAuth) {
          connectOptions.headers = connectOptions.headers || {};
          connectOptions.headers['Proxy-Authorization'] =
            'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
        }

        debug('making CONNECT request');
        var connectReq = self.request(connectOptions);
        connectReq.useChunkedEncodingByDefault = false; // for v0.6
        connectReq.once('response', onResponse); // for v0.6
        connectReq.once('upgrade', onUpgrade); // for v0.6
        connectReq.once('connect', onConnect); // for v0.7 or later
        connectReq.once('error', onError);
        connectReq.end();

        function onResponse(res) {
          // Very hacky. This is necessary to avoid http-parser leaks.
          res.upgrade = true;
        }

        function onUpgrade(res, socket, head) {
          // Hacky.
          process.nextTick(function () {
            onConnect(res, socket, head);
          });
        }

        function onConnect(res, socket, head) {
          connectReq.removeAllListeners();
          socket.removeAllListeners();

          if (res.statusCode !== 200) {
            debug(
              'tunneling socket could not be established, statusCode=%d',
              res.statusCode
            );
            socket.destroy();
            var error = new Error(
              'tunneling socket could not be established, ' +
                'statusCode=' +
                res.statusCode
            );
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }
          if (head.length > 0) {
            debug('got illegal response body from proxy');
            socket.destroy();
            var error = new Error('got illegal response body from proxy');
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }
          debug('tunneling connection has established');
          self.sockets[self.sockets.indexOf(placeholder)] = socket;
          return cb(socket);
        }

        function onError(cause) {
          connectReq.removeAllListeners();

          debug(
            'tunneling socket could not be established, cause=%s\n',
            cause.message,
            cause.stack
          );
          var error = new Error(
            'tunneling socket could not be established, ' +
              'cause=' +
              cause.message
          );
          error.code = 'ECONNRESET';
          options.request.emit('error', error);
          self.removeSocket(placeholder);
        }
      };

      TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
        var pos = this.sockets.indexOf(socket);
        if (pos === -1) {
          return;
        }
        this.sockets.splice(pos, 1);

        var pending = this.requests.shift();
        if (pending) {
          // If we have pending requests and a socket gets closed a new one
          // needs to be created to take over in the pool for the one that closed.
          this.createSocket(pending, function (socket) {
            pending.request.onSocket(socket);
          });
        }
      };

      function createSecureSocket(options, cb) {
        var self = this;
        TunnelingAgent.prototype.createSocket.call(
          self,
          options,
          function (socket) {
            var hostHeader = options.request.getHeader('host');
            var tlsOptions = mergeOptions({}, self.options, {
              socket: socket,
              servername: hostHeader
                ? hostHeader.replace(/:.*$/, '')
                : options.host,
            });

            // 0 is dummy port for v0.6
            var secureSocket = tls.connect(0, tlsOptions);
            self.sockets[self.sockets.indexOf(socket)] = secureSocket;
            cb(secureSocket);
          }
        );
      }

      function toOptions(host, port, localAddress) {
        if (typeof host === 'string') {
          // since v0.10
          return {
            host: host,
            port: port,
            localAddress: localAddress,
          };
        }
        return host; // for v0.11 or later
      }

      function mergeOptions(target) {
        for (var i = 1, len = arguments.length; i < len; ++i) {
          var overrides = arguments[i];
          if (typeof overrides === 'object') {
            var keys = Object.keys(overrides);
            for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
              var k = keys[j];
              if (overrides[k] !== undefined) {
                target[k] = overrides[k];
              }
            }
          }
        }
        return target;
      }

      var debug;
      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        debug = function () {
          var args = Array.prototype.slice.call(arguments);
          if (typeof args[0] === 'string') {
            args[0] = 'TUNNEL: ' + args[0];
          } else {
            args.unshift('TUNNEL:');
          }
          console.error.apply(console, args);
        };
      } else {
        debug = function () {};
      }
      exports.debug = debug; // for test

      /***/
    },

    /***/ 8810: /***/ (module) => {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */

      module.exports = function isBuffer(obj) {
        return (
          obj != null &&
          obj.constructor != null &&
          typeof obj.constructor.isBuffer === 'function' &&
          obj.constructor.isBuffer(obj)
        );
      };

      /***/
    },

    /***/ 2157: /***/ (module) => {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */

      module.exports = function isBuffer(obj) {
        return (
          obj != null &&
          obj.constructor != null &&
          typeof obj.constructor.isBuffer === 'function' &&
          obj.constructor.isBuffer(obj)
        );
      };

      /***/
    },

    /***/ 2940: /***/ (module) => {
      // Returns a wrapper function that returns a wrapped callback
      // The wrapper function should do some stuff, and return a
      // presumably different callback function.
      // This makes sure that own properties are retained, so that
      // decorations and such are not lost along the way.
      module.exports = wrappy;
      function wrappy(fn, cb) {
        if (fn && cb) return wrappy(fn)(cb);

        if (typeof fn !== 'function')
          throw new TypeError('need wrapper function');

        Object.keys(fn).forEach(function (k) {
          wrapper[k] = fn[k];
        });

        return wrapper;

        function wrapper() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var ret = fn.apply(this, args);
          var cb = args[args.length - 1];
          if (typeof ret === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function (k) {
              ret[k] = cb[k];
            });
          }
          return ret;
        }
      }

      /***/
    },

    /***/ 1208: /***/ (module) => {
      module.exports = extend;

      var hasOwnProperty = Object.prototype.hasOwnProperty;

      function extend() {
        var target = {};

        for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      }

      /***/
    },

    /***/ 6350: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      // original content by: https://github.com/TriPSs/conventional-changelog-action/blob/master/src/helpers/git.js
      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                !desc ||
                ('get' in desc
                  ? !m.__esModule
                  : desc.writable || desc.configurable)
              ) {
                desc = {
                  enumerable: true,
                  get: function () {
                    return m[k];
                  },
                };
              }
              Object.defineProperty(o, k2, desc);
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (
                k !== 'default' &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __importDefault =
        (this && this.__importDefault) ||
        function (mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      const core = __importStar(__nccwpck_require__(2186));
      const exec = __importStar(__nccwpck_require__(1514));
      const promises_1 = __importDefault(__nccwpck_require__(3292));
      const { GITHUB_REPOSITORY, GITHUB_REF } = process.env;
      const branch =
        GITHUB_REF === null || GITHUB_REF === void 0
          ? void 0
          : GITHUB_REF.replace('refs/heads/', '');
      class Git {
        constructor() {
          this.isShallow = () =>
            __awaiter(this, void 0, void 0, function* () {
              const isShallow = yield this.exec(
                'rev-parse --is-shallow-repository'
              );
              return isShallow.trim().replace('\n', '') === 'true';
            });
          this.config = (prop, value) => this.exec(`config ${prop} "${value}"`);
          this.add = (file) => {
            let str = '';
            if (Array.isArray(file)) {
              file.map((f) => (str += ` ${f}`));
            } else {
              str = file;
            }
            return this.exec(`add ${str}`);
          };
          this.commit = (message) => this.exec(`commit -m "${message}"`);
          this.pull = () =>
            __awaiter(this, void 0, void 0, function* () {
              const args = ['pull'];
              // Check if the repo is unshallow
              if (yield this.isShallow()) {
                args.push('--unshallow');
              }
              args.push('--tags');
              args.push(core.getInput('git-pull-method'));
              return this.exec(args.join(' '));
            });
          this.push = () => this.exec(`push origin ${branch} --follow-tags`);
          this.updateOrigin = (repo) =>
            this.exec(`remote set-url origin ${repo}`);
          this.createTag = (tag) => this.exec(`tag -a ${tag} -m "${tag}"`);
          const githubToken = core.getInput('github-token', { required: true });
          core.setSecret(githubToken);
          const githubName = core.getInput('github-name') || 'GitHub Actions';
          const githubEmail =
            core.getInput('github-email') || 'actions@users.noreply.github.com';
          // Set config
          this.config('user.name', githubName);
          this.config('user.email', githubEmail);
          this.config('pull.rebase', 'false');
          // Update the origin
          this.updateOrigin(
            `https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`
          );
        }
        exec(command) {
          return __awaiter(this, void 0, void 0, function* () {
            let execOutput = '';
            const options = {
              listeners: {
                stdout: (data) => {
                  execOutput += data.toString();
                },
              },
            };
            const exitCode = yield exec.exec(
              `git ${command}`,
              undefined,
              options
            );
            if (exitCode === 0) {
              return execOutput;
            } else {
              core.error(
                `Command "git ${command}" exited with code ${exitCode}.`
              );
              throw new Error(
                `Command "git ${command}" exited with code ${exitCode}.`
              );
            }
          });
        }
        pushNewFiles(files = []) {
          return __awaiter(this, void 0, void 0, function* () {
            if (!files.length) return;
            yield this.pull();
            yield Promise.all(
              files.map(({ filename, data }) =>
                promises_1.default.writeFile(filename, data)
              )
            );
            yield this.add(files.map(({ filename }) => filename));
            yield this.commit(`chore(updates): updated entries in files`);
            yield this.push();
          });
        }
      }
      exports['default'] = new Git();

      /***/
    },

    /***/ 3015: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                !desc ||
                ('get' in desc
                  ? !m.__esModule
                  : desc.writable || desc.configurable)
              ) {
                desc = {
                  enumerable: true,
                  get: function () {
                    return m[k];
                  },
                };
              }
              Object.defineProperty(o, k2, desc);
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (
                k !== 'default' &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __importDefault =
        (this && this.__importDefault) ||
        function (mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      var _a;
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.MARKDOWN_FILENAME =
        exports.generateMd =
        exports.renderer =
        exports.API_STARRED_URL =
        exports.REPO_USERNAME =
          void 0;
      const ejs_1 = __importDefault(__nccwpck_require__(8431));
      const core = __importStar(__nccwpck_require__(2186));
      const remark_1 = __nccwpck_require__(7331);
      const remark_toc_1 = __importDefault(__nccwpck_require__(6800));
      exports.REPO_USERNAME =
        (_a = process.env.GITHUB_REPOSITORY) === null || _a === void 0
          ? void 0
          : _a.split('/')[0];
      exports.API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${exports.REPO_USERNAME}/starred`;
      function renderer(data, templateString) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            return ejs_1.default.render(templateString, data);
          } catch (error) {
            core.setFailed(`#renderer: ${error}`);
            return '';
          }
        });
      }
      exports.renderer = renderer;
      function generateMd(data) {
        return new Promise((resolve) => {
          (0, remark_1.remark)()
            .use(remark_toc_1.default)
            .process(data, function (error, file) {
              if (error) {
                core.error('#generateMd');
                core.error(error);
                return resolve('');
              }
              return resolve(String(file));
            });
        });
      }
      exports.generateMd = generateMd;
      exports.MARKDOWN_FILENAME = core.getInput('output-filename');

      /***/
    },

    /***/ 6144: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                !desc ||
                ('get' in desc
                  ? !m.__esModule
                  : desc.writable || desc.configurable)
              ) {
                desc = {
                  enumerable: true,
                  get: function () {
                    return m[k];
                  },
                };
              }
              Object.defineProperty(o, k2, desc);
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (
                k !== 'default' &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __importDefault =
        (this && this.__importDefault) ||
        function (mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      exports.run = exports.main = void 0;
      const path_1 = __importDefault(__nccwpck_require__(1017));
      const core = __importStar(__nccwpck_require__(2186));
      const promises_1 = __nccwpck_require__(3292);
      const gh_star_fetch_1 = __importDefault(__nccwpck_require__(6636));
      const helpers_1 = __nccwpck_require__(3015);
      const git_1 = __importDefault(__nccwpck_require__(6350));
      function main() {
        return __awaiter(this, void 0, void 0, function* () {
          // set default template
          let template = yield (0, promises_1.readFile)(
            path_1.default.resolve(__dirname, './TEMPLATE.ejs'),
            'utf8'
          );
          // get template if found in the repo
          const customTemplatePath = core.getInput('template-path');
          core.info(
            `check if customTemplatePath: ${customTemplatePath} exists`
          );
          try {
            template = yield (0, promises_1.readFile)(
              customTemplatePath,
              'utf8'
            );
          } catch (_a) {
            core.info("Couldn't find template file, using default");
          }
          const sortedByLanguages = yield (0, gh_star_fetch_1.default)({
            accessToken: core.getInput('api-token', { required: true }),
            compactByLanguage: true,
          });
          const rendered = yield (0, helpers_1.renderer)(
            {
              username: helpers_1.REPO_USERNAME,
              stars: Object.entries(sortedByLanguages),
              updatedAt: Date.now(),
            },
            template
          );
          const markdown = yield (0, helpers_1.generateMd)(rendered);
          yield git_1.default.pushNewFiles([
            {
              filename: helpers_1.MARKDOWN_FILENAME,
              data: markdown,
            },
            {
              filename: 'data.json',
              data: JSON.stringify(sortedByLanguages, null, 2),
            },
          ]);
        });
      }
      exports.main = main;
      function run() {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield main();
          } catch (error) {
            core.setFailed(`#run: ${error}`);
          }
        });
      }
      exports.run = run;
      const catchAll = (info) => {
        core.setFailed(`#catchAll: ${info}`);
        core.error(info);
      };
      process.on('unhandledRejection', catchAll);
      process.on('uncaughtException', catchAll);
      run().catch(core.error);

      /***/
    },

    /***/ 9491: /***/ (module) => {
      'use strict';
      module.exports = require('assert');

      /***/
    },

    /***/ 4300: /***/ (module) => {
      'use strict';
      module.exports = require('buffer');

      /***/
    },

    /***/ 2081: /***/ (module) => {
      'use strict';
      module.exports = require('child_process');

      /***/
    },

    /***/ 9523: /***/ (module) => {
      'use strict';
      module.exports = require('dns');

      /***/
    },

    /***/ 2361: /***/ (module) => {
      'use strict';
      module.exports = require('events');

      /***/
    },

    /***/ 7147: /***/ (module) => {
      'use strict';
      module.exports = require('fs');

      /***/
    },

    /***/ 3292: /***/ (module) => {
      'use strict';
      module.exports = require('fs/promises');

      /***/
    },

    /***/ 3685: /***/ (module) => {
      'use strict';
      module.exports = require('http');

      /***/
    },

    /***/ 5158: /***/ (module) => {
      'use strict';
      module.exports = require('http2');

      /***/
    },

    /***/ 5687: /***/ (module) => {
      'use strict';
      module.exports = require('https');

      /***/
    },

    /***/ 1808: /***/ (module) => {
      'use strict';
      module.exports = require('net');

      /***/
    },

    /***/ 2037: /***/ (module) => {
      'use strict';
      module.exports = require('os');

      /***/
    },

    /***/ 1017: /***/ (module) => {
      'use strict';
      module.exports = require('path');

      /***/
    },

    /***/ 3477: /***/ (module) => {
      'use strict';
      module.exports = require('querystring');

      /***/
    },

    /***/ 2781: /***/ (module) => {
      'use strict';
      module.exports = require('stream');

      /***/
    },

    /***/ 1576: /***/ (module) => {
      'use strict';
      module.exports = require('string_decoder');

      /***/
    },

    /***/ 9512: /***/ (module) => {
      'use strict';
      module.exports = require('timers');

      /***/
    },

    /***/ 4404: /***/ (module) => {
      'use strict';
      module.exports = require('tls');

      /***/
    },

    /***/ 7310: /***/ (module) => {
      'use strict';
      module.exports = require('url');

      /***/
    },

    /***/ 3837: /***/ (module) => {
      'use strict';
      module.exports = require('util');

      /***/
    },

    /***/ 9796: /***/ (module) => {
      'use strict';
      module.exports = require('zlib');

      /***/
    },

    /***/ 9165: /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __nccwpck_require__
    ) => {
      'use strict';
      /* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
        /* harmony export */ B: () => /* binding */ toString,
        /* harmony export */
      });
      /**
       * @typedef Options
       * @property {boolean} [includeImageAlt=true]
       */

      /**
       * Get the text content of a node.
       * Prefer the node’s plain-text fields, otherwise serialize its children,
       * and if the given value is an array, serialize the nodes in it.
       *
       * @param {unknown} node
       * @param {Options} [options]
       * @returns {string}
       */
      function toString(node, options) {
        var { includeImageAlt = true } = options || {};
        return one(node, includeImageAlt);
      }

      /**
       * @param {unknown} node
       * @param {boolean} includeImageAlt
       * @returns {string}
       */
      function one(node, includeImageAlt) {
        return (
          (node &&
            typeof node === 'object' &&
            // @ts-ignore looks like a literal.
            (node.value ||
              // @ts-ignore looks like an image.
              (includeImageAlt ? node.alt : '') ||
              // @ts-ignore looks like a parent.
              ('children' in node && all(node.children, includeImageAlt)) ||
              (Array.isArray(node) && all(node, includeImageAlt)))) ||
          ''
        );
      }

      /**
       * @param {Array.<unknown>} values
       * @param {boolean} includeImageAlt
       * @returns {string}
       */
      function all(values, includeImageAlt) {
        /** @type {Array.<string>} */
        var result = [];
        var index = -1;

        while (++index < values.length) {
          result[index] = one(values[index], includeImageAlt);
        }

        return result.join('');
      }

      /***/
    },

    /***/ 6800: /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __nccwpck_require__
    ) => {
      'use strict';
      // ESM COMPAT FLAG
      __nccwpck_require__.r(__webpack_exports__);

      // EXPORTS
      __nccwpck_require__.d(__webpack_exports__, {
        default: () => /* binding */ remarkToc,
      });

      // EXTERNAL MODULE: ./node_modules/github-slugger/index.js
      var github_slugger = __nccwpck_require__(237);
      // EXTERNAL MODULE: ./node_modules/mdast-util-to-string/index.js
      var mdast_util_to_string = __nccwpck_require__(9165);
      // EXTERNAL MODULE: ./node_modules/unist-util-is/index.js
      var unist_util_is = __nccwpck_require__(1481); // CONCATENATED MODULE: ./node_modules/mdast-util-toc/node_modules/unist-util-visit-parents/color.js
      /**
       * @param {string} d
       * @returns {string}
       */
      function color(d) {
        return '\u001B[33m' + d + '\u001B[39m';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-toc/node_modules/unist-util-visit-parents/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Parent} Parent
       * @typedef {import('unist-util-is').Test} Test
       */

      /**
       * @typedef {CONTINUE|SKIP|EXIT} Action Union of the action types
       * @typedef {number} Index Move to the sibling at index next (after node itself is completely traversed). Useful if mutating the tree, such as removing the node the visitor is currently on, or any of its previous siblings (or next siblings, in case of reverse) Results less than 0 or greater than or equal to children.length stop traversing the parent
       * @typedef {[(Action|null|undefined|void)?, (Index|null|undefined)?]} ActionTuple List with one or two values, the first an action, the second an index.
       * @typedef {null|undefined|Action|Index|ActionTuple|void} VisitorResult Any value that can be returned from a visitor
       */

      /**
       * Invoked when a node (matching test, if given) is found.
       * Visitors are free to transform node.
       * They can also transform the parent of node (the last of ancestors).
       * Replacing node itself, if `SKIP` is not returned, still causes its descendants to be visited.
       * If adding or removing previous siblings (or next siblings, in case of reverse) of node,
       * visitor should return a new index (number) to specify the sibling to traverse after node is traversed.
       * Adding or removing next siblings of node (or previous siblings, in case of reverse)
       * is handled as expected without needing to return a new index.
       * Removing the children property of an ancestor still results in them being traversed.
       *
       * @template {Node} V
       * @callback Visitor
       * @param {V} node Found node
       * @param {Array.<Parent>} ancestors Ancestors of node
       * @returns {VisitorResult}
       */

      /**
       * Continue traversing as normal
       */
      const CONTINUE = true;
      /**
       * Do not traverse this node’s children
       */
      const SKIP = 'skip';
      /**
       * Stop traversing immediately
       */
      const EXIT = false;

      const visitParents =
        /**
         * @type {(
         *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
         *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
         *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
         * )}
         */
        (
          /**
           * Visit children of tree which pass a test
           *
           * @param {Node} tree Abstract syntax tree to walk
           * @param {Test} test test Test node
           * @param {Visitor<Node>} visitor Function to run for each node
           * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
           */
          function (tree, test, visitor, reverse) {
            if (typeof test === 'function' && typeof visitor !== 'function') {
              reverse = visitor;
              // @ts-ignore no visitor given, so `visitor` is test.
              visitor = test;
              test = null;
            }

            var is = (0, unist_util_is /* convert */.O)(test);
            var step = reverse ? -1 : 1;

            factory(tree, null, [])();

            /**
             * @param {Node} node
             * @param {number?} index
             * @param {Array.<Parent>} parents
             */
            function factory(node, index, parents) {
              /** @type {Object.<string, unknown>} */
              var value = typeof node === 'object' && node !== null ? node : {};
              /** @type {string} */
              var name;

              if (typeof value.type === 'string') {
                name =
                  typeof value.tagName === 'string'
                    ? value.tagName
                    : typeof value.name === 'string'
                    ? value.name
                    : undefined;

                Object.defineProperty(visit, 'name', {
                  value:
                    'node (' +
                    color(value.type + (name ? '<' + name + '>' : '')) +
                    ')',
                });
              }

              return visit;

              function visit() {
                /** @type {ActionTuple} */
                var result = [];
                /** @type {ActionTuple} */
                var subresult;
                /** @type {number} */
                var offset;
                /** @type {Array.<Parent>} */
                var grandparents;

                if (
                  !test ||
                  is(node, index, parents[parents.length - 1] || null)
                ) {
                  result = toResult(visitor(node, parents));

                  if (result[0] === EXIT) {
                    return result;
                  }
                }

                if (node.children && result[0] !== SKIP) {
                  // @ts-ignore looks like a parent.
                  offset = (reverse ? node.children.length : -1) + step;
                  // @ts-ignore looks like a parent.
                  grandparents = parents.concat(node);

                  // @ts-ignore looks like a parent.
                  while (offset > -1 && offset < node.children.length) {
                    subresult = factory(
                      node.children[offset],
                      offset,
                      grandparents
                    )();

                    if (subresult[0] === EXIT) {
                      return subresult;
                    }

                    offset =
                      typeof subresult[1] === 'number'
                        ? subresult[1]
                        : offset + step;
                  }
                }

                return result;
              }
            }
          }
        );

      /**
       * @param {VisitorResult} value
       * @returns {ActionTuple}
       */
      function toResult(value) {
        if (Array.isArray(value)) {
          return value;
        }

        if (typeof value === 'number') {
          return [CONTINUE, value];
        }

        return [value];
      } // CONCATENATED MODULE: ./node_modules/mdast-util-toc/node_modules/unist-util-visit/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Parent} Parent
       * @typedef {import('unist-util-is').Test} Test
       * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
       */

      /**
       * Invoked when a node (matching test, if given) is found.
       * Visitors are free to transform node.
       * They can also transform the parent of node (the last of ancestors).
       * Replacing node itself, if `SKIP` is not returned, still causes its descendants to be visited.
       * If adding or removing previous siblings (or next siblings, in case of reverse) of node,
       * visitor should return a new index (number) to specify the sibling to traverse after node is traversed.
       * Adding or removing next siblings of node (or previous siblings, in case of reverse)
       * is handled as expected without needing to return a new index.
       * Removing the children property of an ancestor still results in them being traversed.
       *
       * @template {Node} V
       * @callback Visitor
       * @param {V} node Found node
       * @param {number|null} index Position of `node` in `parent`
       * @param {Parent|null} parent Parent of `node`
       * @returns {VisitorResult}
       */

      const visit =
        /**
         * @type {(
         *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
         *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
         *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
         * )}
         */
        (
          /**
           * Visit children of tree which pass a test
           *
           * @param {Node} tree Abstract syntax tree to walk
           * @param {Test} test test Test node
           * @param {Visitor<Node>} visitor Function to run for each node
           * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
           */
          function (tree, test, visitor, reverse) {
            if (typeof test === 'function' && typeof visitor !== 'function') {
              reverse = visitor;
              visitor = test;
              test = null;
            }

            visitParents(tree, test, overload, reverse);

            /**
             * @param {Node} node
             * @param {Array.<Parent>} parents
             */
            function overload(node, parents) {
              var parent = parents[parents.length - 1];
              return visitor(
                node,
                parent ? parent.children.indexOf(node) : null,
                parent
              );
            }
          }
        ); // CONCATENATED MODULE: ./node_modules/mdast-util-toc/lib/to-expression.js

      /**
       * Transform a string into an applicable expression.
       *
       * @param {string} value
       * @returns {RegExp}
       */
      function toExpression(value) {
        return new RegExp('^(' + value + ')$', 'i');
      } // CONCATENATED MODULE: ./node_modules/mdast-util-toc/lib/search.js

      /**
       * @typedef {import('mdast').Root|import('mdast').Content} Node
       * @typedef {import('mdast').Heading} Heading
       * @typedef {import('mdast').PhrasingContent} PhrasingContent
       * @typedef {import('unist-util-visit').Visitor<Heading>} HeadingVisitor
       * @typedef {import('unist-util-is').Type} IsType
       * @typedef {import('unist-util-is').Props} IsProps
       * @typedef {import('unist-util-is').TestFunctionAnything} IsTestFunctionAnything
       *
       * @typedef SearchOptions
       * @property {string} [skip] Headings to skip, wrapped in `new RegExp('^(' + value + ')$', 'i')`. Any heading matching this expression will not be present in the table of contents.
       * @property {IsType|IsProps|IsTestFunctionAnything|Array.<IsType|IsProps|IsTestFunctionAnything>} [parents]
       * @property {Heading['depth']} [maxDepth=6] Maximum heading depth to include in the table of contents. This is inclusive: when set to `3`, level three headings are included (those with three hashes, `###`).
       *
       * @typedef SearchEntry
       * @property {Heading['depth']} depth
       * @property {Array.<PhrasingContent>} children
       * @property {string} id
       *
       * @typedef SearchResult
       * @property {number} index
       * @property {number} endIndex
       * @property {Array.<SearchEntry>} map
       */

      const slugs = new github_slugger();

      /**
       * Search a node for a toc.
       *
       * @param {Node} root
       * @param {RegExp|null} expression
       * @param {SearchOptions} settings
       * @returns {SearchResult}
       */
      function search(root, expression, settings) {
        const skip = settings.skip && toExpression(settings.skip);
        const parents = (0, unist_util_is /* convert */.O)(
          settings.parents || ((d) => d === root)
        );
        /** @type {Array.<SearchEntry>} */
        const map = [];
        /** @type {number|undefined} */
        let index;
        /** @type {number} */
        let endIndex;
        /** @type {Heading} */
        let opening;

        slugs.reset();

        // Visit all headings in `root`.  We `slug` all headings (to account for
        // duplicates), but only create a TOC from top-level headings (by default).
        visit(root, 'heading', onheading);

        return {
          index: index || -1,
          // <sindresorhus/eslint-plugin-unicorn#980>
          // @ts-expect-error Looks like a parent.
          endIndex: index ? endIndex || root.children.length : -1, // eslint-disable-line unicorn/explicit-length-check
          map,
        };

        /** @type {HeadingVisitor} */
        function onheading(node, position, parent) {
          const value = (0, mdast_util_to_string /* toString */.B)(node, {
            includeImageAlt: false,
          });
          /** @type {string} */
          // @ts-expect-error `hProperties` from <https://github.com/syntax-tree/mdast-util-to-hast>
          const id =
            node.data && node.data.hProperties && node.data.hProperties.id;
          const slug = slugs.slug(id || value);

          if (!parents(parent)) {
            return;
          }

          // Our opening heading.
          if (
            position !== null &&
            expression &&
            !index &&
            expression.test(value)
          ) {
            index = position + 1;
            opening = node;
            return;
          }

          // Our closing heading.
          if (
            position !== null &&
            opening &&
            !endIndex &&
            node.depth <= opening.depth
          ) {
            endIndex = position;
          }

          // A heading after the closing (if we were looking for one).
          if (
            (endIndex || !expression) &&
            (!settings.maxDepth || node.depth <= settings.maxDepth) &&
            (!skip || !skip.test(value))
          ) {
            map.push({ depth: node.depth, children: node.children, id: slug });
          }
        }
      }

      // EXTERNAL MODULE: ./node_modules/extend/index.js
      var extend = __nccwpck_require__(8171); // CONCATENATED MODULE: ./node_modules/mdast-util-toc/lib/contents.js
      /**
       * @typedef {import('mdast').Root|import('mdast').Content} Node
       * @typedef {import('mdast').List} List
       * @typedef {import('mdast').ListItem} ListItem
       * @typedef {import('mdast').PhrasingContent} PhrasingContent
       * @typedef {import('mdast').StaticPhrasingContent} StaticPhrasingContent
       * @typedef {import('./search.js').SearchEntry} SearchEntry
       *
       * @typedef ContentsOptions
       * @property {boolean} [tight=false] Whether to compile list-items tightly.
       * @property {boolean} [ordered=false] Whether to compile list-items as an ordered list, otherwise they are unordered.
       * @property {string|null} [prefix=null] Add a prefix to links to headings in the table of contents. Useful for example when later going from mdast to hast and sanitizing with `hast-util-sanitize`.
       */

      /**
       * Transform a list of heading objects to a markdown list.
       *
       * @param {Array.<SearchEntry>} map
       * @param {ContentsOptions} settings
       */
      function contents(map, settings) {
        const { ordered = false, tight = false, prefix = null } = settings;
        /** @type {List} */
        const table = { type: 'list', ordered, spread: false, children: [] };
        let minDepth = Number.POSITIVE_INFINITY;
        let index = -1;

        // Find minimum depth.
        while (++index < map.length) {
          if (map[index].depth < minDepth) {
            minDepth = map[index].depth;
          }
        }

        // Normalize depth.
        index = -1;

        while (++index < map.length) {
          map[index].depth -= minDepth - 1;
        }

        // Add TOC to list.
        index = -1;

        while (++index < map.length) {
          insert(map[index], table, { ordered, tight, prefix });
        }

        return table;
      }

      /**
       * Insert an entry into `parent`.
       *
       * @param {SearchEntry} entry
       * @param {List|ListItem} parent
       * @param {ContentsOptions} settings
       */
      function insert(entry, parent, settings) {
        let index = -1;

        if (parent.type === 'list') {
          if (entry.depth === 1) {
            parent.children.push({
              type: 'listItem',
              spread: false,
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'link',
                      title: null,
                      url: '#' + (settings.prefix || '') + entry.id,
                      children: contents_all(entry.children),
                    },
                  ],
                },
              ],
            });
          } else if (parent.children.length > 0) {
            insert(
              entry,
              parent.children[parent.children.length - 1],
              settings
            );
          } else {
            /** @type {ListItem} */
            const item = { type: 'listItem', spread: false, children: [] };
            parent.children.push(item);
            insert(entry, item, settings);
          }
        }
        // List item
        else if (
          parent.children[parent.children.length - 1] &&
          parent.children[parent.children.length - 1].type === 'list'
        ) {
          entry.depth--;
          insert(
            entry,
            // @ts-expect-error It’s a `list`, we just checked.
            parent.children[parent.children.length - 1],
            settings
          );
        } else {
          /** @type {List} */
          const item = {
            type: 'list',
            ordered: settings.ordered,
            spread: false,
            children: [],
          };
          parent.children.push(item);
          entry.depth--;
          insert(entry, item, settings);
        }

        if (parent.type === 'list' && !settings.tight) {
          parent.spread = false;

          while (++index < parent.children.length) {
            if (parent.children[index].children.length > 1) {
              parent.spread = true;
              break;
            }
          }
        } else {
          parent.spread = !settings.tight;
        }
      }

      /**
       * @param {Array.<PhrasingContent>} [nodes]
       * @returns {Array.<StaticPhrasingContent>}
       */
      function contents_all(nodes) {
        /** @type {Array.<StaticPhrasingContent>} */
        let result = [];
        let index = -1;

        if (nodes) {
          while (++index < nodes.length) {
            result = result.concat(one(nodes[index]));
          }
        }

        return result;
      }

      /**
       * @param {PhrasingContent} node
       * @returns {StaticPhrasingContent|Array.<StaticPhrasingContent>}
       */
      function one(node) {
        if (
          node.type === 'link' ||
          node.type === 'linkReference' ||
          node.type === 'footnote' ||
          node.type === 'footnoteReference'
        ) {
          // @ts-expect-error Looks like a parent.
          return contents_all(node.children);
        }

        if ('children' in node) {
          const { children, position, ...copy } = node;
          return Object.assign(extend(true, {}, copy), {
            children: contents_all(node.children),
          });
        }

        const { position, ...copy } = node;
        return extend(true, {}, copy);
      } // CONCATENATED MODULE: ./node_modules/mdast-util-toc/lib/index.js

      /**
       * @typedef {import('mdast').Root|import('mdast').Content} Node
       * @typedef {import('mdast').List} List
       * @typedef {import('./search.js').SearchOptions} SearchOptions
       * @typedef {import('./contents.js').ContentsOptions} ContentsOptions
       * @typedef {SearchOptions & ContentsOptions & ExtraOptions} Options
       *
       * @typedef ExtraOptions
       * @property {string} [heading] Heading to look for, wrapped in `new RegExp('^(' + value + ')$', 'i')`.
       *
       * @typedef Result
       * @property {number|null} index
       * @property {number|null} endIndex
       * @property {List|null} map
       */

      /**
       * Get a TOC representation of `node`.
       *
       * @param {Node} node
       * @param {Options} [options]
       * @returns {Result}
       */
      function toc(node, options) {
        const settings = options || {};
        const heading = settings.heading
          ? toExpression(settings.heading)
          : null;
        const result = search(node, heading, settings);

        return {
          index: heading ? result.index : null,
          endIndex: heading ? result.endIndex : null,
          map: result.map.length > 0 ? contents(result.map, settings) : null,
        };
      } // CONCATENATED MODULE: ./node_modules/remark-toc/index.js

      /**
       * @typedef {import('mdast').Root} Root
       * @typedef {import('mdast-util-toc').Options} Options
       */

      /**
       * Plugin to generate a Table of Contents (TOC).
       *
       * @type {import('unified').Plugin<[Options?]|void[], Root>}
       */
      function remarkToc(options = {}) {
        return (node) => {
          const result = toc(
            node,
            Object.assign({}, options, {
              heading: options.heading || 'toc|table[ -]of[ -]contents?',
            })
          );

          if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
          ) {
            return;
          }

          node.children = [
            ...node.children.slice(0, result.index),
            result.map,
            ...node.children.slice(result.endIndex),
          ];
        };
      }

      /***/
    },

    /***/ 7331: /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __nccwpck_require__
    ) => {
      'use strict';
      // ESM COMPAT FLAG
      __nccwpck_require__.r(__webpack_exports__);

      // EXPORTS
      __nccwpck_require__.d(__webpack_exports__, {
        remark: () => /* binding */ remark,
      });

      // NAMESPACE OBJECT: ./node_modules/micromark/lib/constructs.js
      var constructs_namespaceObject = {};
      __nccwpck_require__.r(constructs_namespaceObject);
      __nccwpck_require__.d(constructs_namespaceObject, {
        attentionMarkers: () => attentionMarkers,
        contentInitial: () => contentInitial,
        disable: () => disable,
        document: () => constructs_document,
        flow: () => constructs_flow,
        flowInitial: () => flowInitial,
        insideSpan: () => insideSpan,
        string: () => constructs_string,
        text: () => constructs_text,
      }); // CONCATENATED MODULE: ./node_modules/bail/index.js

      /**
       * Throw a given error.
       *
       * @param {Error|null|undefined} [error]
       *   Maybe error.
       * @returns {asserts error is null|undefined}
       */
      function bail(error) {
        if (error) {
          throw error;
        }
      }

      // EXTERNAL MODULE: ./node_modules/unified/node_modules/is-buffer/index.js
      var is_buffer = __nccwpck_require__(8810);
      // EXTERNAL MODULE: ./node_modules/extend/index.js
      var extend = __nccwpck_require__(8171); // CONCATENATED MODULE: ./node_modules/unified/node_modules/is-plain-obj/index.js
      function isPlainObject(value) {
        if (Object.prototype.toString.call(value) !== '[object Object]') {
          return false;
        }

        const prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
      } // CONCATENATED MODULE: ./node_modules/trough/index.js

      /**
       * @typedef {(error?: Error|null|undefined, ...output: Array<any>) => void} Callback
       * @typedef {(...input: Array<any>) => any} Middleware
       *
       * @typedef {(...input: Array<any>) => void} Run
       *   Call all middleware.
       * @typedef {(fn: Middleware) => Pipeline} Use
       *   Add `fn` (middleware) to the list.
       * @typedef {{run: Run, use: Use}} Pipeline
       *   Middleware.
       */

      /**
       * Create new middleware.
       *
       * @returns {Pipeline}
       */
      function trough() {
        /** @type {Array<Middleware>} */
        const fns = [];
        /** @type {Pipeline} */
        const pipeline = { run, use };

        return pipeline;

        /** @type {Run} */
        function run(...values) {
          let middlewareIndex = -1;
          /** @type {Callback} */
          const callback = values.pop();

          if (typeof callback !== 'function') {
            throw new TypeError(
              'Expected function as last argument, not ' + callback
            );
          }

          next(null, ...values);

          /**
           * Run the next `fn`, or we’re done.
           *
           * @param {Error|null|undefined} error
           * @param {Array<any>} output
           */
          function next(error, ...output) {
            const fn = fns[++middlewareIndex];
            let index = -1;

            if (error) {
              callback(error);
              return;
            }

            // Copy non-nullish input into values.
            while (++index < values.length) {
              if (output[index] === null || output[index] === undefined) {
                output[index] = values[index];
              }
            }

            // Save the newly created `output` for the next call.
            values = output;

            // Next or done.
            if (fn) {
              wrap(fn, next)(...output);
            } else {
              callback(null, ...output);
            }
          }
        }

        /** @type {Use} */
        function use(middelware) {
          if (typeof middelware !== 'function') {
            throw new TypeError(
              'Expected `middelware` to be a function, not ' + middelware
            );
          }

          fns.push(middelware);
          return pipeline;
        }
      }

      /**
       * Wrap `middleware`.
       * Can be sync or async; return a promise, receive a callback, or return new
       * values and errors.
       *
       * @param {Middleware} middleware
       * @param {Callback} callback
       */
      function wrap(middleware, callback) {
        /** @type {boolean} */
        let called;

        return wrapped;

        /**
         * Call `middleware`.
         * @this {any}
         * @param {Array<any>} parameters
         * @returns {void}
         */
        function wrapped(...parameters) {
          const fnExpectsCallback = middleware.length > parameters.length;
          /** @type {any} */
          let result;

          if (fnExpectsCallback) {
            parameters.push(done);
          }

          try {
            result = middleware.apply(this, parameters);
          } catch (error) {
            const exception = /** @type {Error} */ (error);

            // Well, this is quite the pickle.
            // `middleware` received a callback and called it synchronously, but that
            // threw an error.
            // The only thing left to do is to throw the thing instead.
            if (fnExpectsCallback && called) {
              throw exception;
            }

            return done(exception);
          }

          if (!fnExpectsCallback) {
            if (result instanceof Promise) {
              result.then(then, done);
            } else if (result instanceof Error) {
              done(result);
            } else {
              then(result);
            }
          }
        }

        /**
         * Call `callback`, only once.
         * @type {Callback}
         */
        function done(error, ...output) {
          if (!called) {
            called = true;
            callback(error, ...output);
          }
        }

        /**
         * Call `done` with one value.
         *
         * @param {any} [value]
         */
        function then(value) {
          done(null, value);
        }
      }

      // EXTERNAL MODULE: ./node_modules/vfile/node_modules/is-buffer/index.js
      var node_modules_is_buffer = __nccwpck_require__(2157); // CONCATENATED MODULE: ./node_modules/unist-util-stringify-position/index.js
      /**
       * @typedef {import('unist').Point} Point
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Position} Position
       * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
       */

      /**
       * Stringify one point, a position (start and end points), or a node’s
       * positional information.
       *
       * @param {Node|NodeLike|Position|Point|null} [value]
       * @returns {string}
       */
      function stringifyPosition(value) {
        // Nothing.
        if (!value || typeof value !== 'object') {
          return '';
        }

        // Node.
        if ('position' in value || 'type' in value) {
          return position(value.position);
        }

        // Position.
        if ('start' in value || 'end' in value) {
          return position(value);
        }

        // Point.
        if ('line' in value || 'column' in value) {
          return point(value);
        }

        // ?
        return '';
      }

      /**
       * @param {Point|undefined} point
       * @returns {string}
       */
      function point(point) {
        return index(point && point.line) + ':' + index(point && point.column);
      }

      /**
       * @param {Position|undefined} pos
       * @returns {string}
       */
      function position(pos) {
        return point(pos && pos.start) + '-' + point(pos && pos.end);
      }

      /**
       * @param {number|undefined} value
       * @returns {number}
       */
      function index(value) {
        return value && typeof value === 'number' ? value : 1;
      } // CONCATENATED MODULE: ./node_modules/vfile-message/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Position} Position
       * @typedef {import('unist').Point} Point
       * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
       */

      class VFileMessage extends Error {
        /**
         * Constructor of a message for `reason` at `place` from `origin`.
         * When an error is passed in as `reason`, copies the `stack`.
         *
         * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
         * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
         * @param {string} [origin] Place in code the message originates from (`string`, optional).
         */
        constructor(reason, place, origin) {
          /** @type {[string|null, string|null]} */
          const parts = [null, null];
          /** @type {Position} */
          let position = {
            // @ts-expect-error: we always follows the structure of `position`.
            start: { line: null, column: null },
            // @ts-expect-error: "
            end: { line: null, column: null },
          };

          super();

          if (typeof place === 'string') {
            origin = place;
            place = undefined;
          }

          if (typeof origin === 'string') {
            const index = origin.indexOf(':');

            if (index === -1) {
              parts[1] = origin;
            } else {
              parts[0] = origin.slice(0, index);
              parts[1] = origin.slice(index + 1);
            }
          }

          if (place) {
            // Node.
            if ('type' in place || 'position' in place) {
              if (place.position) {
                position = place.position;
              }
            }
            // Position.
            else if ('start' in place || 'end' in place) {
              position = place;
            }
            // Point.
            else if ('line' in place || 'column' in place) {
              position.start = place;
            }
          }

          // Fields from `Error`
          this.name = stringifyPosition(place) || '1:1';
          this.message = typeof reason === 'object' ? reason.message : reason;
          this.stack = typeof reason === 'object' ? reason.stack : '';

          /**
           * Reason for message.
           * @type {string}
           */
          this.reason = this.message;
          /**
           * If true, marks associated file as no longer processable.
           * @type {boolean?}
           */
          // eslint-disable-next-line no-unused-expressions
          this.fatal;
          /**
           * Starting line of error.
           * @type {number?}
           */
          this.line = position.start.line;
          /**
           * Starting column of error.
           * @type {number?}
           */
          this.column = position.start.column;
          /**
           * Namespace of warning.
           * @type {string?}
           */
          this.source = parts[0];
          /**
           * Category of message.
           * @type {string?}
           */
          this.ruleId = parts[1];
          /**
           * Full range information, when available.
           * Has start and end properties, both set to an object with line and column, set to number?.
           * @type {Position?}
           */
          this.position = position;

          // The following fields are “well known”.
          // Not standard.
          // Feel free to add other non-standard fields to your messages.

          /* eslint-disable no-unused-expressions */
          /**
           * You can use this to specify the source value that’s being reported, which
           * is deemed incorrect.
           * @type {string?}
           */
          this.actual;
          /**
           * You can use this to suggest values that should be used instead of
           * `actual`, one or more values that are deemed as acceptable.
           * @type {Array<string>?}
           */
          this.expected;
          /**
           * You may add a file property with a path of a file (used throughout the VFile ecosystem).
           * @type {string?}
           */
          this.file;
          /**
           * You may add a url property with a link to documentation for the message.
           * @type {string?}
           */
          this.url;
          /**
           * You may add a note property with a long form description of the message (supported by vfile-reporter).
           * @type {string?}
           */
          this.note;
          /* eslint-enable no-unused-expressions */
        }
      }

      VFileMessage.prototype.file = '';
      VFileMessage.prototype.name = '';
      VFileMessage.prototype.reason = '';
      VFileMessage.prototype.message = '';
      VFileMessage.prototype.stack = '';
      VFileMessage.prototype.fatal = null;
      VFileMessage.prototype.column = null;
      VFileMessage.prototype.line = null;
      VFileMessage.prototype.source = null;
      VFileMessage.prototype.ruleId = null;
      VFileMessage.prototype.position = null;

      // EXTERNAL MODULE: external "path"
      var external_path_ = __nccwpck_require__(1017); // CONCATENATED MODULE: external "process"
      const external_process_namespaceObject = require('process'); // CONCATENATED MODULE: ./node_modules/vfile/lib/minurl.shared.js
      /**
       * @typedef URL
       * @property {string} hash
       * @property {string} host
       * @property {string} hostname
       * @property {string} href
       * @property {string} origin
       * @property {string} password
       * @property {string} pathname
       * @property {string} port
       * @property {string} protocol
       * @property {string} search
       * @property {any} searchParams
       * @property {string} username
       * @property {() => string} toString
       * @property {() => string} toJSON
       */

      /**
       * @param {unknown} fileURLOrPath
       * @returns {fileURLOrPath is URL}
       */
      // From: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js#L1501>
      function isUrl(fileURLOrPath) {
        return (
          fileURLOrPath !== null &&
          typeof fileURLOrPath === 'object' &&
          // @ts-expect-error: indexable.
          fileURLOrPath.href &&
          // @ts-expect-error: indexable.
          fileURLOrPath.origin
        );
      }

      // EXTERNAL MODULE: external "url"
      var external_url_ = __nccwpck_require__(7310); // CONCATENATED MODULE: ./node_modules/vfile/lib/index.js
      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Position} Position
       * @typedef {import('unist').Point} Point
       * @typedef {Record<string, unknown> & {type: string, position?: Position|undefined}} NodeLike
       * @typedef {import('./minurl.shared.js').URL} URL
       * @typedef {import('..').VFileData} VFileData
       * @typedef {import('..').VFileValue} VFileValue
       *
       * @typedef {'ascii'|'utf8'|'utf-8'|'utf16le'|'ucs2'|'ucs-2'|'base64'|'base64url'|'latin1'|'binary'|'hex'} BufferEncoding
       *   Encodings supported by the buffer class.
       *   This is a copy of the typing from Node, copied to prevent Node globals from
       *   being needed.
       *   Copied from: <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/90a4ec8/types/node/buffer.d.ts#L170>
       *
       * @typedef {VFileValue|VFileOptions|VFile|URL} VFileCompatible
       *   Things that can be passed to the constructor.
       *
       * @typedef VFileCoreOptions
       * @property {VFileValue} [value]
       * @property {string} [cwd]
       * @property {Array<string>} [history]
       * @property {string|URL} [path]
       * @property {string} [basename]
       * @property {string} [stem]
       * @property {string} [extname]
       * @property {string} [dirname]
       * @property {VFileData} [data]
       *
       * @typedef Map
       *   Raw source map, see:
       *   <https://github.com/mozilla/source-map/blob/58819f0/source-map.d.ts#L15-L23>.
       * @property {number} version
       * @property {Array<string>} sources
       * @property {Array<string>} names
       * @property {string|undefined} [sourceRoot]
       * @property {Array<string>|undefined} [sourcesContent]
       * @property {string} mappings
       * @property {string} file
       *
       * @typedef {{[key: string]: unknown} & VFileCoreOptions} VFileOptions
       *   Configuration: a bunch of keys that will be shallow copied over to the new
       *   file.
       *
       * @typedef {Record<string, unknown>} VFileReporterSettings
       * @typedef {<T = VFileReporterSettings>(files: Array<VFile>, options: T) => string} VFileReporter
       */

      // Order of setting (least specific to most), we need this because otherwise
      // `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
      // stem can be set.
      const order = [
        'history',
        'path',
        'basename',
        'stem',
        'extname',
        'dirname',
      ];

      class VFile {
        /**
         * Create a new virtual file.
         *
         * If `options` is `string` or `Buffer`, treats it as `{value: options}`.
         * If `options` is a `VFile`, shallow copies its data over to the new file.
         * All other given fields are set on the newly created `VFile`.
         *
         * Path related properties are set in the following order (least specific to
         * most specific): `history`, `path`, `basename`, `stem`, `extname`,
         * `dirname`.
         *
         * It’s not possible to set either `dirname` or `extname` without setting
         * either `history`, `path`, `basename`, or `stem` as well.
         *
         * @param {VFileCompatible} [value]
         */
        constructor(value) {
          /** @type {VFileOptions} */
          let options;

          if (!value) {
            options = {};
          } else if (
            typeof value === 'string' ||
            node_modules_is_buffer(value)
          ) {
            // @ts-expect-error Looks like a buffer.
            options = { value };
          } else if (isUrl(value)) {
            options = { path: value };
          } else {
            // @ts-expect-error Looks like file or options.
            options = value;
          }

          /**
           * Place to store custom information.
           * It’s OK to store custom data directly on the file, moving it to `data`
           * gives a little more privacy.
           * @type {VFileData}
           */
          this.data = {};

          /**
           * List of messages associated with the file.
           * @type {Array<VFileMessage>}
           */
          this.messages = [];

          /**
           * List of file paths the file moved between.
           * @type {Array<string>}
           */
          this.history = [];

          /**
           * Base of `path`.
           * Defaults to `process.cwd()` (`/` in browsers).
           * @type {string}
           */
          this.cwd = external_process_namespaceObject.cwd();

          /* eslint-disable no-unused-expressions */
          /**
           * Raw value.
           * @type {VFileValue}
           */
          this.value;

          // The below are non-standard, they are “well-known”.
          // As in, used in several tools.

          /**
           * Whether a file was saved to disk.
           * This is used by vfile reporters.
           * @type {boolean}
           */
          this.stored;

          /**
           * Sometimes files have a non-string representation.
           * This can be stored in the `result` field.
           * One example is when turning markdown into React nodes.
           * This is used by unified to store non-string results.
           * @type {unknown}
           */
          this.result;

          /**
           * Sometimes files have a source map associated with them.
           * This can be stored in the `map` field.
           * This should be a `RawSourceMap` type from the `source-map` module.
           * @type {Map|undefined}
           */
          this.map;
          /* eslint-enable no-unused-expressions */

          // Set path related properties in the correct order.
          let index = -1;

          while (++index < order.length) {
            const prop = order[index];

            // Note: we specifically use `in` instead of `hasOwnProperty` to accept
            // `vfile`s too.
            if (prop in options && options[prop] !== undefined) {
              // @ts-expect-error: TS is confused by the different types for `history`.
              this[prop] =
                prop === 'history' ? [...options[prop]] : options[prop];
            }
          }

          /** @type {string} */
          let prop;

          // Set non-path related properties.
          for (prop in options) {
            // @ts-expect-error: fine to set other things.
            if (!order.includes(prop)) this[prop] = options[prop];
          }
        }

        /**
         * Access full path (`~/index.min.js`).
         *
         * @returns {string}
         */
        get path() {
          return this.history[this.history.length - 1];
        }

        /**
         * Set full path (`~/index.min.js`).
         * Cannot be nullified.
         *
         * @param {string|URL} path
         */
        set path(path) {
          if (isUrl(path)) {
            path = (0, external_url_.fileURLToPath)(path);
          }

          assertNonEmpty(path, 'path');

          if (this.path !== path) {
            this.history.push(path);
          }
        }

        /**
         * Access parent path (`~`).
         */
        get dirname() {
          return typeof this.path === 'string'
            ? external_path_.dirname(this.path)
            : undefined;
        }

        /**
         * Set parent path (`~`).
         * Cannot be set if there's no `path` yet.
         */
        set dirname(dirname) {
          assertPath(this.basename, 'dirname');
          this.path = external_path_.join(dirname || '', this.basename);
        }

        /**
         * Access basename (including extname) (`index.min.js`).
         */
        get basename() {
          return typeof this.path === 'string'
            ? external_path_.basename(this.path)
            : undefined;
        }

        /**
         * Set basename (`index.min.js`).
         * Cannot contain path separators.
         * Cannot be nullified either (use `file.path = file.dirname` instead).
         */
        set basename(basename) {
          assertNonEmpty(basename, 'basename');
          assertPart(basename, 'basename');
          this.path = external_path_.join(this.dirname || '', basename);
        }

        /**
         * Access extname (including dot) (`.js`).
         */
        get extname() {
          return typeof this.path === 'string'
            ? external_path_.extname(this.path)
            : undefined;
        }

        /**
         * Set extname (including dot) (`.js`).
         * Cannot be set if there's no `path` yet and cannot contain path separators.
         */
        set extname(extname) {
          assertPart(extname, 'extname');
          assertPath(this.dirname, 'extname');

          if (extname) {
            if (extname.charCodeAt(0) !== 46 /* `.` */) {
              throw new Error('`extname` must start with `.`');
            }

            if (extname.includes('.', 1)) {
              throw new Error('`extname` cannot contain multiple dots');
            }
          }

          this.path = external_path_.join(
            this.dirname,
            this.stem + (extname || '')
          );
        }

        /**
         * Access stem (w/o extname) (`index.min`).
         */
        get stem() {
          return typeof this.path === 'string'
            ? external_path_.basename(this.path, this.extname)
            : undefined;
        }

        /**
         * Set stem (w/o extname) (`index.min`).
         * Cannot be nullified, and cannot contain path separators.
         */
        set stem(stem) {
          assertNonEmpty(stem, 'stem');
          assertPart(stem, 'stem');
          this.path = external_path_.join(
            this.dirname || '',
            stem + (this.extname || '')
          );
        }

        /**
         * Serialize the file.
         *
         * @param {BufferEncoding} [encoding='utf8'] If `file.value` is a buffer, `encoding` is used to serialize buffers.
         * @returns {string}
         */
        toString(encoding) {
          return (this.value || '').toString(encoding);
        }

        /**
         * Create a message and associates it w/ the file.
         *
         * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
         * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
         * @param {string} [origin] Place in code the message originates from (`string`, optional).
         * @returns {VFileMessage}
         */
        message(reason, place, origin) {
          const message = new VFileMessage(reason, place, origin);

          if (this.path) {
            message.name = this.path + ':' + message.name;
            message.file = this.path;
          }

          message.fatal = false;

          this.messages.push(message);

          return message;
        }

        /**
         * Info: create a message, associate it with the file, and mark the fatality
         * as `null`.
         * Calls `message()` internally.
         *
         * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
         * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
         * @param {string} [origin] Place in code the message originates from (`string`, optional).
         * @returns {VFileMessage}
         */
        info(reason, place, origin) {
          const message = this.message(reason, place, origin);

          message.fatal = null;

          return message;
        }

        /**
         * Fail: create a message, associate it with the file, mark the fatality as
         * `true`.
         * Note: fatal errors mean a file is no longer processable.
         * Calls `message()` internally.
         *
         * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
         * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
         * @param {string} [origin] Place in code the message originates from (`string`, optional).
         * @returns {never}
         */
        fail(reason, place, origin) {
          const message = this.message(reason, place, origin);

          message.fatal = true;

          throw message;
        }
      }

      /**
       * Assert that `part` is not a path (as in, does not contain `path.sep`).
       *
       * @param {string|undefined} part
       * @param {string} name
       * @returns {void}
       */
      function assertPart(part, name) {
        if (part && part.includes(external_path_.sep)) {
          throw new Error(
            '`' +
              name +
              '` cannot be a path: did not expect `' +
              external_path_.sep +
              '`'
          );
        }
      }

      /**
       * Assert that `part` is not empty.
       *
       * @param {string|undefined} part
       * @param {string} name
       * @returns {asserts part is string}
       */
      function assertNonEmpty(part, name) {
        if (!part) {
          throw new Error('`' + name + '` cannot be empty');
        }
      }

      /**
       * Assert `path` exists.
       *
       * @param {string|undefined} path
       * @param {string} name
       * @returns {asserts path is string}
       */
      function assertPath(path, name) {
        if (!path) {
          throw new Error(
            'Setting `' + name + '` requires `path` to be set too'
          );
        }
      } // CONCATENATED MODULE: ./node_modules/unified/lib/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('vfile').VFileCompatible} VFileCompatible
       * @typedef {import('vfile').VFileValue} VFileValue
       * @typedef {import('..').Processor} Processor
       * @typedef {import('..').Plugin} Plugin
       * @typedef {import('..').Preset} Preset
       * @typedef {import('..').Pluggable} Pluggable
       * @typedef {import('..').PluggableList} PluggableList
       * @typedef {import('..').Transformer} Transformer
       * @typedef {import('..').Parser} Parser
       * @typedef {import('..').Compiler} Compiler
       * @typedef {import('..').RunCallback} RunCallback
       * @typedef {import('..').ProcessCallback} ProcessCallback
       *
       * @typedef Context
       * @property {Node} tree
       * @property {VFile} file
       */

      // Expose a frozen processor.
      const unified = base().freeze();

      const own = {}.hasOwnProperty;

      // Function to create the first processor.
      /**
       * @returns {Processor}
       */
      function base() {
        const transformers = trough();
        /** @type {Processor['attachers']} */
        const attachers = [];
        /** @type {Record<string, unknown>} */
        let namespace = {};
        /** @type {boolean|undefined} */
        let frozen;
        let freezeIndex = -1;

        // Data management.
        // @ts-expect-error: overloads are handled.
        processor.data = data;
        processor.Parser = undefined;
        processor.Compiler = undefined;

        // Lock.
        processor.freeze = freeze;

        // Plugins.
        processor.attachers = attachers;
        // @ts-expect-error: overloads are handled.
        processor.use = use;

        // API.
        processor.parse = parse;
        processor.stringify = stringify;
        // @ts-expect-error: overloads are handled.
        processor.run = run;
        processor.runSync = runSync;
        // @ts-expect-error: overloads are handled.
        processor.process = process;
        processor.processSync = processSync;

        // Expose.
        return processor;

        // Create a new processor based on the processor in the current scope.
        /** @type {Processor} */
        function processor() {
          const destination = base();
          let index = -1;

          while (++index < attachers.length) {
            destination.use(...attachers[index]);
          }

          destination.data(extend(true, {}, namespace));

          return destination;
        }

        /**
         * @param {string|Record<string, unknown>} [key]
         * @param {unknown} [value]
         * @returns {unknown}
         */
        function data(key, value) {
          if (typeof key === 'string') {
            // Set `key`.
            if (arguments.length === 2) {
              assertUnfrozen('data', frozen);
              namespace[key] = value;
              return processor;
            }

            // Get `key`.
            return (own.call(namespace, key) && namespace[key]) || null;
          }

          // Set space.
          if (key) {
            assertUnfrozen('data', frozen);
            namespace = key;
            return processor;
          }

          // Get space.
          return namespace;
        }

        /** @type {Processor['freeze']} */
        function freeze() {
          if (frozen) {
            return processor;
          }

          while (++freezeIndex < attachers.length) {
            const [attacher, ...options] = attachers[freezeIndex];

            if (options[0] === false) {
              continue;
            }

            if (options[0] === true) {
              options[0] = undefined;
            }

            /** @type {Transformer|void} */
            const transformer = attacher.call(processor, ...options);

            if (typeof transformer === 'function') {
              transformers.use(transformer);
            }
          }

          frozen = true;
          freezeIndex = Number.POSITIVE_INFINITY;

          return processor;
        }

        /**
         * @param {Pluggable|null|undefined} [value]
         * @param {...unknown} options
         * @returns {Processor}
         */
        function use(value, ...options) {
          /** @type {Record<string, unknown>|undefined} */
          let settings;

          assertUnfrozen('use', frozen);

          if (value === null || value === undefined) {
            // Empty.
          } else if (typeof value === 'function') {
            addPlugin(value, ...options);
          } else if (typeof value === 'object') {
            if (Array.isArray(value)) {
              addList(value);
            } else {
              addPreset(value);
            }
          } else {
            throw new TypeError('Expected usable value, not `' + value + '`');
          }

          if (settings) {
            namespace.settings = Object.assign(
              namespace.settings || {},
              settings
            );
          }

          return processor;

          /**
           * @param {import('..').Pluggable<unknown[]>} value
           * @returns {void}
           */
          function add(value) {
            if (typeof value === 'function') {
              addPlugin(value);
            } else if (typeof value === 'object') {
              if (Array.isArray(value)) {
                const [plugin, ...options] = value;
                addPlugin(plugin, ...options);
              } else {
                addPreset(value);
              }
            } else {
              throw new TypeError('Expected usable value, not `' + value + '`');
            }
          }

          /**
           * @param {Preset} result
           * @returns {void}
           */
          function addPreset(result) {
            addList(result.plugins);

            if (result.settings) {
              settings = Object.assign(settings || {}, result.settings);
            }
          }

          /**
           * @param {PluggableList|null|undefined} [plugins]
           * @returns {void}
           */
          function addList(plugins) {
            let index = -1;

            if (plugins === null || plugins === undefined) {
              // Empty.
            } else if (Array.isArray(plugins)) {
              while (++index < plugins.length) {
                const thing = plugins[index];
                add(thing);
              }
            } else {
              throw new TypeError(
                'Expected a list of plugins, not `' + plugins + '`'
              );
            }
          }

          /**
           * @param {Plugin} plugin
           * @param {...unknown} [value]
           * @returns {void}
           */
          function addPlugin(plugin, value) {
            let index = -1;
            /** @type {Processor['attachers'][number]|undefined} */
            let entry;

            while (++index < attachers.length) {
              if (attachers[index][0] === plugin) {
                entry = attachers[index];
                break;
              }
            }

            if (entry) {
              if (isPlainObject(entry[1]) && isPlainObject(value)) {
                value = extend(true, entry[1], value);
              }

              entry[1] = value;
            } else {
              // @ts-expect-error: fine.
              attachers.push([...arguments]);
            }
          }
        }

        /** @type {Processor['parse']} */
        function parse(doc) {
          processor.freeze();
          const file = vfile(doc);
          const Parser = processor.Parser;
          assertParser('parse', Parser);

          if (newable(Parser, 'parse')) {
            // @ts-expect-error: `newable` checks this.
            return new Parser(String(file), file).parse();
          }

          // @ts-expect-error: `newable` checks this.
          return Parser(String(file), file); // eslint-disable-line new-cap
        }

        /** @type {Processor['stringify']} */
        function stringify(node, doc) {
          processor.freeze();
          const file = vfile(doc);
          const Compiler = processor.Compiler;
          assertCompiler('stringify', Compiler);
          assertNode(node);

          if (newable(Compiler, 'compile')) {
            // @ts-expect-error: `newable` checks this.
            return new Compiler(node, file).compile();
          }

          // @ts-expect-error: `newable` checks this.
          return Compiler(node, file); // eslint-disable-line new-cap
        }

        /**
         * @param {Node} node
         * @param {VFileCompatible|RunCallback} [doc]
         * @param {RunCallback} [callback]
         * @returns {Promise<Node>|void}
         */
        function run(node, doc, callback) {
          assertNode(node);
          processor.freeze();

          if (!callback && typeof doc === 'function') {
            callback = doc;
            doc = undefined;
          }

          if (!callback) {
            return new Promise(executor);
          }

          executor(null, callback);

          /**
           * @param {null|((node: Node) => void)} resolve
           * @param {(error: Error) => void} reject
           * @returns {void}
           */
          function executor(resolve, reject) {
            // @ts-expect-error: `doc` can’t be a callback anymore, we checked.
            transformers.run(node, vfile(doc), done);

            /**
             * @param {Error|null} error
             * @param {Node} tree
             * @param {VFile} file
             * @returns {void}
             */
            function done(error, tree, file) {
              tree = tree || node;
              if (error) {
                reject(error);
              } else if (resolve) {
                resolve(tree);
              } else {
                // @ts-expect-error: `callback` is defined if `resolve` is not.
                callback(null, tree, file);
              }
            }
          }
        }

        /** @type {Processor['runSync']} */
        function runSync(node, file) {
          /** @type {Node|undefined} */
          let result;
          /** @type {boolean|undefined} */
          let complete;

          processor.run(node, file, done);

          assertDone('runSync', 'run', complete);

          // @ts-expect-error: we either bailed on an error or have a tree.
          return result;

          /**
           * @param {Error|null} [error]
           * @param {Node} [tree]
           * @returns {void}
           */
          function done(error, tree) {
            bail(error);
            result = tree;
            complete = true;
          }
        }

        /**
         * @param {VFileCompatible} doc
         * @param {ProcessCallback} [callback]
         * @returns {Promise<VFile>|undefined}
         */
        function process(doc, callback) {
          processor.freeze();
          assertParser('process', processor.Parser);
          assertCompiler('process', processor.Compiler);

          if (!callback) {
            return new Promise(executor);
          }

          executor(null, callback);

          /**
           * @param {null|((file: VFile) => void)} resolve
           * @param {(error?: Error|null|undefined) => void} reject
           * @returns {void}
           */
          function executor(resolve, reject) {
            const file = vfile(doc);

            processor.run(processor.parse(file), file, (error, tree, file) => {
              if (error || !tree || !file) {
                done(error);
              } else {
                /** @type {unknown} */
                const result = processor.stringify(tree, file);

                if (result === undefined || result === null) {
                  // Empty.
                } else if (looksLikeAVFileValue(result)) {
                  file.value = result;
                } else {
                  file.result = result;
                }

                done(error, file);
              }
            });

            /**
             * @param {Error|null|undefined} [error]
             * @param {VFile|undefined} [file]
             * @returns {void}
             */
            function done(error, file) {
              if (error || !file) {
                reject(error);
              } else if (resolve) {
                resolve(file);
              } else {
                // @ts-expect-error: `callback` is defined if `resolve` is not.
                callback(null, file);
              }
            }
          }
        }

        /** @type {Processor['processSync']} */
        function processSync(doc) {
          /** @type {boolean|undefined} */
          let complete;

          processor.freeze();
          assertParser('processSync', processor.Parser);
          assertCompiler('processSync', processor.Compiler);

          const file = vfile(doc);

          processor.process(file, done);

          assertDone('processSync', 'process', complete);

          return file;

          /**
           * @param {Error|null|undefined} [error]
           * @returns {void}
           */
          function done(error) {
            complete = true;
            bail(error);
          }
        }
      }

      /**
       * Check if `value` is a constructor.
       *
       * @param {unknown} value
       * @param {string} name
       * @returns {boolean}
       */
      function newable(value, name) {
        return (
          typeof value === 'function' &&
          // Prototypes do exist.
          // type-coverage:ignore-next-line
          value.prototype &&
          // A function with keys in its prototype is probably a constructor.
          // Classes’ prototype methods are not enumerable, so we check if some value
          // exists in the prototype.
          // type-coverage:ignore-next-line
          (keys(value.prototype) || name in value.prototype)
        );
      }

      /**
       * Check if `value` is an object with keys.
       *
       * @param {Record<string, unknown>} value
       * @returns {boolean}
       */
      function keys(value) {
        /** @type {string} */
        let key;

        for (key in value) {
          if (own.call(value, key)) {
            return true;
          }
        }

        return false;
      }

      /**
       * Assert a parser is available.
       *
       * @param {string} name
       * @param {unknown} value
       * @returns {asserts value is Parser}
       */
      function assertParser(name, value) {
        if (typeof value !== 'function') {
          throw new TypeError('Cannot `' + name + '` without `Parser`');
        }
      }

      /**
       * Assert a compiler is available.
       *
       * @param {string} name
       * @param {unknown} value
       * @returns {asserts value is Compiler}
       */
      function assertCompiler(name, value) {
        if (typeof value !== 'function') {
          throw new TypeError('Cannot `' + name + '` without `Compiler`');
        }
      }

      /**
       * Assert the processor is not frozen.
       *
       * @param {string} name
       * @param {unknown} frozen
       * @returns {asserts frozen is false}
       */
      function assertUnfrozen(name, frozen) {
        if (frozen) {
          throw new Error(
            'Cannot call `' +
              name +
              '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
          );
        }
      }

      /**
       * Assert `node` is a unist node.
       *
       * @param {unknown} node
       * @returns {asserts node is Node}
       */
      function assertNode(node) {
        // `isPlainObj` unfortunately uses `any` instead of `unknown`.
        // type-coverage:ignore-next-line
        if (!isPlainObject(node) || typeof node.type !== 'string') {
          throw new TypeError('Expected node, got `' + node + '`');
          // Fine.
        }
      }

      /**
       * Assert that `complete` is `true`.
       *
       * @param {string} name
       * @param {string} asyncName
       * @param {unknown} complete
       * @returns {asserts complete is true}
       */
      function assertDone(name, asyncName, complete) {
        if (!complete) {
          throw new Error(
            '`' + name + '` finished async. Use `' + asyncName + '` instead'
          );
        }
      }

      /**
       * @param {VFileCompatible} [value]
       * @returns {VFile}
       */
      function vfile(value) {
        return looksLikeAVFile(value) ? value : new VFile(value);
      }

      /**
       * @param {VFileCompatible} [value]
       * @returns {value is VFile}
       */
      function looksLikeAVFile(value) {
        return Boolean(
          value &&
            typeof value === 'object' &&
            'message' in value &&
            'messages' in value
        );
      }

      /**
       * @param {unknown} [value]
       * @returns {value is VFileValue}
       */
      function looksLikeAVFileValue(value) {
        return typeof value === 'string' || is_buffer(value);
      }

      // EXTERNAL MODULE: ./node_modules/mdast-util-to-string/index.js
      var mdast_util_to_string = __nccwpck_require__(9165); // CONCATENATED MODULE: ./node_modules/micromark-util-chunked/index.js
      /**
       * Like `Array#splice`, but smarter for giant arrays.
       *
       * `Array#splice` takes all items to be inserted as individual argument which
       * causes a stack overflow in V8 when trying to insert 100k items for instance.
       *
       * Otherwise, this does not return the removed items, and takes `items` as an
       * array instead of rest parameters.
       *
       * @template {unknown} T
       * @param {T[]} list
       * @param {number} start
       * @param {number} remove
       * @param {T[]} items
       * @returns {void}
       */
      function splice(list, start, remove, items) {
        const end = list.length;
        let chunkStart = 0;
        /** @type {unknown[]} */

        let parameters; // Make start between zero and `end` (included).

        if (start < 0) {
          start = -start > end ? 0 : end + start;
        } else {
          start = start > end ? end : start;
        }

        remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

        if (items.length < 10000) {
          parameters = Array.from(items);
          parameters.unshift(start, remove); // @ts-expect-error Hush, it’s fine.
          [].splice.apply(list, parameters);
        } else {
          // Delete `remove` items starting from `start`
          if (remove) [].splice.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

          while (chunkStart < items.length) {
            parameters = items.slice(chunkStart, chunkStart + 10000);
            parameters.unshift(start, 0); // @ts-expect-error Hush, it’s fine.
            [].splice.apply(list, parameters);
            chunkStart += 10000;
            start += 10000;
          }
        }
      }
      /**
       * Append `items` (an array) at the end of `list` (another array).
       * When `list` was empty, returns `items` instead.
       *
       * This prevents a potentially expensive operation when `list` is empty,
       * and adds items in batches to prevent V8 from hanging.
       *
       * @template {unknown} T
       * @param {T[]} list
       * @param {T[]} items
       * @returns {T[]}
       */

      function push(list, items) {
        if (list.length > 0) {
          splice(list, list.length, 0, items);
          return list;
        }

        return items;
      } // CONCATENATED MODULE: ./node_modules/micromark-util-combine-extensions/index.js

      /**
       * @typedef {import('micromark-util-types').NormalizedExtension} NormalizedExtension
       * @typedef {import('micromark-util-types').Extension} Extension
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
       */

      const micromark_util_combine_extensions_hasOwnProperty = {}
        .hasOwnProperty;

      /**
       * Combine several syntax extensions into one.
       *
       * @param {Extension[]} extensions List of syntax extensions.
       * @returns {NormalizedExtension} A single combined extension.
       */
      function combineExtensions(extensions) {
        /** @type {NormalizedExtension} */
        const all = {};
        let index = -1;

        while (++index < extensions.length) {
          syntaxExtension(all, extensions[index]);
        }

        return all;
      }

      /**
       * Merge `extension` into `all`.
       *
       * @param {NormalizedExtension} all Extension to merge into.
       * @param {Extension} extension Extension to merge.
       * @returns {void}
       */
      function syntaxExtension(all, extension) {
        /** @type {string} */
        let hook;

        for (hook in extension) {
          const maybe = micromark_util_combine_extensions_hasOwnProperty.call(
            all,
            hook
          )
            ? all[hook]
            : undefined;
          const left = maybe || (all[hook] = {});
          const right = extension[hook];
          /** @type {string} */
          let code;

          for (code in right) {
            if (
              !micromark_util_combine_extensions_hasOwnProperty.call(left, code)
            )
              left[code] = [];
            const value = right[code];
            constructs(
              // @ts-expect-error Looks like a list.
              left[code],
              Array.isArray(value) ? value : value ? [value] : []
            );
          }
        }
      }

      /**
       * Merge `list` into `existing` (both lists of constructs).
       * Mutates `existing`.
       *
       * @param {unknown[]} existing
       * @param {unknown[]} list
       * @returns {void}
       */
      function constructs(existing, list) {
        let index = -1;
        /** @type {unknown[]} */
        const before = [];

        while (++index < list.length) {
          // @ts-expect-error Looks like an object.
          (list[index].add === 'after' ? existing : before).push(list[index]);
        }

        splice(existing, 0, 0, before);
      }

      /**
       * Combine several HTML extensions into one.
       *
       * @param {HtmlExtension[]} htmlExtensions List of HTML extensions.
       * @returns {HtmlExtension} A single combined extension.
       */
      function combineHtmlExtensions(htmlExtensions) {
        /** @type {HtmlExtension} */
        const handlers = {};
        let index = -1;

        while (++index < htmlExtensions.length) {
          htmlExtension(handlers, htmlExtensions[index]);
        }

        return handlers;
      }

      /**
       * Merge `extension` into `all`.
       *
       * @param {HtmlExtension} all Extension to merge into.
       * @param {HtmlExtension} extension Extension to merge.
       * @returns {void}
       */
      function htmlExtension(all, extension) {
        /** @type {string} */
        let hook;

        for (hook in extension) {
          const maybe = micromark_util_combine_extensions_hasOwnProperty.call(
            all,
            hook
          )
            ? all[hook]
            : undefined;
          const left = maybe || (all[hook] = {});
          const right = extension[hook];
          /** @type {string} */
          let type;

          if (right) {
            for (type in right) {
              left[type] = right[type];
            }
          }
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-util-character/lib/unicode-punctuation-regex.js

      // This module is generated by `script/`.
      //
      // CommonMark handles attention (emphasis, strong) markers based on what comes
      // before or after them.
      // One such difference is if those characters are Unicode punctuation.
      // This script is generated from the Unicode data.
      const unicodePunctuationRegex =
        /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/; // CONCATENATED MODULE: ./node_modules/micromark-util-character/index.js

      /**
       * @typedef {import('micromark-util-types').Code} Code
       */

      /**
       * Check whether the character code represents an ASCII alpha (`a` through `z`,
       * case insensitive).
       *
       * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
       *
       * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
       * to U+005A (`Z`).
       *
       * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
       * to U+007A (`z`).
       */

      const asciiAlpha = regexCheck(/[A-Za-z]/);
      /**
       * Check whether the character code represents an ASCII digit (`0` through `9`).
       *
       * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
       * U+0039 (`9`).
       */

      const asciiDigit = regexCheck(/\d/);
      /**
       * Check whether the character code represents an ASCII hex digit (`a` through
       * `f`, case insensitive, or `0` through `9`).
       *
       * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
       * digit, or an ASCII lower hex digit.
       *
       * An **ASCII upper hex digit** is a character in the inclusive range U+0041
       * (`A`) to U+0046 (`F`).
       *
       * An **ASCII lower hex digit** is a character in the inclusive range U+0061
       * (`a`) to U+0066 (`f`).
       */

      const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
      /**
       * Check whether the character code represents an ASCII alphanumeric (`a`
       * through `z`, case insensitive, or `0` through `9`).
       *
       * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
       * (see `asciiAlpha`).
       */

      const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
      /**
       * Check whether the character code represents ASCII punctuation.
       *
       * An **ASCII punctuation** is a character in the inclusive ranges U+0021
       * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
       * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
       * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
       */

      const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
      /**
       * Check whether the character code represents an ASCII atext.
       *
       * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
       * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
       * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
       * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
       * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
       * (`{`) to U+007E TILDE (`~`).
       *
       * See:
       * **\[RFC5322]**:
       * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
       * P. Resnick.
       * IETF.
       */

      const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
      /**
       * Check whether a character code is an ASCII control character.
       *
       * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
       * to U+001F (US), or U+007F (DEL).
       *
       * @param {Code} code
       * @returns {code is number}
       */

      function asciiControl(code) {
        return (
          // Special whitespace codes (which have negative values), C0 and Control
          // character DEL
          code !== null && (code < 32 || code === 127)
        );
      }
      /**
       * Check whether a character code is a markdown line ending (see
       * `markdownLineEnding`) or markdown space (see `markdownSpace`).
       *
       * @param {Code} code
       * @returns {code is number}
       */

      function markdownLineEndingOrSpace(code) {
        return code !== null && (code < 0 || code === 32);
      }
      /**
       * Check whether a character code is a markdown line ending.
       *
       * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
       * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
       *
       * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
       * RETURN (CR) are replaced by these virtual characters depending on whether
       * they occurred together.
       *
       * @param {Code} code
       * @returns {code is number}
       */

      function markdownLineEnding(code) {
        return code !== null && code < -2;
      }
      /**
       * Check whether a character code is a markdown space.
       *
       * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
       * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
       *
       * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
       * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
       * SPACE (VS) characters, depending on the column at which the tab occurred.
       *
       * @param {Code} code
       * @returns {code is number}
       */

      function markdownSpace(code) {
        return code === -2 || code === -1 || code === 32;
      }
      /**
       * Check whether the character code represents Unicode whitespace.
       *
       * Note that this does handle micromark specific markdown whitespace characters.
       * See `markdownLineEndingOrSpace` to check that.
       *
       * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
       * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
       * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
       *
       * See:
       * **\[UNICODE]**:
       * [The Unicode Standard](https://www.unicode.org/versions/).
       * Unicode Consortium.
       */

      const unicodeWhitespace = regexCheck(/\s/);
      /**
       * Check whether the character code represents Unicode punctuation.
       *
       * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
       * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
       * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
       * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
       * punctuation (see `asciiPunctuation`).
       *
       * See:
       * **\[UNICODE]**:
       * [The Unicode Standard](https://www.unicode.org/versions/).
       * Unicode Consortium.
       */
      // Size note: removing ASCII from the regex and using `asciiPunctuation` here
      // In fact adds to the bundle size.

      const unicodePunctuation = regexCheck(unicodePunctuationRegex);
      /**
       * Create a code check from a regex.
       *
       * @param {RegExp} regex
       * @returns {(code: Code) => code is number}
       */

      function regexCheck(regex) {
        return check;
        /**
         * Check whether a code matches the bound regex.
         *
         * @param {Code} code Character code
         * @returns {code is number} Whether the character code matches the bound regex
         */

        function check(code) {
          return code !== null && regex.test(String.fromCharCode(code));
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-factory-space/index.js

      /**
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').State} State
       */

      /**
       * @param {Effects} effects
       * @param {State} ok
       * @param {string} type
       * @param {number} [max=Infinity]
       * @returns {State}
       */

      function factorySpace(effects, ok, type, max) {
        const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
        let size = 0;
        return start;
        /** @type {State} */

        function start(code) {
          if (markdownSpace(code)) {
            effects.enter(type);
            return prefix(code);
          }

          return ok(code);
        }
        /** @type {State} */

        function prefix(code) {
          if (markdownSpace(code) && size++ < limit) {
            effects.consume(code);
            return prefix;
          }

          effects.exit(type);
          return ok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/initialize/content.js

      /**
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').Initializer} Initializer
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {InitialConstruct} */
      const content = {
        tokenize: initializeContent,
      };
      /** @type {Initializer} */

      function initializeContent(effects) {
        const contentStart = effects.attempt(
          this.parser.constructs.contentInitial,
          afterContentStartConstruct,
          paragraphInitial
        );
        /** @type {Token} */

        let previous;
        return contentStart;
        /** @type {State} */

        function afterContentStartConstruct(code) {
          if (code === null) {
            effects.consume(code);
            return;
          }

          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, contentStart, 'linePrefix');
        }
        /** @type {State} */

        function paragraphInitial(code) {
          effects.enter('paragraph');
          return lineStart(code);
        }
        /** @type {State} */

        function lineStart(code) {
          const token = effects.enter('chunkText', {
            contentType: 'text',
            previous,
          });

          if (previous) {
            previous.next = token;
          }

          previous = token;
          return data(code);
        }
        /** @type {State} */

        function data(code) {
          if (code === null) {
            effects.exit('chunkText');
            effects.exit('paragraph');
            effects.consume(code);
            return;
          }

          if (markdownLineEnding(code)) {
            effects.consume(code);
            effects.exit('chunkText');
            return lineStart;
          } // Data.

          effects.consume(code);
          return data;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/initialize/document.js

      /**
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').Initializer} Initializer
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Point} Point
       */

      /**
       * @typedef {Record<string, unknown>} StackState
       * @typedef {[Construct, StackState]} StackItem
       */

      /** @type {InitialConstruct} */

      const document_document = {
        tokenize: initializeDocument,
      };
      /** @type {Construct} */

      const containerConstruct = {
        tokenize: tokenizeContainer,
      };
      /** @type {Initializer} */

      function initializeDocument(effects) {
        const self = this;
        /** @type {StackItem[]} */

        const stack = [];
        let continued = 0;
        /** @type {TokenizeContext|undefined} */

        let childFlow;
        /** @type {Token|undefined} */

        let childToken;
        /** @type {number} */

        let lineStartOffset;
        return start;
        /** @type {State} */

        function start(code) {
          // First we iterate through the open blocks, starting with the root
          // document, and descending through last children down to the last open
          // block.
          // Each block imposes a condition that the line must satisfy if the block is
          // to remain open.
          // For example, a block quote requires a `>` character.
          // A paragraph requires a non-blank line.
          // In this phase we may match all or just some of the open blocks.
          // But we cannot close unmatched blocks yet, because we may have a lazy
          // continuation line.
          if (continued < stack.length) {
            const item = stack[continued];
            self.containerState = item[1];
            return effects.attempt(
              item[0].continuation,
              documentContinue,
              checkNewContainers
            )(code);
          } // Done.

          return checkNewContainers(code);
        }
        /** @type {State} */

        function documentContinue(code) {
          continued++; // Note: this field is called `_closeFlow` but it also closes containers.
          // Perhaps a good idea to rename it but it’s already used in the wild by
          // extensions.

          if (self.containerState._closeFlow) {
            self.containerState._closeFlow = undefined;

            if (childFlow) {
              closeFlow();
            } // Note: this algorithm for moving events around is similar to the
            // algorithm when dealing with lazy lines in `writeToChild`.

            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {Point|undefined} */

            let point; // Find the flow chunk.

            while (indexBeforeFlow--) {
              if (
                self.events[indexBeforeFlow][0] === 'exit' &&
                self.events[indexBeforeFlow][1].type === 'chunkFlow'
              ) {
                point = self.events[indexBeforeFlow][1].end;
                break;
              }
            }

            exitContainers(continued); // Fix positions.

            let index = indexBeforeExits;

            while (index < self.events.length) {
              self.events[index][1].end = Object.assign({}, point);
              index++;
            } // Inject the exits earlier (they’re still also at the end).

            splice(
              self.events,
              indexBeforeFlow + 1,
              0,
              self.events.slice(indexBeforeExits)
            ); // Discard the duplicate exits.

            self.events.length = index;
            return checkNewContainers(code);
          }

          return start(code);
        }
        /** @type {State} */

        function checkNewContainers(code) {
          // Next, after consuming the continuation markers for existing blocks, we
          // look for new block starts (e.g. `>` for a block quote).
          // If we encounter a new block start, we close any blocks unmatched in
          // step 1 before creating the new block as a child of the last matched
          // block.
          if (continued === stack.length) {
            // No need to `check` whether there’s a container, of `exitContainers`
            // would be moot.
            // We can instead immediately `attempt` to parse one.
            if (!childFlow) {
              return documentContinued(code);
            } // If we have concrete content, such as block HTML or fenced code,
            // we can’t have containers “pierce” into them, so we can immediately
            // start.

            if (
              childFlow.currentConstruct &&
              childFlow.currentConstruct.concrete
            ) {
              return flowStart(code);
            } // If we do have flow, it could still be a blank line,
            // but we’d be interrupting it w/ a new container if there’s a current
            // construct.

            self.interrupt = Boolean(
              childFlow.currentConstruct &&
                !childFlow._gfmTableDynamicInterruptHack
            );
          } // Check if there is a new container.

          self.containerState = {};
          return effects.check(
            containerConstruct,
            thereIsANewContainer,
            thereIsNoNewContainer
          )(code);
        }
        /** @type {State} */

        function thereIsANewContainer(code) {
          if (childFlow) closeFlow();
          exitContainers(continued);
          return documentContinued(code);
        }
        /** @type {State} */

        function thereIsNoNewContainer(code) {
          self.parser.lazy[self.now().line] = continued !== stack.length;
          lineStartOffset = self.now().offset;
          return flowStart(code);
        }
        /** @type {State} */

        function documentContinued(code) {
          // Try new containers.
          self.containerState = {};
          return effects.attempt(
            containerConstruct,
            containerContinue,
            flowStart
          )(code);
        }
        /** @type {State} */

        function containerContinue(code) {
          continued++;
          stack.push([self.currentConstruct, self.containerState]); // Try another.

          return documentContinued(code);
        }
        /** @type {State} */

        function flowStart(code) {
          if (code === null) {
            if (childFlow) closeFlow();
            exitContainers(0);
            effects.consume(code);
            return;
          }

          childFlow = childFlow || self.parser.flow(self.now());
          effects.enter('chunkFlow', {
            contentType: 'flow',
            previous: childToken,
            _tokenizer: childFlow,
          });
          return flowContinue(code);
        }
        /** @type {State} */

        function flowContinue(code) {
          if (code === null) {
            writeToChild(effects.exit('chunkFlow'), true);
            exitContainers(0);
            effects.consume(code);
            return;
          }

          if (markdownLineEnding(code)) {
            effects.consume(code);
            writeToChild(effects.exit('chunkFlow')); // Get ready for the next line.

            continued = 0;
            self.interrupt = undefined;
            return start;
          }

          effects.consume(code);
          return flowContinue;
        }
        /**
         * @param {Token} token
         * @param {boolean} [eof]
         * @returns {void}
         */

        function writeToChild(token, eof) {
          const stream = self.sliceStream(token);
          if (eof) stream.push(null);
          token.previous = childToken;
          if (childToken) childToken.next = token;
          childToken = token;
          childFlow.defineSkip(token.start);
          childFlow.write(stream); // Alright, so we just added a lazy line:
          //
          // ```markdown
          // > a
          // b.
          //
          // Or:
          //
          // > ~~~c
          // d
          //
          // Or:
          //
          // > | e |
          // f
          // ```
          //
          // The construct in the second example (fenced code) does not accept lazy
          // lines, so it marked itself as done at the end of its first line, and
          // then the content construct parses `d`.
          // Most constructs in markdown match on the first line: if the first line
          // forms a construct, a non-lazy line can’t “unmake” it.
          //
          // The construct in the third example is potentially a GFM table, and
          // those are *weird*.
          // It *could* be a table, from the first line, if the following line
          // matches a condition.
          // In this case, that second line is lazy, which “unmakes” the first line
          // and turns the whole into one content block.
          //
          // We’ve now parsed the non-lazy and the lazy line, and can figure out
          // whether the lazy line started a new flow block.
          // If it did, we exit the current containers between the two flow blocks.

          if (self.parser.lazy[token.start.line]) {
            let index = childFlow.events.length;

            while (index--) {
              if (
                // The token starts before the line ending…
                childFlow.events[index][1].start.offset < lineStartOffset && // …and either is not ended yet…
                (!childFlow.events[index][1].end || // …or ends after it.
                  childFlow.events[index][1].end.offset > lineStartOffset)
              ) {
                // Exit: there’s still something open, which means it’s a lazy line
                // part of something.
                return;
              }
            } // Note: this algorithm for moving events around is similar to the
            // algorithm when closing flow in `documentContinue`.

            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {boolean|undefined} */

            let seen;
            /** @type {Point|undefined} */

            let point; // Find the previous chunk (the one before the lazy line).

            while (indexBeforeFlow--) {
              if (
                self.events[indexBeforeFlow][0] === 'exit' &&
                self.events[indexBeforeFlow][1].type === 'chunkFlow'
              ) {
                if (seen) {
                  point = self.events[indexBeforeFlow][1].end;
                  break;
                }

                seen = true;
              }
            }

            exitContainers(continued); // Fix positions.

            index = indexBeforeExits;

            while (index < self.events.length) {
              self.events[index][1].end = Object.assign({}, point);
              index++;
            } // Inject the exits earlier (they’re still also at the end).

            splice(
              self.events,
              indexBeforeFlow + 1,
              0,
              self.events.slice(indexBeforeExits)
            ); // Discard the duplicate exits.

            self.events.length = index;
          }
        }
        /**
         * @param {number} size
         * @returns {void}
         */

        function exitContainers(size) {
          let index = stack.length; // Exit open containers.

          while (index-- > size) {
            const entry = stack[index];
            self.containerState = entry[1];
            entry[0].exit.call(self, effects);
          }

          stack.length = size;
        }

        function closeFlow() {
          childFlow.write([null]);
          childToken = undefined;
          childFlow = undefined;
          self.containerState._closeFlow = undefined;
        }
      }
      /** @type {Tokenizer} */

      function tokenizeContainer(effects, ok, nok) {
        return factorySpace(
          effects,
          effects.attempt(this.parser.constructs.document, ok, nok),
          'linePrefix',
          this.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4
        );
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/blank-line.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const blankLine = {
        tokenize: tokenizeBlankLine,
        partial: true,
      };
      /** @type {Tokenizer} */

      function tokenizeBlankLine(effects, ok, nok) {
        return factorySpace(effects, afterWhitespace, 'linePrefix');
        /** @type {State} */

        function afterWhitespace(code) {
          return code === null || markdownLineEnding(code)
            ? ok(code)
            : nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-util-subtokenize/index.js

      /**
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').Chunk} Chunk
       * @typedef {import('micromark-util-types').Event} Event
       */

      /**
       * Tokenize subcontent.
       *
       * @param {Event[]} events
       * @returns {boolean}
       */
      function subtokenize(events) {
        /** @type {Record<string, number>} */
        const jumps = {};
        let index = -1;
        /** @type {Event} */

        let event;
        /** @type {number|undefined} */

        let lineIndex;
        /** @type {number} */

        let otherIndex;
        /** @type {Event} */

        let otherEvent;
        /** @type {Event[]} */

        let parameters;
        /** @type {Event[]} */

        let subevents;
        /** @type {boolean|undefined} */

        let more;

        while (++index < events.length) {
          while (index in jumps) {
            index = jumps[index];
          }

          event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
          // is in the first content of a list item.

          if (
            index &&
            event[1].type === 'chunkFlow' &&
            events[index - 1][1].type === 'listItemPrefix'
          ) {
            subevents = event[1]._tokenizer.events;
            otherIndex = 0;

            if (
              otherIndex < subevents.length &&
              subevents[otherIndex][1].type === 'lineEndingBlank'
            ) {
              otherIndex += 2;
            }

            if (
              otherIndex < subevents.length &&
              subevents[otherIndex][1].type === 'content'
            ) {
              while (++otherIndex < subevents.length) {
                if (subevents[otherIndex][1].type === 'content') {
                  break;
                }

                if (subevents[otherIndex][1].type === 'chunkText') {
                  subevents[otherIndex][1]._isInFirstContentOfListItem = true;
                  otherIndex++;
                }
              }
            }
          } // Enter.

          if (event[0] === 'enter') {
            if (event[1].contentType) {
              Object.assign(jumps, subcontent(events, index));
              index = jumps[index];
              more = true;
            }
          } // Exit.
          else if (event[1]._container) {
            otherIndex = index;
            lineIndex = undefined;

            while (otherIndex--) {
              otherEvent = events[otherIndex];

              if (
                otherEvent[1].type === 'lineEnding' ||
                otherEvent[1].type === 'lineEndingBlank'
              ) {
                if (otherEvent[0] === 'enter') {
                  if (lineIndex) {
                    events[lineIndex][1].type = 'lineEndingBlank';
                  }

                  otherEvent[1].type = 'lineEnding';
                  lineIndex = otherIndex;
                }
              } else {
                break;
              }
            }

            if (lineIndex) {
              // Fix position.
              event[1].end = Object.assign({}, events[lineIndex][1].start); // Switch container exit w/ line endings.

              parameters = events.slice(lineIndex, index);
              parameters.unshift(event);
              splice(events, lineIndex, index - lineIndex + 1, parameters);
            }
          }
        }

        return !more;
      }
      /**
       * Tokenize embedded tokens.
       *
       * @param {Event[]} events
       * @param {number} eventIndex
       * @returns {Record<string, number>}
       */

      function subcontent(events, eventIndex) {
        const token = events[eventIndex][1];
        const context = events[eventIndex][2];
        let startPosition = eventIndex - 1;
        /** @type {number[]} */

        const startPositions = [];
        const tokenizer =
          token._tokenizer || context.parser[token.contentType](token.start);
        const childEvents = tokenizer.events;
        /** @type {[number, number][]} */

        const jumps = [];
        /** @type {Record<string, number>} */

        const gaps = {};
        /** @type {Chunk[]} */

        let stream;
        /** @type {Token|undefined} */

        let previous;
        let index = -1;
        /** @type {Token|undefined} */

        let current = token;
        let adjust = 0;
        let start = 0;
        const breaks = [start]; // Loop forward through the linked tokens to pass them in order to the
        // subtokenizer.

        while (current) {
          // Find the position of the event for this token.
          while (events[++startPosition][1] !== current) {
            // Empty.
          }

          startPositions.push(startPosition);

          if (!current._tokenizer) {
            stream = context.sliceStream(current);

            if (!current.next) {
              stream.push(null);
            }

            if (previous) {
              tokenizer.defineSkip(current.start);
            }

            if (current._isInFirstContentOfListItem) {
              tokenizer._gfmTasklistFirstContentOfListItem = true;
            }

            tokenizer.write(stream);

            if (current._isInFirstContentOfListItem) {
              tokenizer._gfmTasklistFirstContentOfListItem = undefined;
            }
          } // Unravel the next token.

          previous = current;
          current = current.next;
        } // Now, loop back through all events (and linked tokens), to figure out which
        // parts belong where.

        current = token;

        while (++index < childEvents.length) {
          if (
            // Find a void token that includes a break.
            childEvents[index][0] === 'exit' &&
            childEvents[index - 1][0] === 'enter' &&
            childEvents[index][1].type === childEvents[index - 1][1].type &&
            childEvents[index][1].start.line !== childEvents[index][1].end.line
          ) {
            start = index + 1;
            breaks.push(start); // Help GC.

            current._tokenizer = undefined;
            current.previous = undefined;
            current = current.next;
          }
        } // Help GC.

        tokenizer.events = []; // If there’s one more token (which is the cases for lines that end in an
        // EOF), that’s perfect: the last point we found starts it.
        // If there isn’t then make sure any remaining content is added to it.

        if (current) {
          // Help GC.
          current._tokenizer = undefined;
          current.previous = undefined;
        } else {
          breaks.pop();
        } // Now splice the events from the subtokenizer into the current events,
        // moving back to front so that splice indices aren’t affected.

        index = breaks.length;

        while (index--) {
          const slice = childEvents.slice(breaks[index], breaks[index + 1]);
          const start = startPositions.pop();
          jumps.unshift([start, start + slice.length - 1]);
          splice(events, start, 2, slice);
        }

        index = -1;

        while (++index < jumps.length) {
          gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
          adjust += jumps[index][1] - jumps[index][0] - 1;
        }

        return gaps;
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/content.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       */

      /**
       * No name because it must not be turned off.
       * @type {Construct}
       */
      const content_content = {
        tokenize: tokenizeContent,
        resolve: resolveContent,
      };
      /** @type {Construct} */

      const continuationConstruct = {
        tokenize: tokenizeContinuation,
        partial: true,
      };
      /**
       * Content is transparent: it’s parsed right now. That way, definitions are also
       * parsed right now: before text in paragraphs (specifically, media) are parsed.
       *
       * @type {Resolver}
       */

      function resolveContent(events) {
        subtokenize(events);
        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeContent(effects, ok) {
        /** @type {Token} */
        let previous;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('content');
          previous = effects.enter('chunkContent', {
            contentType: 'content',
          });
          return data(code);
        }
        /** @type {State} */

        function data(code) {
          if (code === null) {
            return contentEnd(code);
          }

          if (markdownLineEnding(code)) {
            return effects.check(
              continuationConstruct,
              contentContinue,
              contentEnd
            )(code);
          } // Data.

          effects.consume(code);
          return data;
        }
        /** @type {State} */

        function contentEnd(code) {
          effects.exit('chunkContent');
          effects.exit('content');
          return ok(code);
        }
        /** @type {State} */

        function contentContinue(code) {
          effects.consume(code);
          effects.exit('chunkContent');
          previous.next = effects.enter('chunkContent', {
            contentType: 'content',
            previous,
          });
          previous = previous.next;
          return data;
        }
      }
      /** @type {Tokenizer} */

      function tokenizeContinuation(effects, ok, nok) {
        const self = this;
        return startLookahead;
        /** @type {State} */

        function startLookahead(code) {
          effects.exit('chunkContent');
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, prefixed, 'linePrefix');
        }
        /** @type {State} */

        function prefixed(code) {
          if (code === null || markdownLineEnding(code)) {
            return nok(code);
          }

          const tail = self.events[self.events.length - 1];

          if (
            !self.parser.constructs.disable.null.includes('codeIndented') &&
            tail &&
            tail[1].type === 'linePrefix' &&
            tail[2].sliceSerialize(tail[1], true).length >= 4
          ) {
            return ok(code);
          }

          return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/initialize/flow.js

      /**
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').Initializer} Initializer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {InitialConstruct} */
      const flow = {
        tokenize: initializeFlow,
      };
      /** @type {Initializer} */

      function initializeFlow(effects) {
        const self = this;
        const initial = effects.attempt(
          // Try to parse a blank line.
          blankLine,
          atBlankEnding, // Try to parse initial flow (essentially, only code).
          effects.attempt(
            this.parser.constructs.flowInitial,
            afterConstruct,
            factorySpace(
              effects,
              effects.attempt(
                this.parser.constructs.flow,
                afterConstruct,
                effects.attempt(content_content, afterConstruct)
              ),
              'linePrefix'
            )
          )
        );
        return initial;
        /** @type {State} */

        function atBlankEnding(code) {
          if (code === null) {
            effects.consume(code);
            return;
          }

          effects.enter('lineEndingBlank');
          effects.consume(code);
          effects.exit('lineEndingBlank');
          self.currentConstruct = undefined;
          return initial;
        }
        /** @type {State} */

        function afterConstruct(code) {
          if (code === null) {
            effects.consume(code);
            return;
          }

          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          self.currentConstruct = undefined;
          return initial;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/initialize/text.js

      /**
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Initializer} Initializer
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */
      const resolver = {
        resolveAll: createResolver(),
      };
      const string = initializeFactory('string');
      const text_text = initializeFactory('text');
      /**
       * @param {'string'|'text'} field
       * @returns {InitialConstruct}
       */

      function initializeFactory(field) {
        return {
          tokenize: initializeText,
          resolveAll: createResolver(
            field === 'text' ? resolveAllLineSuffixes : undefined
          ),
        };
        /** @type {Initializer} */

        function initializeText(effects) {
          const self = this;
          const constructs = this.parser.constructs[field];
          const text = effects.attempt(constructs, start, notText);
          return start;
          /** @type {State} */

          function start(code) {
            return atBreak(code) ? text(code) : notText(code);
          }
          /** @type {State} */

          function notText(code) {
            if (code === null) {
              effects.consume(code);
              return;
            }

            effects.enter('data');
            effects.consume(code);
            return data;
          }
          /** @type {State} */

          function data(code) {
            if (atBreak(code)) {
              effects.exit('data');
              return text(code);
            } // Data.

            effects.consume(code);
            return data;
          }
          /**
           * @param {Code} code
           * @returns {boolean}
           */

          function atBreak(code) {
            if (code === null) {
              return true;
            }

            const list = constructs[code];
            let index = -1;

            if (list) {
              while (++index < list.length) {
                const item = list[index];

                if (!item.previous || item.previous.call(self, self.previous)) {
                  return true;
                }
              }
            }

            return false;
          }
        }
      }
      /**
       * @param {Resolver} [extraResolver]
       * @returns {Resolver}
       */

      function createResolver(extraResolver) {
        return resolveAllText;
        /** @type {Resolver} */

        function resolveAllText(events, context) {
          let index = -1;
          /** @type {number|undefined} */

          let enter; // A rather boring computation (to merge adjacent `data` events) which
          // improves mm performance by 29%.

          while (++index <= events.length) {
            if (enter === undefined) {
              if (events[index] && events[index][1].type === 'data') {
                enter = index;
                index++;
              }
            } else if (!events[index] || events[index][1].type !== 'data') {
              // Don’t do anything if there is one data token.
              if (index !== enter + 2) {
                events[enter][1].end = events[index - 1][1].end;
                events.splice(enter + 2, index - enter - 2);
                index = enter + 2;
              }

              enter = undefined;
            }
          }

          return extraResolver ? extraResolver(events, context) : events;
        }
      }
      /**
       * A rather ugly set of instructions which again looks at chunks in the input
       * stream.
       * The reason to do this here is that it is *much* faster to parse in reverse.
       * And that we can’t hook into `null` to split the line suffix before an EOF.
       * To do: figure out if we can make this into a clean utility, or even in core.
       * As it will be useful for GFMs literal autolink extension (and maybe even
       * tables?)
       *
       * @type {Resolver}
       */

      function resolveAllLineSuffixes(events, context) {
        let eventIndex = 0; // Skip first.

        while (++eventIndex <= events.length) {
          if (
            (eventIndex === events.length ||
              events[eventIndex][1].type === 'lineEnding') &&
            events[eventIndex - 1][1].type === 'data'
          ) {
            const data = events[eventIndex - 1][1];
            const chunks = context.sliceStream(data);
            let index = chunks.length;
            let bufferIndex = -1;
            let size = 0;
            /** @type {boolean|undefined} */

            let tabs;

            while (index--) {
              const chunk = chunks[index];

              if (typeof chunk === 'string') {
                bufferIndex = chunk.length;

                while (chunk.charCodeAt(bufferIndex - 1) === 32) {
                  size++;
                  bufferIndex--;
                }

                if (bufferIndex) break;
                bufferIndex = -1;
              } // Number
              else if (chunk === -2) {
                tabs = true;
                size++;
              } else if (chunk === -1) {
                // Empty
              } else {
                // Replacement character, exit.
                index++;
                break;
              }
            }

            if (size) {
              const token = {
                type:
                  eventIndex === events.length || tabs || size < 2
                    ? 'lineSuffix'
                    : 'hardBreakTrailing',
                start: {
                  line: data.end.line,
                  column: data.end.column - size,
                  offset: data.end.offset - size,
                  _index: data.start._index + index,
                  _bufferIndex: index
                    ? bufferIndex
                    : data.start._bufferIndex + bufferIndex,
                },
                end: Object.assign({}, data.end),
              };
              data.end = Object.assign({}, token.start);

              if (data.start.offset === data.end.offset) {
                Object.assign(data, token);
              } else {
                events.splice(
                  eventIndex,
                  0,
                  ['enter', token, context],
                  ['exit', token, context]
                );
                eventIndex += 2;
              }
            }

            eventIndex++;
          }
        }

        return events;
      } // CONCATENATED MODULE: ./node_modules/micromark-util-resolve-all/index.js

      /**
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').Event} Event
       * @typedef {import('micromark-util-types').Resolver} Resolver
       */

      /**
       * Call all `resolveAll`s.
       *
       * @param {{resolveAll?: Resolver}[]} constructs
       * @param {Event[]} events
       * @param {TokenizeContext} context
       * @returns {Event[]}
       */
      function resolveAll(constructs, events, context) {
        /** @type {Resolver[]} */
        const called = [];
        let index = -1;

        while (++index < constructs.length) {
          const resolve = constructs[index].resolveAll;

          if (resolve && !called.includes(resolve)) {
            events = resolve(events, context);
            called.push(resolve);
          }
        }

        return events;
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/create-tokenizer.js

      /**
       * @typedef {import('micromark-util-types').Code} Code
       * @typedef {import('micromark-util-types').Chunk} Chunk
       * @typedef {import('micromark-util-types').Point} Point
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').ParseContext} ParseContext
       */

      /**
       * @typedef Info
       * @property {() => void} restore
       * @property {number} from
       *
       * @callback ReturnHandle
       *   Handle a successful run.
       * @param {Construct} construct
       * @param {Info} info
       * @returns {void}
       */

      /**
       * Create a tokenizer.
       * Tokenizers deal with one type of data (e.g., containers, flow, text).
       * The parser is the object dealing with it all.
       * `initialize` works like other constructs, except that only its `tokenize`
       * function is used, in which case it doesn’t receive an `ok` or `nok`.
       * `from` can be given to set the point before the first character, although
       * when further lines are indented, they must be set with `defineSkip`.
       *
       * @param {ParseContext} parser
       * @param {InitialConstruct} initialize
       * @param {Omit<Point, '_index'|'_bufferIndex'>} [from]
       * @returns {TokenizeContext}
       */
      function createTokenizer(parser, initialize, from) {
        /** @type {Point} */
        let point = Object.assign(
          from
            ? Object.assign({}, from)
            : {
                line: 1,
                column: 1,
                offset: 0,
              },
          {
            _index: 0,
            _bufferIndex: -1,
          }
        );
        /** @type {Record<string, number>} */

        const columnStart = {};
        /** @type {Construct[]} */

        const resolveAllConstructs = [];
        /** @type {Chunk[]} */

        let chunks = [];
        /** @type {Token[]} */

        let stack = [];
        /** @type {boolean|undefined} */

        let consumed = true;
        /**
         * Tools used for tokenizing.
         *
         * @type {Effects}
         */

        const effects = {
          consume,
          enter,
          exit,
          attempt: constructFactory(onsuccessfulconstruct),
          check: constructFactory(onsuccessfulcheck),
          interrupt: constructFactory(onsuccessfulcheck, {
            interrupt: true,
          }),
        };
        /**
         * State and tools for resolving and serializing.
         *
         * @type {TokenizeContext}
         */

        const context = {
          previous: null,
          code: null,
          containerState: {},
          events: [],
          parser,
          sliceStream,
          sliceSerialize,
          now,
          defineSkip,
          write,
        };
        /**
         * The state function.
         *
         * @type {State|void}
         */

        let state = initialize.tokenize.call(context, effects);
        /**
         * Track which character we expect to be consumed, to catch bugs.
         *
         * @type {Code}
         */

        let expectedCode;

        if (initialize.resolveAll) {
          resolveAllConstructs.push(initialize);
        }

        return context;
        /** @type {TokenizeContext['write']} */

        function write(slice) {
          chunks = push(chunks, slice);
          main(); // Exit if we’re not done, resolve might change stuff.

          if (chunks[chunks.length - 1] !== null) {
            return [];
          }

          addResult(initialize, 0); // Otherwise, resolve, and exit.

          context.events = resolveAll(
            resolveAllConstructs,
            context.events,
            context
          );
          return context.events;
        } //
        // Tools.
        //

        /** @type {TokenizeContext['sliceSerialize']} */

        function sliceSerialize(token, expandTabs) {
          return serializeChunks(sliceStream(token), expandTabs);
        }
        /** @type {TokenizeContext['sliceStream']} */

        function sliceStream(token) {
          return sliceChunks(chunks, token);
        }
        /** @type {TokenizeContext['now']} */

        function now() {
          return Object.assign({}, point);
        }
        /** @type {TokenizeContext['defineSkip']} */

        function defineSkip(value) {
          columnStart[value.line] = value.column;
          accountForPotentialSkip();
        } //
        // State management.
        //

        /**
         * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
         * `consume`).
         * Here is where we walk through the chunks, which either include strings of
         * several characters, or numerical character codes.
         * The reason to do this in a loop instead of a call is so the stack can
         * drain.
         *
         * @returns {void}
         */

        function main() {
          /** @type {number} */
          let chunkIndex;

          while (point._index < chunks.length) {
            const chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

            if (typeof chunk === 'string') {
              chunkIndex = point._index;

              if (point._bufferIndex < 0) {
                point._bufferIndex = 0;
              }

              while (
                point._index === chunkIndex &&
                point._bufferIndex < chunk.length
              ) {
                go(chunk.charCodeAt(point._bufferIndex));
              }
            } else {
              go(chunk);
            }
          }
        }
        /**
         * Deal with one code.
         *
         * @param {Code} code
         * @returns {void}
         */

        function go(code) {
          consumed = undefined;
          expectedCode = code;
          state = state(code);
        }
        /** @type {Effects['consume']} */

        function consume(code) {
          if (markdownLineEnding(code)) {
            point.line++;
            point.column = 1;
            point.offset += code === -3 ? 2 : 1;
            accountForPotentialSkip();
          } else if (code !== -1) {
            point.column++;
            point.offset++;
          } // Not in a string chunk.

          if (point._bufferIndex < 0) {
            point._index++;
          } else {
            point._bufferIndex++; // At end of string chunk.
            // @ts-expect-error Points w/ non-negative `_bufferIndex` reference
            // strings.

            if (point._bufferIndex === chunks[point._index].length) {
              point._bufferIndex = -1;
              point._index++;
            }
          } // Expose the previous character.

          context.previous = code; // Mark as consumed.

          consumed = true;
        }
        /** @type {Effects['enter']} */

        function enter(type, fields) {
          /** @type {Token} */
          // @ts-expect-error Patch instead of assign required fields to help GC.
          const token = fields || {};
          token.type = type;
          token.start = now();
          context.events.push(['enter', token, context]);
          stack.push(token);
          return token;
        }
        /** @type {Effects['exit']} */

        function exit(type) {
          const token = stack.pop();
          token.end = now();
          context.events.push(['exit', token, context]);
          return token;
        }
        /**
         * Use results.
         *
         * @type {ReturnHandle}
         */

        function onsuccessfulconstruct(construct, info) {
          addResult(construct, info.from);
        }
        /**
         * Discard results.
         *
         * @type {ReturnHandle}
         */

        function onsuccessfulcheck(_, info) {
          info.restore();
        }
        /**
         * Factory to attempt/check/interrupt.
         *
         * @param {ReturnHandle} onreturn
         * @param {Record<string, unknown>} [fields]
         */

        function constructFactory(onreturn, fields) {
          return hook;
          /**
           * Handle either an object mapping codes to constructs, a list of
           * constructs, or a single construct.
           *
           * @param {Construct|Construct[]|ConstructRecord} constructs
           * @param {State} returnState
           * @param {State} [bogusState]
           * @returns {State}
           */

          function hook(constructs, returnState, bogusState) {
            /** @type {Construct[]} */
            let listOfConstructs;
            /** @type {number} */

            let constructIndex;
            /** @type {Construct} */

            let currentConstruct;
            /** @type {Info} */

            let info;
            return Array.isArray(constructs)
              ? /* c8 ignore next 1 */
                handleListOfConstructs(constructs)
              : 'tokenize' in constructs // @ts-expect-error Looks like a construct.
              ? handleListOfConstructs([constructs])
              : handleMapOfConstructs(constructs);
            /**
             * Handle a list of construct.
             *
             * @param {ConstructRecord} map
             * @returns {State}
             */

            function handleMapOfConstructs(map) {
              return start;
              /** @type {State} */

              function start(code) {
                const def = code !== null && map[code];
                const all = code !== null && map.null;
                const list = [
                  // To do: add more extension tests.

                  /* c8 ignore next 2 */
                  ...(Array.isArray(def) ? def : def ? [def] : []),
                  ...(Array.isArray(all) ? all : all ? [all] : []),
                ];
                return handleListOfConstructs(list)(code);
              }
            }
            /**
             * Handle a list of construct.
             *
             * @param {Construct[]} list
             * @returns {State}
             */

            function handleListOfConstructs(list) {
              listOfConstructs = list;
              constructIndex = 0;

              if (list.length === 0) {
                return bogusState;
              }

              return handleConstruct(list[constructIndex]);
            }
            /**
             * Handle a single construct.
             *
             * @param {Construct} construct
             * @returns {State}
             */

            function handleConstruct(construct) {
              return start;
              /** @type {State} */

              function start(code) {
                // To do: not needed to store if there is no bogus state, probably?
                // Currently doesn’t work because `inspect` in document does a check
                // w/o a bogus, which doesn’t make sense. But it does seem to help perf
                // by not storing.
                info = store();
                currentConstruct = construct;

                if (!construct.partial) {
                  context.currentConstruct = construct;
                }

                if (
                  construct.name &&
                  context.parser.constructs.disable.null.includes(
                    construct.name
                  )
                ) {
                  return nok(code);
                }

                return construct.tokenize.call(
                  // If we do have fields, create an object w/ `context` as its
                  // prototype.
                  // This allows a “live binding”, which is needed for `interrupt`.
                  fields
                    ? Object.assign(Object.create(context), fields)
                    : context,
                  effects,
                  ok,
                  nok
                )(code);
              }
            }
            /** @type {State} */

            function ok(code) {
              consumed = true;
              onreturn(currentConstruct, info);
              return returnState;
            }
            /** @type {State} */

            function nok(code) {
              consumed = true;
              info.restore();

              if (++constructIndex < listOfConstructs.length) {
                return handleConstruct(listOfConstructs[constructIndex]);
              }

              return bogusState;
            }
          }
        }
        /**
         * @param {Construct} construct
         * @param {number} from
         * @returns {void}
         */

        function addResult(construct, from) {
          if (
            construct.resolveAll &&
            !resolveAllConstructs.includes(construct)
          ) {
            resolveAllConstructs.push(construct);
          }

          if (construct.resolve) {
            splice(
              context.events,
              from,
              context.events.length - from,
              construct.resolve(context.events.slice(from), context)
            );
          }

          if (construct.resolveTo) {
            context.events = construct.resolveTo(context.events, context);
          }
        }
        /**
         * Store state.
         *
         * @returns {Info}
         */

        function store() {
          const startPoint = now();
          const startPrevious = context.previous;
          const startCurrentConstruct = context.currentConstruct;
          const startEventsIndex = context.events.length;
          const startStack = Array.from(stack);
          return {
            restore,
            from: startEventsIndex,
          };
          /**
           * Restore state.
           *
           * @returns {void}
           */

          function restore() {
            point = startPoint;
            context.previous = startPrevious;
            context.currentConstruct = startCurrentConstruct;
            context.events.length = startEventsIndex;
            stack = startStack;
            accountForPotentialSkip();
          }
        }
        /**
         * Move the current point a bit forward in the line when it’s on a column
         * skip.
         *
         * @returns {void}
         */

        function accountForPotentialSkip() {
          if (point.line in columnStart && point.column < 2) {
            point.column = columnStart[point.line];
            point.offset += columnStart[point.line] - 1;
          }
        }
      }
      /**
       * Get the chunks from a slice of chunks in the range of a token.
       *
       * @param {Chunk[]} chunks
       * @param {Pick<Token, 'start'|'end'>} token
       * @returns {Chunk[]}
       */

      function sliceChunks(chunks, token) {
        const startIndex = token.start._index;
        const startBufferIndex = token.start._bufferIndex;
        const endIndex = token.end._index;
        const endBufferIndex = token.end._bufferIndex;
        /** @type {Chunk[]} */

        let view;

        if (startIndex === endIndex) {
          // @ts-expect-error `_bufferIndex` is used on string chunks.
          view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
        } else {
          view = chunks.slice(startIndex, endIndex);

          if (startBufferIndex > -1) {
            // @ts-expect-error `_bufferIndex` is used on string chunks.
            view[0] = view[0].slice(startBufferIndex);
          }

          if (endBufferIndex > 0) {
            // @ts-expect-error `_bufferIndex` is used on string chunks.
            view.push(chunks[endIndex].slice(0, endBufferIndex));
          }
        }

        return view;
      }
      /**
       * Get the string value of a slice of chunks.
       *
       * @param {Chunk[]} chunks
       * @param {boolean} [expandTabs=false]
       * @returns {string}
       */

      function serializeChunks(chunks, expandTabs) {
        let index = -1;
        /** @type {string[]} */

        const result = [];
        /** @type {boolean|undefined} */

        let atTab;

        while (++index < chunks.length) {
          const chunk = chunks[index];
          /** @type {string} */

          let value;

          if (typeof chunk === 'string') {
            value = chunk;
          } else
            switch (chunk) {
              case -5: {
                value = '\r';
                break;
              }

              case -4: {
                value = '\n';
                break;
              }

              case -3: {
                value = '\r' + '\n';
                break;
              }

              case -2: {
                value = expandTabs ? ' ' : '\t';
                break;
              }

              case -1: {
                if (!expandTabs && atTab) continue;
                value = ' ';
                break;
              }

              default: {
                // Currently only replacement character.
                value = String.fromCharCode(chunk);
              }
            }

          atTab = chunk === -2;
          result.push(value);
        }

        return result.join('');
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/thematic-break.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const thematicBreak = {
        name: 'thematicBreak',
        tokenize: tokenizeThematicBreak,
      };
      /** @type {Tokenizer} */

      function tokenizeThematicBreak(effects, ok, nok) {
        let size = 0;
        /** @type {NonNullable<Code>} */

        let marker;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('thematicBreak');
          marker = code;
          return atBreak(code);
        }
        /** @type {State} */

        function atBreak(code) {
          if (code === marker) {
            effects.enter('thematicBreakSequence');
            return sequence(code);
          }

          if (markdownSpace(code)) {
            return factorySpace(effects, atBreak, 'whitespace')(code);
          }

          if (size < 3 || (code !== null && !markdownLineEnding(code))) {
            return nok(code);
          }

          effects.exit('thematicBreak');
          return ok(code);
        }
        /** @type {State} */

        function sequence(code) {
          if (code === marker) {
            effects.consume(code);
            size++;
            return sequence;
          }

          effects.exit('thematicBreakSequence');
          return atBreak(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/list.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').Exiter} Exiter
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /**
       * @typedef {Record<string, unknown> & {marker: Code, type: string, size: number}} ListContainerState
       * @typedef {TokenizeContext & {containerState: ListContainerState}} TokenizeContextWithState
       */

      /** @type {Construct} */

      const list = {
        name: 'list',
        tokenize: tokenizeListStart,
        continuation: {
          tokenize: tokenizeListContinuation,
        },
        exit: tokenizeListEnd,
      };
      /** @type {Construct} */

      const listItemPrefixWhitespaceConstruct = {
        tokenize: tokenizeListItemPrefixWhitespace,
        partial: true,
      };
      /** @type {Construct} */

      const indentConstruct = {
        tokenize: tokenizeIndent,
        partial: true,
      };
      /**
       * @type {Tokenizer}
       * @this {TokenizeContextWithState}
       */

      function tokenizeListStart(effects, ok, nok) {
        const self = this;
        const tail = self.events[self.events.length - 1];
        let initialSize =
          tail && tail[1].type === 'linePrefix'
            ? tail[2].sliceSerialize(tail[1], true).length
            : 0;
        let size = 0;
        return start;
        /** @type {State} */

        function start(code) {
          const kind =
            self.containerState.type ||
            (code === 42 || code === 43 || code === 45
              ? 'listUnordered'
              : 'listOrdered');

          if (
            kind === 'listUnordered'
              ? !self.containerState.marker ||
                code === self.containerState.marker
              : asciiDigit(code)
          ) {
            if (!self.containerState.type) {
              self.containerState.type = kind;
              effects.enter(kind, {
                _container: true,
              });
            }

            if (kind === 'listUnordered') {
              effects.enter('listItemPrefix');
              return code === 42 || code === 45
                ? effects.check(thematicBreak, nok, atMarker)(code)
                : atMarker(code);
            }

            if (!self.interrupt || code === 49) {
              effects.enter('listItemPrefix');
              effects.enter('listItemValue');
              return inside(code);
            }
          }

          return nok(code);
        }
        /** @type {State} */

        function inside(code) {
          if (asciiDigit(code) && ++size < 10) {
            effects.consume(code);
            return inside;
          }

          if (
            (!self.interrupt || size < 2) &&
            (self.containerState.marker
              ? code === self.containerState.marker
              : code === 41 || code === 46)
          ) {
            effects.exit('listItemValue');
            return atMarker(code);
          }

          return nok(code);
        }
        /**
         * @type {State}
         **/

        function atMarker(code) {
          effects.enter('listItemMarker');
          effects.consume(code);
          effects.exit('listItemMarker');
          self.containerState.marker = self.containerState.marker || code;
          return effects.check(
            blankLine, // Can’t be empty when interrupting.
            self.interrupt ? nok : onBlank,
            effects.attempt(
              listItemPrefixWhitespaceConstruct,
              endOfPrefix,
              otherPrefix
            )
          );
        }
        /** @type {State} */

        function onBlank(code) {
          self.containerState.initialBlankLine = true;
          initialSize++;
          return endOfPrefix(code);
        }
        /** @type {State} */

        function otherPrefix(code) {
          if (markdownSpace(code)) {
            effects.enter('listItemPrefixWhitespace');
            effects.consume(code);
            effects.exit('listItemPrefixWhitespace');
            return endOfPrefix;
          }

          return nok(code);
        }
        /** @type {State} */

        function endOfPrefix(code) {
          self.containerState.size =
            initialSize +
            self.sliceSerialize(effects.exit('listItemPrefix'), true).length;
          return ok(code);
        }
      }
      /**
       * @type {Tokenizer}
       * @this {TokenizeContextWithState}
       */

      function tokenizeListContinuation(effects, ok, nok) {
        const self = this;
        self.containerState._closeFlow = undefined;
        return effects.check(blankLine, onBlank, notBlank);
        /** @type {State} */

        function onBlank(code) {
          self.containerState.furtherBlankLines =
            self.containerState.furtherBlankLines ||
            self.containerState.initialBlankLine; // We have a blank line.
          // Still, try to consume at most the items size.

          return factorySpace(
            effects,
            ok,
            'listItemIndent',
            self.containerState.size + 1
          )(code);
        }
        /** @type {State} */

        function notBlank(code) {
          if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
            self.containerState.furtherBlankLines = undefined;
            self.containerState.initialBlankLine = undefined;
            return notInCurrentItem(code);
          }

          self.containerState.furtherBlankLines = undefined;
          self.containerState.initialBlankLine = undefined;
          return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
        }
        /** @type {State} */

        function notInCurrentItem(code) {
          // While we do continue, we signal that the flow should be closed.
          self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

          self.interrupt = undefined;
          return factorySpace(
            effects,
            effects.attempt(list, ok, nok),
            'linePrefix',
            self.parser.constructs.disable.null.includes('codeIndented')
              ? undefined
              : 4
          )(code);
        }
      }
      /**
       * @type {Tokenizer}
       * @this {TokenizeContextWithState}
       */

      function tokenizeIndent(effects, ok, nok) {
        const self = this;
        return factorySpace(
          effects,
          afterPrefix,
          'listItemIndent',
          self.containerState.size + 1
        );
        /** @type {State} */

        function afterPrefix(code) {
          const tail = self.events[self.events.length - 1];
          return tail &&
            tail[1].type === 'listItemIndent' &&
            tail[2].sliceSerialize(tail[1], true).length ===
              self.containerState.size
            ? ok(code)
            : nok(code);
        }
      }
      /**
       * @type {Exiter}
       * @this {TokenizeContextWithState}
       */

      function tokenizeListEnd(effects) {
        effects.exit(this.containerState.type);
      }
      /**
       * @type {Tokenizer}
       * @this {TokenizeContextWithState}
       */

      function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
        const self = this;
        return factorySpace(
          effects,
          afterPrefix,
          'listItemPrefixWhitespace',
          self.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4 + 1
        );
        /** @type {State} */

        function afterPrefix(code) {
          const tail = self.events[self.events.length - 1];
          return !markdownSpace(code) &&
            tail &&
            tail[1].type === 'listItemPrefixWhitespace'
            ? ok(code)
            : nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/block-quote.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Exiter} Exiter
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const blockQuote = {
        name: 'blockQuote',
        tokenize: tokenizeBlockQuoteStart,
        continuation: {
          tokenize: tokenizeBlockQuoteContinuation,
        },
        exit,
      };
      /** @type {Tokenizer} */

      function tokenizeBlockQuoteStart(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          if (code === 62) {
            const state = self.containerState;

            if (!state.open) {
              effects.enter('blockQuote', {
                _container: true,
              });
              state.open = true;
            }

            effects.enter('blockQuotePrefix');
            effects.enter('blockQuoteMarker');
            effects.consume(code);
            effects.exit('blockQuoteMarker');
            return after;
          }

          return nok(code);
        }
        /** @type {State} */

        function after(code) {
          if (markdownSpace(code)) {
            effects.enter('blockQuotePrefixWhitespace');
            effects.consume(code);
            effects.exit('blockQuotePrefixWhitespace');
            effects.exit('blockQuotePrefix');
            return ok;
          }

          effects.exit('blockQuotePrefix');
          return ok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeBlockQuoteContinuation(effects, ok, nok) {
        return factorySpace(
          effects,
          effects.attempt(blockQuote, ok, nok),
          'linePrefix',
          this.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4
        );
      }
      /** @type {Exiter} */

      function exit(effects) {
        effects.exit('blockQuote');
      } // CONCATENATED MODULE: ./node_modules/micromark-factory-destination/index.js

      /**
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').State} State
       */

      /**
       * @param {Effects} effects
       * @param {State} ok
       * @param {State} nok
       * @param {string} type
       * @param {string} literalType
       * @param {string} literalMarkerType
       * @param {string} rawType
       * @param {string} stringType
       * @param {number} [max=Infinity]
       * @returns {State}
       */
      // eslint-disable-next-line max-params
      function factoryDestination(
        effects,
        ok,
        nok,
        type,
        literalType,
        literalMarkerType,
        rawType,
        stringType,
        max
      ) {
        const limit = max || Number.POSITIVE_INFINITY;
        let balance = 0;
        return start;
        /** @type {State} */

        function start(code) {
          if (code === 60) {
            effects.enter(type);
            effects.enter(literalType);
            effects.enter(literalMarkerType);
            effects.consume(code);
            effects.exit(literalMarkerType);
            return destinationEnclosedBefore;
          }

          if (code === null || code === 41 || asciiControl(code)) {
            return nok(code);
          }

          effects.enter(type);
          effects.enter(rawType);
          effects.enter(stringType);
          effects.enter('chunkString', {
            contentType: 'string',
          });
          return destinationRaw(code);
        }
        /** @type {State} */

        function destinationEnclosedBefore(code) {
          if (code === 62) {
            effects.enter(literalMarkerType);
            effects.consume(code);
            effects.exit(literalMarkerType);
            effects.exit(literalType);
            effects.exit(type);
            return ok;
          }

          effects.enter(stringType);
          effects.enter('chunkString', {
            contentType: 'string',
          });
          return destinationEnclosed(code);
        }
        /** @type {State} */

        function destinationEnclosed(code) {
          if (code === 62) {
            effects.exit('chunkString');
            effects.exit(stringType);
            return destinationEnclosedBefore(code);
          }

          if (code === null || code === 60 || markdownLineEnding(code)) {
            return nok(code);
          }

          effects.consume(code);
          return code === 92 ? destinationEnclosedEscape : destinationEnclosed;
        }
        /** @type {State} */

        function destinationEnclosedEscape(code) {
          if (code === 60 || code === 62 || code === 92) {
            effects.consume(code);
            return destinationEnclosed;
          }

          return destinationEnclosed(code);
        }
        /** @type {State} */

        function destinationRaw(code) {
          if (code === 40) {
            if (++balance > limit) return nok(code);
            effects.consume(code);
            return destinationRaw;
          }

          if (code === 41) {
            if (!balance--) {
              effects.exit('chunkString');
              effects.exit(stringType);
              effects.exit(rawType);
              effects.exit(type);
              return ok(code);
            }

            effects.consume(code);
            return destinationRaw;
          }

          if (code === null || markdownLineEndingOrSpace(code)) {
            if (balance) return nok(code);
            effects.exit('chunkString');
            effects.exit(stringType);
            effects.exit(rawType);
            effects.exit(type);
            return ok(code);
          }

          if (asciiControl(code)) return nok(code);
          effects.consume(code);
          return code === 92 ? destinationRawEscape : destinationRaw;
        }
        /** @type {State} */

        function destinationRawEscape(code) {
          if (code === 40 || code === 41 || code === 92) {
            effects.consume(code);
            return destinationRaw;
          }

          return destinationRaw(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-factory-label/index.js

      /**
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').State} State
       */

      /**
       * @this {TokenizeContext}
       * @param {Effects} effects
       * @param {State} ok
       * @param {State} nok
       * @param {string} type
       * @param {string} markerType
       * @param {string} stringType
       * @returns {State}
       */
      // eslint-disable-next-line max-params
      function factoryLabel(effects, ok, nok, type, markerType, stringType) {
        const self = this;
        let size = 0;
        /** @type {boolean} */

        let data;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter(type);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.enter(stringType);
          return atBreak;
        }
        /** @type {State} */

        function atBreak(code) {
          if (
            code === null ||
            code === 91 ||
            (code === 93 && !data) ||
            /* To do: remove in the future once we’ve switched from
             * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
             * which doesn’t need this */

            /* Hidden footnotes hook */

            /* c8 ignore next 3 */
            (code === 94 &&
              !size &&
              '_hiddenFootnoteSupport' in self.parser.constructs) ||
            size > 999
          ) {
            return nok(code);
          }

          if (code === 93) {
            effects.exit(stringType);
            effects.enter(markerType);
            effects.consume(code);
            effects.exit(markerType);
            effects.exit(type);
            return ok;
          }

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return atBreak;
          }

          effects.enter('chunkString', {
            contentType: 'string',
          });
          return label(code);
        }
        /** @type {State} */

        function label(code) {
          if (
            code === null ||
            code === 91 ||
            code === 93 ||
            markdownLineEnding(code) ||
            size++ > 999
          ) {
            effects.exit('chunkString');
            return atBreak(code);
          }

          effects.consume(code);
          data = data || !markdownSpace(code);
          return code === 92 ? labelEscape : label;
        }
        /** @type {State} */

        function labelEscape(code) {
          if (code === 91 || code === 92 || code === 93) {
            effects.consume(code);
            size++;
            return label;
          }

          return label(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-factory-title/index.js

      /**
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /**
       * @param {Effects} effects
       * @param {State} ok
       * @param {State} nok
       * @param {string} type
       * @param {string} markerType
       * @param {string} stringType
       * @returns {State}
       */
      // eslint-disable-next-line max-params
      function factoryTitle(effects, ok, nok, type, markerType, stringType) {
        /** @type {NonNullable<Code>} */
        let marker;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter(type);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          marker = code === 40 ? 41 : code;
          return atFirstTitleBreak;
        }
        /** @type {State} */

        function atFirstTitleBreak(code) {
          if (code === marker) {
            effects.enter(markerType);
            effects.consume(code);
            effects.exit(markerType);
            effects.exit(type);
            return ok;
          }

          effects.enter(stringType);
          return atTitleBreak(code);
        }
        /** @type {State} */

        function atTitleBreak(code) {
          if (code === marker) {
            effects.exit(stringType);
            return atFirstTitleBreak(marker);
          }

          if (code === null) {
            return nok(code);
          } // Note: blank lines can’t exist in content.

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return factorySpace(effects, atTitleBreak, 'linePrefix');
          }

          effects.enter('chunkString', {
            contentType: 'string',
          });
          return title(code);
        }
        /** @type {State} */

        function title(code) {
          if (code === marker || code === null || markdownLineEnding(code)) {
            effects.exit('chunkString');
            return atTitleBreak(code);
          }

          effects.consume(code);
          return code === 92 ? titleEscape : title;
        }
        /** @type {State} */

        function titleEscape(code) {
          if (code === marker || code === 92) {
            effects.consume(code);
            return title;
          }

          return title(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-factory-whitespace/index.js

      /**
       * @typedef {import('micromark-util-types').Effects} Effects
       * @typedef {import('micromark-util-types').State} State
       */

      /**
       * @param {Effects} effects
       * @param {State} ok
       */
      function factoryWhitespace(effects, ok) {
        /** @type {boolean} */
        let seen;
        return start;
        /** @type {State} */

        function start(code) {
          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            seen = true;
            return start;
          }

          if (markdownSpace(code)) {
            return factorySpace(
              effects,
              start,
              seen ? 'linePrefix' : 'lineSuffix'
            )(code);
          }

          return ok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-util-normalize-identifier/index.js

      /**
       * Normalize an identifier (such as used in definitions).
       *
       * @param {string} value
       * @returns {string}
       */
      function normalizeIdentifier(value) {
        return (
          value // Collapse Markdown whitespace.
            .replace(/[\t\n\r ]+/g, ' ') // Trim.
            .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
            // counterpart is uppercased will result in a different uppercase
            // character.
            // Hence, to get that form, we perform both lower- and uppercase.
            // Upper case makes sure keys will not interact with default prototypal
            // methods: no method is uppercase.
            .toLowerCase()
            .toUpperCase()
        );
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/definition.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const definition = {
        name: 'definition',
        tokenize: tokenizeDefinition,
      };
      /** @type {Construct} */

      const titleConstruct = {
        tokenize: tokenizeTitle,
        partial: true,
      };
      /** @type {Tokenizer} */

      function tokenizeDefinition(effects, ok, nok) {
        const self = this;
        /** @type {string} */

        let identifier;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('definition');
          return factoryLabel.call(
            self,
            effects,
            labelAfter,
            nok,
            'definitionLabel',
            'definitionLabelMarker',
            'definitionLabelString'
          )(code);
        }
        /** @type {State} */

        function labelAfter(code) {
          identifier = normalizeIdentifier(
            self
              .sliceSerialize(self.events[self.events.length - 1][1])
              .slice(1, -1)
          );

          if (code === 58) {
            effects.enter('definitionMarker');
            effects.consume(code);
            effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

            return factoryWhitespace(
              effects,
              factoryDestination(
                effects,
                effects.attempt(
                  titleConstruct,
                  factorySpace(effects, after, 'whitespace'),
                  factorySpace(effects, after, 'whitespace')
                ),
                nok,
                'definitionDestination',
                'definitionDestinationLiteral',
                'definitionDestinationLiteralMarker',
                'definitionDestinationRaw',
                'definitionDestinationString'
              )
            );
          }

          return nok(code);
        }
        /** @type {State} */

        function after(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('definition');

            if (!self.parser.defined.includes(identifier)) {
              self.parser.defined.push(identifier);
            }

            return ok(code);
          }

          return nok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeTitle(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          return markdownLineEndingOrSpace(code)
            ? factoryWhitespace(effects, before)(code)
            : nok(code);
        }
        /** @type {State} */

        function before(code) {
          if (code === 34 || code === 39 || code === 40) {
            return factoryTitle(
              effects,
              factorySpace(effects, after, 'whitespace'),
              nok,
              'definitionTitle',
              'definitionTitleMarker',
              'definitionTitleString'
            )(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function after(code) {
          return code === null || markdownLineEnding(code)
            ? ok(code)
            : nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/code-indented.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const codeIndented = {
        name: 'codeIndented',
        tokenize: tokenizeCodeIndented,
      };
      /** @type {Construct} */

      const indentedContent = {
        tokenize: tokenizeIndentedContent,
        partial: true,
      };
      /** @type {Tokenizer} */

      function tokenizeCodeIndented(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('codeIndented');
          return factorySpace(
            effects,
            afterStartPrefix,
            'linePrefix',
            4 + 1
          )(code);
        }
        /** @type {State} */

        function afterStartPrefix(code) {
          const tail = self.events[self.events.length - 1];
          return tail &&
            tail[1].type === 'linePrefix' &&
            tail[2].sliceSerialize(tail[1], true).length >= 4
            ? afterPrefix(code)
            : nok(code);
        }
        /** @type {State} */

        function afterPrefix(code) {
          if (code === null) {
            return after(code);
          }

          if (markdownLineEnding(code)) {
            return effects.attempt(indentedContent, afterPrefix, after)(code);
          }

          effects.enter('codeFlowValue');
          return content(code);
        }
        /** @type {State} */

        function content(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('codeFlowValue');
            return afterPrefix(code);
          }

          effects.consume(code);
          return content;
        }
        /** @type {State} */

        function after(code) {
          effects.exit('codeIndented');
          return ok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeIndentedContent(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          // If this is a lazy line, it can’t be code.
          if (self.parser.lazy[self.now().line]) {
            return nok(code);
          }

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return start;
          }

          return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)(code);
        }
        /** @type {State} */

        function afterPrefix(code) {
          const tail = self.events[self.events.length - 1];
          return tail &&
            tail[1].type === 'linePrefix' &&
            tail[2].sliceSerialize(tail[1], true).length >= 4
            ? ok(code)
            : markdownLineEnding(code)
            ? start(code)
            : nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/heading-atx.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const headingAtx = {
        name: 'headingAtx',
        tokenize: tokenizeHeadingAtx,
        resolve: resolveHeadingAtx,
      };
      /** @type {Resolver} */

      function resolveHeadingAtx(events, context) {
        let contentEnd = events.length - 2;
        let contentStart = 3;
        /** @type {Token} */

        let content;
        /** @type {Token} */

        let text; // Prefix whitespace, part of the opening.

        if (events[contentStart][1].type === 'whitespace') {
          contentStart += 2;
        } // Suffix whitespace, part of the closing.

        if (
          contentEnd - 2 > contentStart &&
          events[contentEnd][1].type === 'whitespace'
        ) {
          contentEnd -= 2;
        }

        if (
          events[contentEnd][1].type === 'atxHeadingSequence' &&
          (contentStart === contentEnd - 1 ||
            (contentEnd - 4 > contentStart &&
              events[contentEnd - 2][1].type === 'whitespace'))
        ) {
          contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
        }

        if (contentEnd > contentStart) {
          content = {
            type: 'atxHeadingText',
            start: events[contentStart][1].start,
            end: events[contentEnd][1].end,
          };
          text = {
            type: 'chunkText',
            start: events[contentStart][1].start,
            end: events[contentEnd][1].end,
            // @ts-expect-error Constants are fine to assign.
            contentType: 'text',
          };
          splice(events, contentStart, contentEnd - contentStart + 1, [
            ['enter', content, context],
            ['enter', text, context],
            ['exit', text, context],
            ['exit', content, context],
          ]);
        }

        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeHeadingAtx(effects, ok, nok) {
        const self = this;
        let size = 0;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('atxHeading');
          effects.enter('atxHeadingSequence');
          return fenceOpenInside(code);
        }
        /** @type {State} */

        function fenceOpenInside(code) {
          if (code === 35 && size++ < 6) {
            effects.consume(code);
            return fenceOpenInside;
          }

          if (code === null || markdownLineEndingOrSpace(code)) {
            effects.exit('atxHeadingSequence');
            return self.interrupt ? ok(code) : headingBreak(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function headingBreak(code) {
          if (code === 35) {
            effects.enter('atxHeadingSequence');
            return sequence(code);
          }

          if (code === null || markdownLineEnding(code)) {
            effects.exit('atxHeading');
            return ok(code);
          }

          if (markdownSpace(code)) {
            return factorySpace(effects, headingBreak, 'whitespace')(code);
          }

          effects.enter('atxHeadingText');
          return data(code);
        }
        /** @type {State} */

        function sequence(code) {
          if (code === 35) {
            effects.consume(code);
            return sequence;
          }

          effects.exit('atxHeadingSequence');
          return headingBreak(code);
        }
        /** @type {State} */

        function data(code) {
          if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
            effects.exit('atxHeadingText');
            return headingBreak(code);
          }

          effects.consume(code);
          return data;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/setext-underline.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const setextUnderline = {
        name: 'setextUnderline',
        tokenize: tokenizeSetextUnderline,
        resolveTo: resolveToSetextUnderline,
      };
      /** @type {Resolver} */

      function resolveToSetextUnderline(events, context) {
        let index = events.length;
        /** @type {number|undefined} */

        let content;
        /** @type {number|undefined} */

        let text;
        /** @type {number|undefined} */

        let definition; // Find the opening of the content.
        // It’ll always exist: we don’t tokenize if it isn’t there.

        while (index--) {
          if (events[index][0] === 'enter') {
            if (events[index][1].type === 'content') {
              content = index;
              break;
            }

            if (events[index][1].type === 'paragraph') {
              text = index;
            }
          } // Exit
          else {
            if (events[index][1].type === 'content') {
              // Remove the content end (if needed we’ll add it later)
              events.splice(index, 1);
            }

            if (!definition && events[index][1].type === 'definition') {
              definition = index;
            }
          }
        }

        const heading = {
          type: 'setextHeading',
          start: Object.assign({}, events[text][1].start),
          end: Object.assign({}, events[events.length - 1][1].end),
        }; // Change the paragraph to setext heading text.

        events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
        // but we need move it.

        if (definition) {
          events.splice(text, 0, ['enter', heading, context]);
          events.splice(definition + 1, 0, [
            'exit',
            events[content][1],
            context,
          ]);
          events[content][1].end = Object.assign({}, events[definition][1].end);
        } else {
          events[content][1] = heading;
        } // Add the heading exit at the end.

        events.push(['exit', heading, context]);
        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeSetextUnderline(effects, ok, nok) {
        const self = this;
        let index = self.events.length;
        /** @type {NonNullable<Code>} */

        let marker;
        /** @type {boolean} */

        let paragraph; // Find an opening.

        while (index--) {
          // Skip enter/exit of line ending, line prefix, and content.
          // We can now either have a definition or a paragraph.
          if (
            self.events[index][1].type !== 'lineEnding' &&
            self.events[index][1].type !== 'linePrefix' &&
            self.events[index][1].type !== 'content'
          ) {
            paragraph = self.events[index][1].type === 'paragraph';
            break;
          }
        }

        return start;
        /** @type {State} */

        function start(code) {
          if (
            !self.parser.lazy[self.now().line] &&
            (self.interrupt || paragraph)
          ) {
            effects.enter('setextHeadingLine');
            effects.enter('setextHeadingLineSequence');
            marker = code;
            return closingSequence(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function closingSequence(code) {
          if (code === marker) {
            effects.consume(code);
            return closingSequence;
          }

          effects.exit('setextHeadingLineSequence');
          return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code);
        }
        /** @type {State} */

        function closingSequenceEnd(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('setextHeadingLine');
            return ok(code);
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-util-html-tag-name/index.js

      /**
       * List of lowercase HTML tag names which when parsing HTML (flow), result
       * in more relaxed rules (condition 6): because they are known blocks, the
       * HTML-like syntax doesn’t have to be strictly parsed.
       * For tag names not in this list, a more strict algorithm (condition 7) is used
       * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
       *
       * This is copied from:
       * <https://spec.commonmark.org/0.29/#html-blocks>.
       */
      const htmlBlockNames = [
        'address',
        'article',
        'aside',
        'base',
        'basefont',
        'blockquote',
        'body',
        'caption',
        'center',
        'col',
        'colgroup',
        'dd',
        'details',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'frame',
        'frameset',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hr',
        'html',
        'iframe',
        'legend',
        'li',
        'link',
        'main',
        'menu',
        'menuitem',
        'nav',
        'noframes',
        'ol',
        'optgroup',
        'option',
        'p',
        'param',
        'section',
        'source',
        'summary',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'title',
        'tr',
        'track',
        'ul',
      ];

      /**
       * List of lowercase HTML tag names which when parsing HTML (flow), result in
       * HTML that can include lines w/o exiting, until a closing tag also in this
       * list is found (condition 1).
       *
       * This module is copied from:
       * <https://spec.commonmark.org/0.29/#html-blocks>.
       *
       * Note that `textarea` is not available in `CommonMark@0.29` but has been
       * merged to the primary branch and is slated to be released in the next release
       * of CommonMark.
       */
      const htmlRawNames = ['pre', 'script', 'style', 'textarea']; // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/html-flow.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */

      const htmlFlow = {
        name: 'htmlFlow',
        tokenize: tokenizeHtmlFlow,
        resolveTo: resolveToHtmlFlow,
        concrete: true,
      };
      /** @type {Construct} */

      const nextBlankConstruct = {
        tokenize: tokenizeNextBlank,
        partial: true,
      };
      /** @type {Resolver} */

      function resolveToHtmlFlow(events) {
        let index = events.length;

        while (index--) {
          if (
            events[index][0] === 'enter' &&
            events[index][1].type === 'htmlFlow'
          ) {
            break;
          }
        }

        if (index > 1 && events[index - 2][1].type === 'linePrefix') {
          // Add the prefix start to the HTML token.
          events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

          events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

          events.splice(index - 2, 2);
        }

        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeHtmlFlow(effects, ok, nok) {
        const self = this;
        /** @type {number} */

        let kind;
        /** @type {boolean} */

        let startTag;
        /** @type {string} */

        let buffer;
        /** @type {number} */

        let index;
        /** @type {Code} */

        let marker;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('htmlFlow');
          effects.enter('htmlFlowData');
          effects.consume(code);
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (code === 33) {
            effects.consume(code);
            return declarationStart;
          }

          if (code === 47) {
            effects.consume(code);
            return tagCloseStart;
          }

          if (code === 63) {
            effects.consume(code);
            kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
            // right now, so we do need to search for `>`, similar to declarations.

            return self.interrupt ? ok : continuationDeclarationInside;
          }

          if (asciiAlpha(code)) {
            effects.consume(code);
            buffer = String.fromCharCode(code);
            startTag = true;
            return tagName;
          }

          return nok(code);
        }
        /** @type {State} */

        function declarationStart(code) {
          if (code === 45) {
            effects.consume(code);
            kind = 2;
            return commentOpenInside;
          }

          if (code === 91) {
            effects.consume(code);
            kind = 5;
            buffer = 'CDATA[';
            index = 0;
            return cdataOpenInside;
          }

          if (asciiAlpha(code)) {
            effects.consume(code);
            kind = 4;
            return self.interrupt ? ok : continuationDeclarationInside;
          }

          return nok(code);
        }
        /** @type {State} */

        function commentOpenInside(code) {
          if (code === 45) {
            effects.consume(code);
            return self.interrupt ? ok : continuationDeclarationInside;
          }

          return nok(code);
        }
        /** @type {State} */

        function cdataOpenInside(code) {
          if (code === buffer.charCodeAt(index++)) {
            effects.consume(code);
            return index === buffer.length
              ? self.interrupt
                ? ok
                : continuation
              : cdataOpenInside;
          }

          return nok(code);
        }
        /** @type {State} */

        function tagCloseStart(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            buffer = String.fromCharCode(code);
            return tagName;
          }

          return nok(code);
        }
        /** @type {State} */

        function tagName(code) {
          if (
            code === null ||
            code === 47 ||
            code === 62 ||
            markdownLineEndingOrSpace(code)
          ) {
            if (
              code !== 47 &&
              startTag &&
              htmlRawNames.includes(buffer.toLowerCase())
            ) {
              kind = 1;
              return self.interrupt ? ok(code) : continuation(code);
            }

            if (htmlBlockNames.includes(buffer.toLowerCase())) {
              kind = 6;

              if (code === 47) {
                effects.consume(code);
                return basicSelfClosing;
              }

              return self.interrupt ? ok(code) : continuation(code);
            }

            kind = 7; // Do not support complete HTML when interrupting

            return self.interrupt && !self.parser.lazy[self.now().line]
              ? nok(code)
              : startTag
              ? completeAttributeNameBefore(code)
              : completeClosingTagAfter(code);
          }

          if (code === 45 || asciiAlphanumeric(code)) {
            effects.consume(code);
            buffer += String.fromCharCode(code);
            return tagName;
          }

          return nok(code);
        }
        /** @type {State} */

        function basicSelfClosing(code) {
          if (code === 62) {
            effects.consume(code);
            return self.interrupt ? ok : continuation;
          }

          return nok(code);
        }
        /** @type {State} */

        function completeClosingTagAfter(code) {
          if (markdownSpace(code)) {
            effects.consume(code);
            return completeClosingTagAfter;
          }

          return completeEnd(code);
        }
        /** @type {State} */

        function completeAttributeNameBefore(code) {
          if (code === 47) {
            effects.consume(code);
            return completeEnd;
          }

          if (code === 58 || code === 95 || asciiAlpha(code)) {
            effects.consume(code);
            return completeAttributeName;
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return completeAttributeNameBefore;
          }

          return completeEnd(code);
        }
        /** @type {State} */

        function completeAttributeName(code) {
          if (
            code === 45 ||
            code === 46 ||
            code === 58 ||
            code === 95 ||
            asciiAlphanumeric(code)
          ) {
            effects.consume(code);
            return completeAttributeName;
          }

          return completeAttributeNameAfter(code);
        }
        /** @type {State} */

        function completeAttributeNameAfter(code) {
          if (code === 61) {
            effects.consume(code);
            return completeAttributeValueBefore;
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return completeAttributeNameAfter;
          }

          return completeAttributeNameBefore(code);
        }
        /** @type {State} */

        function completeAttributeValueBefore(code) {
          if (
            code === null ||
            code === 60 ||
            code === 61 ||
            code === 62 ||
            code === 96
          ) {
            return nok(code);
          }

          if (code === 34 || code === 39) {
            effects.consume(code);
            marker = code;
            return completeAttributeValueQuoted;
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return completeAttributeValueBefore;
          }

          marker = null;
          return completeAttributeValueUnquoted(code);
        }
        /** @type {State} */

        function completeAttributeValueQuoted(code) {
          if (code === null || markdownLineEnding(code)) {
            return nok(code);
          }

          if (code === marker) {
            effects.consume(code);
            return completeAttributeValueQuotedAfter;
          }

          effects.consume(code);
          return completeAttributeValueQuoted;
        }
        /** @type {State} */

        function completeAttributeValueUnquoted(code) {
          if (
            code === null ||
            code === 34 ||
            code === 39 ||
            code === 60 ||
            code === 61 ||
            code === 62 ||
            code === 96 ||
            markdownLineEndingOrSpace(code)
          ) {
            return completeAttributeNameAfter(code);
          }

          effects.consume(code);
          return completeAttributeValueUnquoted;
        }
        /** @type {State} */

        function completeAttributeValueQuotedAfter(code) {
          if (code === 47 || code === 62 || markdownSpace(code)) {
            return completeAttributeNameBefore(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function completeEnd(code) {
          if (code === 62) {
            effects.consume(code);
            return completeAfter;
          }

          return nok(code);
        }
        /** @type {State} */

        function completeAfter(code) {
          if (markdownSpace(code)) {
            effects.consume(code);
            return completeAfter;
          }

          return code === null || markdownLineEnding(code)
            ? continuation(code)
            : nok(code);
        }
        /** @type {State} */

        function continuation(code) {
          if (code === 45 && kind === 2) {
            effects.consume(code);
            return continuationCommentInside;
          }

          if (code === 60 && kind === 1) {
            effects.consume(code);
            return continuationRawTagOpen;
          }

          if (code === 62 && kind === 4) {
            effects.consume(code);
            return continuationClose;
          }

          if (code === 63 && kind === 3) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          if (code === 93 && kind === 5) {
            effects.consume(code);
            return continuationCharacterDataInside;
          }

          if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
            return effects.check(
              nextBlankConstruct,
              continuationClose,
              continuationAtLineEnding
            )(code);
          }

          if (code === null || markdownLineEnding(code)) {
            return continuationAtLineEnding(code);
          }

          effects.consume(code);
          return continuation;
        }
        /** @type {State} */

        function continuationAtLineEnding(code) {
          effects.exit('htmlFlowData');
          return htmlContinueStart(code);
        }
        /** @type {State} */

        function htmlContinueStart(code) {
          if (code === null) {
            return done(code);
          }

          if (markdownLineEnding(code)) {
            return effects.attempt(
              {
                tokenize: htmlLineEnd,
                partial: true,
              },
              htmlContinueStart,
              done
            )(code);
          }

          effects.enter('htmlFlowData');
          return continuation(code);
        }
        /** @type {Tokenizer} */

        function htmlLineEnd(effects, ok, nok) {
          return start;
          /** @type {State} */

          function start(code) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return lineStart;
          }
          /** @type {State} */

          function lineStart(code) {
            return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
          }
        }
        /** @type {State} */

        function continuationCommentInside(code) {
          if (code === 45) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          return continuation(code);
        }
        /** @type {State} */

        function continuationRawTagOpen(code) {
          if (code === 47) {
            effects.consume(code);
            buffer = '';
            return continuationRawEndTag;
          }

          return continuation(code);
        }
        /** @type {State} */

        function continuationRawEndTag(code) {
          if (code === 62 && htmlRawNames.includes(buffer.toLowerCase())) {
            effects.consume(code);
            return continuationClose;
          }

          if (asciiAlpha(code) && buffer.length < 8) {
            effects.consume(code);
            buffer += String.fromCharCode(code);
            return continuationRawEndTag;
          }

          return continuation(code);
        }
        /** @type {State} */

        function continuationCharacterDataInside(code) {
          if (code === 93) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          return continuation(code);
        }
        /** @type {State} */

        function continuationDeclarationInside(code) {
          if (code === 62) {
            effects.consume(code);
            return continuationClose;
          } // More dashes.

          if (code === 45 && kind === 2) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          return continuation(code);
        }
        /** @type {State} */

        function continuationClose(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('htmlFlowData');
            return done(code);
          }

          effects.consume(code);
          return continuationClose;
        }
        /** @type {State} */

        function done(code) {
          effects.exit('htmlFlow');
          return ok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeNextBlank(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.exit('htmlFlowData');
          effects.enter('lineEndingBlank');
          effects.consume(code);
          effects.exit('lineEndingBlank');
          return effects.attempt(blankLine, ok, nok);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/code-fenced.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const codeFenced = {
        name: 'codeFenced',
        tokenize: tokenizeCodeFenced,
        concrete: true,
      };
      /** @type {Tokenizer} */

      function tokenizeCodeFenced(effects, ok, nok) {
        const self = this;
        /** @type {Construct} */

        const closingFenceConstruct = {
          tokenize: tokenizeClosingFence,
          partial: true,
        };
        /** @type {Construct} */

        const nonLazyLine = {
          tokenize: tokenizeNonLazyLine,
          partial: true,
        };
        const tail = this.events[this.events.length - 1];
        const initialPrefix =
          tail && tail[1].type === 'linePrefix'
            ? tail[2].sliceSerialize(tail[1], true).length
            : 0;
        let sizeOpen = 0;
        /** @type {NonNullable<Code>} */

        let marker;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('codeFenced');
          effects.enter('codeFencedFence');
          effects.enter('codeFencedFenceSequence');
          marker = code;
          return sequenceOpen(code);
        }
        /** @type {State} */

        function sequenceOpen(code) {
          if (code === marker) {
            effects.consume(code);
            sizeOpen++;
            return sequenceOpen;
          }

          effects.exit('codeFencedFenceSequence');
          return sizeOpen < 3
            ? nok(code)
            : factorySpace(effects, infoOpen, 'whitespace')(code);
        }
        /** @type {State} */

        function infoOpen(code) {
          if (code === null || markdownLineEnding(code)) {
            return openAfter(code);
          }

          effects.enter('codeFencedFenceInfo');
          effects.enter('chunkString', {
            contentType: 'string',
          });
          return info(code);
        }
        /** @type {State} */

        function info(code) {
          if (code === null || markdownLineEndingOrSpace(code)) {
            effects.exit('chunkString');
            effects.exit('codeFencedFenceInfo');
            return factorySpace(effects, infoAfter, 'whitespace')(code);
          }

          if (code === 96 && code === marker) return nok(code);
          effects.consume(code);
          return info;
        }
        /** @type {State} */

        function infoAfter(code) {
          if (code === null || markdownLineEnding(code)) {
            return openAfter(code);
          }

          effects.enter('codeFencedFenceMeta');
          effects.enter('chunkString', {
            contentType: 'string',
          });
          return meta(code);
        }
        /** @type {State} */

        function meta(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('chunkString');
            effects.exit('codeFencedFenceMeta');
            return openAfter(code);
          }

          if (code === 96 && code === marker) return nok(code);
          effects.consume(code);
          return meta;
        }
        /** @type {State} */

        function openAfter(code) {
          effects.exit('codeFencedFence');
          return self.interrupt ? ok(code) : contentStart(code);
        }
        /** @type {State} */

        function contentStart(code) {
          if (code === null) {
            return after(code);
          }

          if (markdownLineEnding(code)) {
            return effects.attempt(
              nonLazyLine,
              effects.attempt(
                closingFenceConstruct,
                after,
                initialPrefix
                  ? factorySpace(
                      effects,
                      contentStart,
                      'linePrefix',
                      initialPrefix + 1
                    )
                  : contentStart
              ),
              after
            )(code);
          }

          effects.enter('codeFlowValue');
          return contentContinue(code);
        }
        /** @type {State} */

        function contentContinue(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('codeFlowValue');
            return contentStart(code);
          }

          effects.consume(code);
          return contentContinue;
        }
        /** @type {State} */

        function after(code) {
          effects.exit('codeFenced');
          return ok(code);
        }
        /** @type {Tokenizer} */

        function tokenizeNonLazyLine(effects, ok, nok) {
          const self = this;
          return start;
          /** @type {State} */

          function start(code) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return lineStart;
          }
          /** @type {State} */

          function lineStart(code) {
            return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
          }
        }
        /** @type {Tokenizer} */

        function tokenizeClosingFence(effects, ok, nok) {
          let size = 0;
          return factorySpace(
            effects,
            closingSequenceStart,
            'linePrefix',
            this.parser.constructs.disable.null.includes('codeIndented')
              ? undefined
              : 4
          );
          /** @type {State} */

          function closingSequenceStart(code) {
            effects.enter('codeFencedFence');
            effects.enter('codeFencedFenceSequence');
            return closingSequence(code);
          }
          /** @type {State} */

          function closingSequence(code) {
            if (code === marker) {
              effects.consume(code);
              size++;
              return closingSequence;
            }

            if (size < sizeOpen) return nok(code);
            effects.exit('codeFencedFenceSequence');
            return factorySpace(
              effects,
              closingSequenceEnd,
              'whitespace'
            )(code);
          }
          /** @type {State} */

          function closingSequenceEnd(code) {
            if (code === null || markdownLineEnding(code)) {
              effects.exit('codeFencedFence');
              return ok(code);
            }

            return nok(code);
          }
        }
      } // CONCATENATED MODULE: ./node_modules/character-entities/index.js

      /**
       * Map of named character references.
       *
       * @type {Record<string, string>}
       */
      const characterEntities = {
        AEli: 'Æ',
        AElig: 'Æ',
        AM: '&',
        AMP: '&',
        Aacut: 'Á',
        Aacute: 'Á',
        Abreve: 'Ă',
        Acir: 'Â',
        Acirc: 'Â',
        Acy: 'А',
        Afr: '𝔄',
        Agrav: 'À',
        Agrave: 'À',
        Alpha: 'Α',
        Amacr: 'Ā',
        And: '⩓',
        Aogon: 'Ą',
        Aopf: '𝔸',
        ApplyFunction: '⁡',
        Arin: 'Å',
        Aring: 'Å',
        Ascr: '𝒜',
        Assign: '≔',
        Atild: 'Ã',
        Atilde: 'Ã',
        Aum: 'Ä',
        Auml: 'Ä',
        Backslash: '∖',
        Barv: '⫧',
        Barwed: '⌆',
        Bcy: 'Б',
        Because: '∵',
        Bernoullis: 'ℬ',
        Beta: 'Β',
        Bfr: '𝔅',
        Bopf: '𝔹',
        Breve: '˘',
        Bscr: 'ℬ',
        Bumpeq: '≎',
        CHcy: 'Ч',
        COP: '©',
        COPY: '©',
        Cacute: 'Ć',
        Cap: '⋒',
        CapitalDifferentialD: 'ⅅ',
        Cayleys: 'ℭ',
        Ccaron: 'Č',
        Ccedi: 'Ç',
        Ccedil: 'Ç',
        Ccirc: 'Ĉ',
        Cconint: '∰',
        Cdot: 'Ċ',
        Cedilla: '¸',
        CenterDot: '·',
        Cfr: 'ℭ',
        Chi: 'Χ',
        CircleDot: '⊙',
        CircleMinus: '⊖',
        CirclePlus: '⊕',
        CircleTimes: '⊗',
        ClockwiseContourIntegral: '∲',
        CloseCurlyDoubleQuote: '”',
        CloseCurlyQuote: '’',
        Colon: '∷',
        Colone: '⩴',
        Congruent: '≡',
        Conint: '∯',
        ContourIntegral: '∮',
        Copf: 'ℂ',
        Coproduct: '∐',
        CounterClockwiseContourIntegral: '∳',
        Cross: '⨯',
        Cscr: '𝒞',
        Cup: '⋓',
        CupCap: '≍',
        DD: 'ⅅ',
        DDotrahd: '⤑',
        DJcy: 'Ђ',
        DScy: 'Ѕ',
        DZcy: 'Џ',
        Dagger: '‡',
        Darr: '↡',
        Dashv: '⫤',
        Dcaron: 'Ď',
        Dcy: 'Д',
        Del: '∇',
        Delta: 'Δ',
        Dfr: '𝔇',
        DiacriticalAcute: '´',
        DiacriticalDot: '˙',
        DiacriticalDoubleAcute: '˝',
        DiacriticalGrave: '`',
        DiacriticalTilde: '˜',
        Diamond: '⋄',
        DifferentialD: 'ⅆ',
        Dopf: '𝔻',
        Dot: '¨',
        DotDot: '⃜',
        DotEqual: '≐',
        DoubleContourIntegral: '∯',
        DoubleDot: '¨',
        DoubleDownArrow: '⇓',
        DoubleLeftArrow: '⇐',
        DoubleLeftRightArrow: '⇔',
        DoubleLeftTee: '⫤',
        DoubleLongLeftArrow: '⟸',
        DoubleLongLeftRightArrow: '⟺',
        DoubleLongRightArrow: '⟹',
        DoubleRightArrow: '⇒',
        DoubleRightTee: '⊨',
        DoubleUpArrow: '⇑',
        DoubleUpDownArrow: '⇕',
        DoubleVerticalBar: '∥',
        DownArrow: '↓',
        DownArrowBar: '⤓',
        DownArrowUpArrow: '⇵',
        DownBreve: '̑',
        DownLeftRightVector: '⥐',
        DownLeftTeeVector: '⥞',
        DownLeftVector: '↽',
        DownLeftVectorBar: '⥖',
        DownRightTeeVector: '⥟',
        DownRightVector: '⇁',
        DownRightVectorBar: '⥗',
        DownTee: '⊤',
        DownTeeArrow: '↧',
        Downarrow: '⇓',
        Dscr: '𝒟',
        Dstrok: 'Đ',
        ENG: 'Ŋ',
        ET: 'Ð',
        ETH: 'Ð',
        Eacut: 'É',
        Eacute: 'É',
        Ecaron: 'Ě',
        Ecir: 'Ê',
        Ecirc: 'Ê',
        Ecy: 'Э',
        Edot: 'Ė',
        Efr: '𝔈',
        Egrav: 'È',
        Egrave: 'È',
        Element: '∈',
        Emacr: 'Ē',
        EmptySmallSquare: '◻',
        EmptyVerySmallSquare: '▫',
        Eogon: 'Ę',
        Eopf: '𝔼',
        Epsilon: 'Ε',
        Equal: '⩵',
        EqualTilde: '≂',
        Equilibrium: '⇌',
        Escr: 'ℰ',
        Esim: '⩳',
        Eta: 'Η',
        Eum: 'Ë',
        Euml: 'Ë',
        Exists: '∃',
        ExponentialE: 'ⅇ',
        Fcy: 'Ф',
        Ffr: '𝔉',
        FilledSmallSquare: '◼',
        FilledVerySmallSquare: '▪',
        Fopf: '𝔽',
        ForAll: '∀',
        Fouriertrf: 'ℱ',
        Fscr: 'ℱ',
        GJcy: 'Ѓ',
        G: '>',
        GT: '>',
        Gamma: 'Γ',
        Gammad: 'Ϝ',
        Gbreve: 'Ğ',
        Gcedil: 'Ģ',
        Gcirc: 'Ĝ',
        Gcy: 'Г',
        Gdot: 'Ġ',
        Gfr: '𝔊',
        Gg: '⋙',
        Gopf: '𝔾',
        GreaterEqual: '≥',
        GreaterEqualLess: '⋛',
        GreaterFullEqual: '≧',
        GreaterGreater: '⪢',
        GreaterLess: '≷',
        GreaterSlantEqual: '⩾',
        GreaterTilde: '≳',
        Gscr: '𝒢',
        Gt: '≫',
        HARDcy: 'Ъ',
        Hacek: 'ˇ',
        Hat: '^',
        Hcirc: 'Ĥ',
        Hfr: 'ℌ',
        HilbertSpace: 'ℋ',
        Hopf: 'ℍ',
        HorizontalLine: '─',
        Hscr: 'ℋ',
        Hstrok: 'Ħ',
        HumpDownHump: '≎',
        HumpEqual: '≏',
        IEcy: 'Е',
        IJlig: 'Ĳ',
        IOcy: 'Ё',
        Iacut: 'Í',
        Iacute: 'Í',
        Icir: 'Î',
        Icirc: 'Î',
        Icy: 'И',
        Idot: 'İ',
        Ifr: 'ℑ',
        Igrav: 'Ì',
        Igrave: 'Ì',
        Im: 'ℑ',
        Imacr: 'Ī',
        ImaginaryI: 'ⅈ',
        Implies: '⇒',
        Int: '∬',
        Integral: '∫',
        Intersection: '⋂',
        InvisibleComma: '⁣',
        InvisibleTimes: '⁢',
        Iogon: 'Į',
        Iopf: '𝕀',
        Iota: 'Ι',
        Iscr: 'ℐ',
        Itilde: 'Ĩ',
        Iukcy: 'І',
        Ium: 'Ï',
        Iuml: 'Ï',
        Jcirc: 'Ĵ',
        Jcy: 'Й',
        Jfr: '𝔍',
        Jopf: '𝕁',
        Jscr: '𝒥',
        Jsercy: 'Ј',
        Jukcy: 'Є',
        KHcy: 'Х',
        KJcy: 'Ќ',
        Kappa: 'Κ',
        Kcedil: 'Ķ',
        Kcy: 'К',
        Kfr: '𝔎',
        Kopf: '𝕂',
        Kscr: '𝒦',
        LJcy: 'Љ',
        L: '<',
        LT: '<',
        Lacute: 'Ĺ',
        Lambda: 'Λ',
        Lang: '⟪',
        Laplacetrf: 'ℒ',
        Larr: '↞',
        Lcaron: 'Ľ',
        Lcedil: 'Ļ',
        Lcy: 'Л',
        LeftAngleBracket: '⟨',
        LeftArrow: '←',
        LeftArrowBar: '⇤',
        LeftArrowRightArrow: '⇆',
        LeftCeiling: '⌈',
        LeftDoubleBracket: '⟦',
        LeftDownTeeVector: '⥡',
        LeftDownVector: '⇃',
        LeftDownVectorBar: '⥙',
        LeftFloor: '⌊',
        LeftRightArrow: '↔',
        LeftRightVector: '⥎',
        LeftTee: '⊣',
        LeftTeeArrow: '↤',
        LeftTeeVector: '⥚',
        LeftTriangle: '⊲',
        LeftTriangleBar: '⧏',
        LeftTriangleEqual: '⊴',
        LeftUpDownVector: '⥑',
        LeftUpTeeVector: '⥠',
        LeftUpVector: '↿',
        LeftUpVectorBar: '⥘',
        LeftVector: '↼',
        LeftVectorBar: '⥒',
        Leftarrow: '⇐',
        Leftrightarrow: '⇔',
        LessEqualGreater: '⋚',
        LessFullEqual: '≦',
        LessGreater: '≶',
        LessLess: '⪡',
        LessSlantEqual: '⩽',
        LessTilde: '≲',
        Lfr: '𝔏',
        Ll: '⋘',
        Lleftarrow: '⇚',
        Lmidot: 'Ŀ',
        LongLeftArrow: '⟵',
        LongLeftRightArrow: '⟷',
        LongRightArrow: '⟶',
        Longleftarrow: '⟸',
        Longleftrightarrow: '⟺',
        Longrightarrow: '⟹',
        Lopf: '𝕃',
        LowerLeftArrow: '↙',
        LowerRightArrow: '↘',
        Lscr: 'ℒ',
        Lsh: '↰',
        Lstrok: 'Ł',
        Lt: '≪',
        Map: '⤅',
        Mcy: 'М',
        MediumSpace: ' ',
        Mellintrf: 'ℳ',
        Mfr: '𝔐',
        MinusPlus: '∓',
        Mopf: '𝕄',
        Mscr: 'ℳ',
        Mu: 'Μ',
        NJcy: 'Њ',
        Nacute: 'Ń',
        Ncaron: 'Ň',
        Ncedil: 'Ņ',
        Ncy: 'Н',
        NegativeMediumSpace: '​',
        NegativeThickSpace: '​',
        NegativeThinSpace: '​',
        NegativeVeryThinSpace: '​',
        NestedGreaterGreater: '≫',
        NestedLessLess: '≪',
        NewLine: '\n',
        Nfr: '𝔑',
        NoBreak: '⁠',
        NonBreakingSpace: ' ',
        Nopf: 'ℕ',
        Not: '⫬',
        NotCongruent: '≢',
        NotCupCap: '≭',
        NotDoubleVerticalBar: '∦',
        NotElement: '∉',
        NotEqual: '≠',
        NotEqualTilde: '≂̸',
        NotExists: '∄',
        NotGreater: '≯',
        NotGreaterEqual: '≱',
        NotGreaterFullEqual: '≧̸',
        NotGreaterGreater: '≫̸',
        NotGreaterLess: '≹',
        NotGreaterSlantEqual: '⩾̸',
        NotGreaterTilde: '≵',
        NotHumpDownHump: '≎̸',
        NotHumpEqual: '≏̸',
        NotLeftTriangle: '⋪',
        NotLeftTriangleBar: '⧏̸',
        NotLeftTriangleEqual: '⋬',
        NotLess: '≮',
        NotLessEqual: '≰',
        NotLessGreater: '≸',
        NotLessLess: '≪̸',
        NotLessSlantEqual: '⩽̸',
        NotLessTilde: '≴',
        NotNestedGreaterGreater: '⪢̸',
        NotNestedLessLess: '⪡̸',
        NotPrecedes: '⊀',
        NotPrecedesEqual: '⪯̸',
        NotPrecedesSlantEqual: '⋠',
        NotReverseElement: '∌',
        NotRightTriangle: '⋫',
        NotRightTriangleBar: '⧐̸',
        NotRightTriangleEqual: '⋭',
        NotSquareSubset: '⊏̸',
        NotSquareSubsetEqual: '⋢',
        NotSquareSuperset: '⊐̸',
        NotSquareSupersetEqual: '⋣',
        NotSubset: '⊂⃒',
        NotSubsetEqual: '⊈',
        NotSucceeds: '⊁',
        NotSucceedsEqual: '⪰̸',
        NotSucceedsSlantEqual: '⋡',
        NotSucceedsTilde: '≿̸',
        NotSuperset: '⊃⃒',
        NotSupersetEqual: '⊉',
        NotTilde: '≁',
        NotTildeEqual: '≄',
        NotTildeFullEqual: '≇',
        NotTildeTilde: '≉',
        NotVerticalBar: '∤',
        Nscr: '𝒩',
        Ntild: 'Ñ',
        Ntilde: 'Ñ',
        Nu: 'Ν',
        OElig: 'Œ',
        Oacut: 'Ó',
        Oacute: 'Ó',
        Ocir: 'Ô',
        Ocirc: 'Ô',
        Ocy: 'О',
        Odblac: 'Ő',
        Ofr: '𝔒',
        Ograv: 'Ò',
        Ograve: 'Ò',
        Omacr: 'Ō',
        Omega: 'Ω',
        Omicron: 'Ο',
        Oopf: '𝕆',
        OpenCurlyDoubleQuote: '“',
        OpenCurlyQuote: '‘',
        Or: '⩔',
        Oscr: '𝒪',
        Oslas: 'Ø',
        Oslash: 'Ø',
        Otild: 'Õ',
        Otilde: 'Õ',
        Otimes: '⨷',
        Oum: 'Ö',
        Ouml: 'Ö',
        OverBar: '‾',
        OverBrace: '⏞',
        OverBracket: '⎴',
        OverParenthesis: '⏜',
        PartialD: '∂',
        Pcy: 'П',
        Pfr: '𝔓',
        Phi: 'Φ',
        Pi: 'Π',
        PlusMinus: '±',
        Poincareplane: 'ℌ',
        Popf: 'ℙ',
        Pr: '⪻',
        Precedes: '≺',
        PrecedesEqual: '⪯',
        PrecedesSlantEqual: '≼',
        PrecedesTilde: '≾',
        Prime: '″',
        Product: '∏',
        Proportion: '∷',
        Proportional: '∝',
        Pscr: '𝒫',
        Psi: 'Ψ',
        QUO: '"',
        QUOT: '"',
        Qfr: '𝔔',
        Qopf: 'ℚ',
        Qscr: '𝒬',
        RBarr: '⤐',
        RE: '®',
        REG: '®',
        Racute: 'Ŕ',
        Rang: '⟫',
        Rarr: '↠',
        Rarrtl: '⤖',
        Rcaron: 'Ř',
        Rcedil: 'Ŗ',
        Rcy: 'Р',
        Re: 'ℜ',
        ReverseElement: '∋',
        ReverseEquilibrium: '⇋',
        ReverseUpEquilibrium: '⥯',
        Rfr: 'ℜ',
        Rho: 'Ρ',
        RightAngleBracket: '⟩',
        RightArrow: '→',
        RightArrowBar: '⇥',
        RightArrowLeftArrow: '⇄',
        RightCeiling: '⌉',
        RightDoubleBracket: '⟧',
        RightDownTeeVector: '⥝',
        RightDownVector: '⇂',
        RightDownVectorBar: '⥕',
        RightFloor: '⌋',
        RightTee: '⊢',
        RightTeeArrow: '↦',
        RightTeeVector: '⥛',
        RightTriangle: '⊳',
        RightTriangleBar: '⧐',
        RightTriangleEqual: '⊵',
        RightUpDownVector: '⥏',
        RightUpTeeVector: '⥜',
        RightUpVector: '↾',
        RightUpVectorBar: '⥔',
        RightVector: '⇀',
        RightVectorBar: '⥓',
        Rightarrow: '⇒',
        Ropf: 'ℝ',
        RoundImplies: '⥰',
        Rrightarrow: '⇛',
        Rscr: 'ℛ',
        Rsh: '↱',
        RuleDelayed: '⧴',
        SHCHcy: 'Щ',
        SHcy: 'Ш',
        SOFTcy: 'Ь',
        Sacute: 'Ś',
        Sc: '⪼',
        Scaron: 'Š',
        Scedil: 'Ş',
        Scirc: 'Ŝ',
        Scy: 'С',
        Sfr: '𝔖',
        ShortDownArrow: '↓',
        ShortLeftArrow: '←',
        ShortRightArrow: '→',
        ShortUpArrow: '↑',
        Sigma: 'Σ',
        SmallCircle: '∘',
        Sopf: '𝕊',
        Sqrt: '√',
        Square: '□',
        SquareIntersection: '⊓',
        SquareSubset: '⊏',
        SquareSubsetEqual: '⊑',
        SquareSuperset: '⊐',
        SquareSupersetEqual: '⊒',
        SquareUnion: '⊔',
        Sscr: '𝒮',
        Star: '⋆',
        Sub: '⋐',
        Subset: '⋐',
        SubsetEqual: '⊆',
        Succeeds: '≻',
        SucceedsEqual: '⪰',
        SucceedsSlantEqual: '≽',
        SucceedsTilde: '≿',
        SuchThat: '∋',
        Sum: '∑',
        Sup: '⋑',
        Superset: '⊃',
        SupersetEqual: '⊇',
        Supset: '⋑',
        THOR: 'Þ',
        THORN: 'Þ',
        TRADE: '™',
        TSHcy: 'Ћ',
        TScy: 'Ц',
        Tab: '\t',
        Tau: 'Τ',
        Tcaron: 'Ť',
        Tcedil: 'Ţ',
        Tcy: 'Т',
        Tfr: '𝔗',
        Therefore: '∴',
        Theta: 'Θ',
        ThickSpace: '  ',
        ThinSpace: ' ',
        Tilde: '∼',
        TildeEqual: '≃',
        TildeFullEqual: '≅',
        TildeTilde: '≈',
        Topf: '𝕋',
        TripleDot: '⃛',
        Tscr: '𝒯',
        Tstrok: 'Ŧ',
        Uacut: 'Ú',
        Uacute: 'Ú',
        Uarr: '↟',
        Uarrocir: '⥉',
        Ubrcy: 'Ў',
        Ubreve: 'Ŭ',
        Ucir: 'Û',
        Ucirc: 'Û',
        Ucy: 'У',
        Udblac: 'Ű',
        Ufr: '𝔘',
        Ugrav: 'Ù',
        Ugrave: 'Ù',
        Umacr: 'Ū',
        UnderBar: '_',
        UnderBrace: '⏟',
        UnderBracket: '⎵',
        UnderParenthesis: '⏝',
        Union: '⋃',
        UnionPlus: '⊎',
        Uogon: 'Ų',
        Uopf: '𝕌',
        UpArrow: '↑',
        UpArrowBar: '⤒',
        UpArrowDownArrow: '⇅',
        UpDownArrow: '↕',
        UpEquilibrium: '⥮',
        UpTee: '⊥',
        UpTeeArrow: '↥',
        Uparrow: '⇑',
        Updownarrow: '⇕',
        UpperLeftArrow: '↖',
        UpperRightArrow: '↗',
        Upsi: 'ϒ',
        Upsilon: 'Υ',
        Uring: 'Ů',
        Uscr: '𝒰',
        Utilde: 'Ũ',
        Uum: 'Ü',
        Uuml: 'Ü',
        VDash: '⊫',
        Vbar: '⫫',
        Vcy: 'В',
        Vdash: '⊩',
        Vdashl: '⫦',
        Vee: '⋁',
        Verbar: '‖',
        Vert: '‖',
        VerticalBar: '∣',
        VerticalLine: '|',
        VerticalSeparator: '❘',
        VerticalTilde: '≀',
        VeryThinSpace: ' ',
        Vfr: '𝔙',
        Vopf: '𝕍',
        Vscr: '𝒱',
        Vvdash: '⊪',
        Wcirc: 'Ŵ',
        Wedge: '⋀',
        Wfr: '𝔚',
        Wopf: '𝕎',
        Wscr: '𝒲',
        Xfr: '𝔛',
        Xi: 'Ξ',
        Xopf: '𝕏',
        Xscr: '𝒳',
        YAcy: 'Я',
        YIcy: 'Ї',
        YUcy: 'Ю',
        Yacut: 'Ý',
        Yacute: 'Ý',
        Ycirc: 'Ŷ',
        Ycy: 'Ы',
        Yfr: '𝔜',
        Yopf: '𝕐',
        Yscr: '𝒴',
        Yuml: 'Ÿ',
        ZHcy: 'Ж',
        Zacute: 'Ź',
        Zcaron: 'Ž',
        Zcy: 'З',
        Zdot: 'Ż',
        ZeroWidthSpace: '​',
        Zeta: 'Ζ',
        Zfr: 'ℨ',
        Zopf: 'ℤ',
        Zscr: '𝒵',
        aacut: 'á',
        aacute: 'á',
        abreve: 'ă',
        ac: '∾',
        acE: '∾̳',
        acd: '∿',
        acir: 'â',
        acirc: 'â',
        acut: '´',
        acute: '´',
        acy: 'а',
        aeli: 'æ',
        aelig: 'æ',
        af: '⁡',
        afr: '𝔞',
        agrav: 'à',
        agrave: 'à',
        alefsym: 'ℵ',
        aleph: 'ℵ',
        alpha: 'α',
        amacr: 'ā',
        amalg: '⨿',
        am: '&',
        amp: '&',
        and: '∧',
        andand: '⩕',
        andd: '⩜',
        andslope: '⩘',
        andv: '⩚',
        ang: '∠',
        ange: '⦤',
        angle: '∠',
        angmsd: '∡',
        angmsdaa: '⦨',
        angmsdab: '⦩',
        angmsdac: '⦪',
        angmsdad: '⦫',
        angmsdae: '⦬',
        angmsdaf: '⦭',
        angmsdag: '⦮',
        angmsdah: '⦯',
        angrt: '∟',
        angrtvb: '⊾',
        angrtvbd: '⦝',
        angsph: '∢',
        angst: 'Å',
        angzarr: '⍼',
        aogon: 'ą',
        aopf: '𝕒',
        ap: '≈',
        apE: '⩰',
        apacir: '⩯',
        ape: '≊',
        apid: '≋',
        apos: "'",
        approx: '≈',
        approxeq: '≊',
        arin: 'å',
        aring: 'å',
        ascr: '𝒶',
        ast: '*',
        asymp: '≈',
        asympeq: '≍',
        atild: 'ã',
        atilde: 'ã',
        aum: 'ä',
        auml: 'ä',
        awconint: '∳',
        awint: '⨑',
        bNot: '⫭',
        backcong: '≌',
        backepsilon: '϶',
        backprime: '‵',
        backsim: '∽',
        backsimeq: '⋍',
        barvee: '⊽',
        barwed: '⌅',
        barwedge: '⌅',
        bbrk: '⎵',
        bbrktbrk: '⎶',
        bcong: '≌',
        bcy: 'б',
        bdquo: '„',
        becaus: '∵',
        because: '∵',
        bemptyv: '⦰',
        bepsi: '϶',
        bernou: 'ℬ',
        beta: 'β',
        beth: 'ℶ',
        between: '≬',
        bfr: '𝔟',
        bigcap: '⋂',
        bigcirc: '◯',
        bigcup: '⋃',
        bigodot: '⨀',
        bigoplus: '⨁',
        bigotimes: '⨂',
        bigsqcup: '⨆',
        bigstar: '★',
        bigtriangledown: '▽',
        bigtriangleup: '△',
        biguplus: '⨄',
        bigvee: '⋁',
        bigwedge: '⋀',
        bkarow: '⤍',
        blacklozenge: '⧫',
        blacksquare: '▪',
        blacktriangle: '▴',
        blacktriangledown: '▾',
        blacktriangleleft: '◂',
        blacktriangleright: '▸',
        blank: '␣',
        blk12: '▒',
        blk14: '░',
        blk34: '▓',
        block: '█',
        bne: '=⃥',
        bnequiv: '≡⃥',
        bnot: '⌐',
        bopf: '𝕓',
        bot: '⊥',
        bottom: '⊥',
        bowtie: '⋈',
        boxDL: '╗',
        boxDR: '╔',
        boxDl: '╖',
        boxDr: '╓',
        boxH: '═',
        boxHD: '╦',
        boxHU: '╩',
        boxHd: '╤',
        boxHu: '╧',
        boxUL: '╝',
        boxUR: '╚',
        boxUl: '╜',
        boxUr: '╙',
        boxV: '║',
        boxVH: '╬',
        boxVL: '╣',
        boxVR: '╠',
        boxVh: '╫',
        boxVl: '╢',
        boxVr: '╟',
        boxbox: '⧉',
        boxdL: '╕',
        boxdR: '╒',
        boxdl: '┐',
        boxdr: '┌',
        boxh: '─',
        boxhD: '╥',
        boxhU: '╨',
        boxhd: '┬',
        boxhu: '┴',
        boxminus: '⊟',
        boxplus: '⊞',
        boxtimes: '⊠',
        boxuL: '╛',
        boxuR: '╘',
        boxul: '┘',
        boxur: '└',
        boxv: '│',
        boxvH: '╪',
        boxvL: '╡',
        boxvR: '╞',
        boxvh: '┼',
        boxvl: '┤',
        boxvr: '├',
        bprime: '‵',
        breve: '˘',
        brvba: '¦',
        brvbar: '¦',
        bscr: '𝒷',
        bsemi: '⁏',
        bsim: '∽',
        bsime: '⋍',
        bsol: '\\',
        bsolb: '⧅',
        bsolhsub: '⟈',
        bull: '•',
        bullet: '•',
        bump: '≎',
        bumpE: '⪮',
        bumpe: '≏',
        bumpeq: '≏',
        cacute: 'ć',
        cap: '∩',
        capand: '⩄',
        capbrcup: '⩉',
        capcap: '⩋',
        capcup: '⩇',
        capdot: '⩀',
        caps: '∩︀',
        caret: '⁁',
        caron: 'ˇ',
        ccaps: '⩍',
        ccaron: 'č',
        ccedi: 'ç',
        ccedil: 'ç',
        ccirc: 'ĉ',
        ccups: '⩌',
        ccupssm: '⩐',
        cdot: 'ċ',
        cedi: '¸',
        cedil: '¸',
        cemptyv: '⦲',
        cen: '¢',
        cent: '¢',
        centerdot: '·',
        cfr: '𝔠',
        chcy: 'ч',
        check: '✓',
        checkmark: '✓',
        chi: 'χ',
        cir: '○',
        cirE: '⧃',
        circ: 'ˆ',
        circeq: '≗',
        circlearrowleft: '↺',
        circlearrowright: '↻',
        circledR: '®',
        circledS: 'Ⓢ',
        circledast: '⊛',
        circledcirc: '⊚',
        circleddash: '⊝',
        cire: '≗',
        cirfnint: '⨐',
        cirmid: '⫯',
        cirscir: '⧂',
        clubs: '♣',
        clubsuit: '♣',
        colon: ':',
        colone: '≔',
        coloneq: '≔',
        comma: ',',
        commat: '@',
        comp: '∁',
        compfn: '∘',
        complement: '∁',
        complexes: 'ℂ',
        cong: '≅',
        congdot: '⩭',
        conint: '∮',
        copf: '𝕔',
        coprod: '∐',
        cop: '©',
        copy: '©',
        copysr: '℗',
        crarr: '↵',
        cross: '✗',
        cscr: '𝒸',
        csub: '⫏',
        csube: '⫑',
        csup: '⫐',
        csupe: '⫒',
        ctdot: '⋯',
        cudarrl: '⤸',
        cudarrr: '⤵',
        cuepr: '⋞',
        cuesc: '⋟',
        cularr: '↶',
        cularrp: '⤽',
        cup: '∪',
        cupbrcap: '⩈',
        cupcap: '⩆',
        cupcup: '⩊',
        cupdot: '⊍',
        cupor: '⩅',
        cups: '∪︀',
        curarr: '↷',
        curarrm: '⤼',
        curlyeqprec: '⋞',
        curlyeqsucc: '⋟',
        curlyvee: '⋎',
        curlywedge: '⋏',
        curre: '¤',
        curren: '¤',
        curvearrowleft: '↶',
        curvearrowright: '↷',
        cuvee: '⋎',
        cuwed: '⋏',
        cwconint: '∲',
        cwint: '∱',
        cylcty: '⌭',
        dArr: '⇓',
        dHar: '⥥',
        dagger: '†',
        daleth: 'ℸ',
        darr: '↓',
        dash: '‐',
        dashv: '⊣',
        dbkarow: '⤏',
        dblac: '˝',
        dcaron: 'ď',
        dcy: 'д',
        dd: 'ⅆ',
        ddagger: '‡',
        ddarr: '⇊',
        ddotseq: '⩷',
        de: '°',
        deg: '°',
        delta: 'δ',
        demptyv: '⦱',
        dfisht: '⥿',
        dfr: '𝔡',
        dharl: '⇃',
        dharr: '⇂',
        diam: '⋄',
        diamond: '⋄',
        diamondsuit: '♦',
        diams: '♦',
        die: '¨',
        digamma: 'ϝ',
        disin: '⋲',
        div: '÷',
        divid: '÷',
        divide: '÷',
        divideontimes: '⋇',
        divonx: '⋇',
        djcy: 'ђ',
        dlcorn: '⌞',
        dlcrop: '⌍',
        dollar: '$',
        dopf: '𝕕',
        dot: '˙',
        doteq: '≐',
        doteqdot: '≑',
        dotminus: '∸',
        dotplus: '∔',
        dotsquare: '⊡',
        doublebarwedge: '⌆',
        downarrow: '↓',
        downdownarrows: '⇊',
        downharpoonleft: '⇃',
        downharpoonright: '⇂',
        drbkarow: '⤐',
        drcorn: '⌟',
        drcrop: '⌌',
        dscr: '𝒹',
        dscy: 'ѕ',
        dsol: '⧶',
        dstrok: 'đ',
        dtdot: '⋱',
        dtri: '▿',
        dtrif: '▾',
        duarr: '⇵',
        duhar: '⥯',
        dwangle: '⦦',
        dzcy: 'џ',
        dzigrarr: '⟿',
        eDDot: '⩷',
        eDot: '≑',
        eacut: 'é',
        eacute: 'é',
        easter: '⩮',
        ecaron: 'ě',
        ecir: 'ê',
        ecirc: 'ê',
        ecolon: '≕',
        ecy: 'э',
        edot: 'ė',
        ee: 'ⅇ',
        efDot: '≒',
        efr: '𝔢',
        eg: '⪚',
        egrav: 'è',
        egrave: 'è',
        egs: '⪖',
        egsdot: '⪘',
        el: '⪙',
        elinters: '⏧',
        ell: 'ℓ',
        els: '⪕',
        elsdot: '⪗',
        emacr: 'ē',
        empty: '∅',
        emptyset: '∅',
        emptyv: '∅',
        emsp13: ' ',
        emsp14: ' ',
        emsp: ' ',
        eng: 'ŋ',
        ensp: ' ',
        eogon: 'ę',
        eopf: '𝕖',
        epar: '⋕',
        eparsl: '⧣',
        eplus: '⩱',
        epsi: 'ε',
        epsilon: 'ε',
        epsiv: 'ϵ',
        eqcirc: '≖',
        eqcolon: '≕',
        eqsim: '≂',
        eqslantgtr: '⪖',
        eqslantless: '⪕',
        equals: '=',
        equest: '≟',
        equiv: '≡',
        equivDD: '⩸',
        eqvparsl: '⧥',
        erDot: '≓',
        erarr: '⥱',
        escr: 'ℯ',
        esdot: '≐',
        esim: '≂',
        eta: 'η',
        et: 'ð',
        eth: 'ð',
        eum: 'ë',
        euml: 'ë',
        euro: '€',
        excl: '!',
        exist: '∃',
        expectation: 'ℰ',
        exponentiale: 'ⅇ',
        fallingdotseq: '≒',
        fcy: 'ф',
        female: '♀',
        ffilig: 'ﬃ',
        fflig: 'ﬀ',
        ffllig: 'ﬄ',
        ffr: '𝔣',
        filig: 'ﬁ',
        fjlig: 'fj',
        flat: '♭',
        fllig: 'ﬂ',
        fltns: '▱',
        fnof: 'ƒ',
        fopf: '𝕗',
        forall: '∀',
        fork: '⋔',
        forkv: '⫙',
        fpartint: '⨍',
        frac1: '¼',
        frac12: '½',
        frac13: '⅓',
        frac14: '¼',
        frac15: '⅕',
        frac16: '⅙',
        frac18: '⅛',
        frac23: '⅔',
        frac25: '⅖',
        frac3: '¾',
        frac34: '¾',
        frac35: '⅗',
        frac38: '⅜',
        frac45: '⅘',
        frac56: '⅚',
        frac58: '⅝',
        frac78: '⅞',
        frasl: '⁄',
        frown: '⌢',
        fscr: '𝒻',
        gE: '≧',
        gEl: '⪌',
        gacute: 'ǵ',
        gamma: 'γ',
        gammad: 'ϝ',
        gap: '⪆',
        gbreve: 'ğ',
        gcirc: 'ĝ',
        gcy: 'г',
        gdot: 'ġ',
        ge: '≥',
        gel: '⋛',
        geq: '≥',
        geqq: '≧',
        geqslant: '⩾',
        ges: '⩾',
        gescc: '⪩',
        gesdot: '⪀',
        gesdoto: '⪂',
        gesdotol: '⪄',
        gesl: '⋛︀',
        gesles: '⪔',
        gfr: '𝔤',
        gg: '≫',
        ggg: '⋙',
        gimel: 'ℷ',
        gjcy: 'ѓ',
        gl: '≷',
        glE: '⪒',
        gla: '⪥',
        glj: '⪤',
        gnE: '≩',
        gnap: '⪊',
        gnapprox: '⪊',
        gne: '⪈',
        gneq: '⪈',
        gneqq: '≩',
        gnsim: '⋧',
        gopf: '𝕘',
        grave: '`',
        gscr: 'ℊ',
        gsim: '≳',
        gsime: '⪎',
        gsiml: '⪐',
        g: '>',
        gt: '>',
        gtcc: '⪧',
        gtcir: '⩺',
        gtdot: '⋗',
        gtlPar: '⦕',
        gtquest: '⩼',
        gtrapprox: '⪆',
        gtrarr: '⥸',
        gtrdot: '⋗',
        gtreqless: '⋛',
        gtreqqless: '⪌',
        gtrless: '≷',
        gtrsim: '≳',
        gvertneqq: '≩︀',
        gvnE: '≩︀',
        hArr: '⇔',
        hairsp: ' ',
        half: '½',
        hamilt: 'ℋ',
        hardcy: 'ъ',
        harr: '↔',
        harrcir: '⥈',
        harrw: '↭',
        hbar: 'ℏ',
        hcirc: 'ĥ',
        hearts: '♥',
        heartsuit: '♥',
        hellip: '…',
        hercon: '⊹',
        hfr: '𝔥',
        hksearow: '⤥',
        hkswarow: '⤦',
        hoarr: '⇿',
        homtht: '∻',
        hookleftarrow: '↩',
        hookrightarrow: '↪',
        hopf: '𝕙',
        horbar: '―',
        hscr: '𝒽',
        hslash: 'ℏ',
        hstrok: 'ħ',
        hybull: '⁃',
        hyphen: '‐',
        iacut: 'í',
        iacute: 'í',
        ic: '⁣',
        icir: 'î',
        icirc: 'î',
        icy: 'и',
        iecy: 'е',
        iexc: '¡',
        iexcl: '¡',
        iff: '⇔',
        ifr: '𝔦',
        igrav: 'ì',
        igrave: 'ì',
        ii: 'ⅈ',
        iiiint: '⨌',
        iiint: '∭',
        iinfin: '⧜',
        iiota: '℩',
        ijlig: 'ĳ',
        imacr: 'ī',
        image: 'ℑ',
        imagline: 'ℐ',
        imagpart: 'ℑ',
        imath: 'ı',
        imof: '⊷',
        imped: 'Ƶ',
        in: '∈',
        incare: '℅',
        infin: '∞',
        infintie: '⧝',
        inodot: 'ı',
        int: '∫',
        intcal: '⊺',
        integers: 'ℤ',
        intercal: '⊺',
        intlarhk: '⨗',
        intprod: '⨼',
        iocy: 'ё',
        iogon: 'į',
        iopf: '𝕚',
        iota: 'ι',
        iprod: '⨼',
        iques: '¿',
        iquest: '¿',
        iscr: '𝒾',
        isin: '∈',
        isinE: '⋹',
        isindot: '⋵',
        isins: '⋴',
        isinsv: '⋳',
        isinv: '∈',
        it: '⁢',
        itilde: 'ĩ',
        iukcy: 'і',
        ium: 'ï',
        iuml: 'ï',
        jcirc: 'ĵ',
        jcy: 'й',
        jfr: '𝔧',
        jmath: 'ȷ',
        jopf: '𝕛',
        jscr: '𝒿',
        jsercy: 'ј',
        jukcy: 'є',
        kappa: 'κ',
        kappav: 'ϰ',
        kcedil: 'ķ',
        kcy: 'к',
        kfr: '𝔨',
        kgreen: 'ĸ',
        khcy: 'х',
        kjcy: 'ќ',
        kopf: '𝕜',
        kscr: '𝓀',
        lAarr: '⇚',
        lArr: '⇐',
        lAtail: '⤛',
        lBarr: '⤎',
        lE: '≦',
        lEg: '⪋',
        lHar: '⥢',
        lacute: 'ĺ',
        laemptyv: '⦴',
        lagran: 'ℒ',
        lambda: 'λ',
        lang: '⟨',
        langd: '⦑',
        langle: '⟨',
        lap: '⪅',
        laqu: '«',
        laquo: '«',
        larr: '←',
        larrb: '⇤',
        larrbfs: '⤟',
        larrfs: '⤝',
        larrhk: '↩',
        larrlp: '↫',
        larrpl: '⤹',
        larrsim: '⥳',
        larrtl: '↢',
        lat: '⪫',
        latail: '⤙',
        late: '⪭',
        lates: '⪭︀',
        lbarr: '⤌',
        lbbrk: '❲',
        lbrace: '{',
        lbrack: '[',
        lbrke: '⦋',
        lbrksld: '⦏',
        lbrkslu: '⦍',
        lcaron: 'ľ',
        lcedil: 'ļ',
        lceil: '⌈',
        lcub: '{',
        lcy: 'л',
        ldca: '⤶',
        ldquo: '“',
        ldquor: '„',
        ldrdhar: '⥧',
        ldrushar: '⥋',
        ldsh: '↲',
        le: '≤',
        leftarrow: '←',
        leftarrowtail: '↢',
        leftharpoondown: '↽',
        leftharpoonup: '↼',
        leftleftarrows: '⇇',
        leftrightarrow: '↔',
        leftrightarrows: '⇆',
        leftrightharpoons: '⇋',
        leftrightsquigarrow: '↭',
        leftthreetimes: '⋋',
        leg: '⋚',
        leq: '≤',
        leqq: '≦',
        leqslant: '⩽',
        les: '⩽',
        lescc: '⪨',
        lesdot: '⩿',
        lesdoto: '⪁',
        lesdotor: '⪃',
        lesg: '⋚︀',
        lesges: '⪓',
        lessapprox: '⪅',
        lessdot: '⋖',
        lesseqgtr: '⋚',
        lesseqqgtr: '⪋',
        lessgtr: '≶',
        lesssim: '≲',
        lfisht: '⥼',
        lfloor: '⌊',
        lfr: '𝔩',
        lg: '≶',
        lgE: '⪑',
        lhard: '↽',
        lharu: '↼',
        lharul: '⥪',
        lhblk: '▄',
        ljcy: 'љ',
        ll: '≪',
        llarr: '⇇',
        llcorner: '⌞',
        llhard: '⥫',
        lltri: '◺',
        lmidot: 'ŀ',
        lmoust: '⎰',
        lmoustache: '⎰',
        lnE: '≨',
        lnap: '⪉',
        lnapprox: '⪉',
        lne: '⪇',
        lneq: '⪇',
        lneqq: '≨',
        lnsim: '⋦',
        loang: '⟬',
        loarr: '⇽',
        lobrk: '⟦',
        longleftarrow: '⟵',
        longleftrightarrow: '⟷',
        longmapsto: '⟼',
        longrightarrow: '⟶',
        looparrowleft: '↫',
        looparrowright: '↬',
        lopar: '⦅',
        lopf: '𝕝',
        loplus: '⨭',
        lotimes: '⨴',
        lowast: '∗',
        lowbar: '_',
        loz: '◊',
        lozenge: '◊',
        lozf: '⧫',
        lpar: '(',
        lparlt: '⦓',
        lrarr: '⇆',
        lrcorner: '⌟',
        lrhar: '⇋',
        lrhard: '⥭',
        lrm: '‎',
        lrtri: '⊿',
        lsaquo: '‹',
        lscr: '𝓁',
        lsh: '↰',
        lsim: '≲',
        lsime: '⪍',
        lsimg: '⪏',
        lsqb: '[',
        lsquo: '‘',
        lsquor: '‚',
        lstrok: 'ł',
        l: '<',
        lt: '<',
        ltcc: '⪦',
        ltcir: '⩹',
        ltdot: '⋖',
        lthree: '⋋',
        ltimes: '⋉',
        ltlarr: '⥶',
        ltquest: '⩻',
        ltrPar: '⦖',
        ltri: '◃',
        ltrie: '⊴',
        ltrif: '◂',
        lurdshar: '⥊',
        luruhar: '⥦',
        lvertneqq: '≨︀',
        lvnE: '≨︀',
        mDDot: '∺',
        mac: '¯',
        macr: '¯',
        male: '♂',
        malt: '✠',
        maltese: '✠',
        map: '↦',
        mapsto: '↦',
        mapstodown: '↧',
        mapstoleft: '↤',
        mapstoup: '↥',
        marker: '▮',
        mcomma: '⨩',
        mcy: 'м',
        mdash: '—',
        measuredangle: '∡',
        mfr: '𝔪',
        mho: '℧',
        micr: 'µ',
        micro: 'µ',
        mid: '∣',
        midast: '*',
        midcir: '⫰',
        middo: '·',
        middot: '·',
        minus: '−',
        minusb: '⊟',
        minusd: '∸',
        minusdu: '⨪',
        mlcp: '⫛',
        mldr: '…',
        mnplus: '∓',
        models: '⊧',
        mopf: '𝕞',
        mp: '∓',
        mscr: '𝓂',
        mstpos: '∾',
        mu: 'μ',
        multimap: '⊸',
        mumap: '⊸',
        nGg: '⋙̸',
        nGt: '≫⃒',
        nGtv: '≫̸',
        nLeftarrow: '⇍',
        nLeftrightarrow: '⇎',
        nLl: '⋘̸',
        nLt: '≪⃒',
        nLtv: '≪̸',
        nRightarrow: '⇏',
        nVDash: '⊯',
        nVdash: '⊮',
        nabla: '∇',
        nacute: 'ń',
        nang: '∠⃒',
        nap: '≉',
        napE: '⩰̸',
        napid: '≋̸',
        napos: 'ŉ',
        napprox: '≉',
        natur: '♮',
        natural: '♮',
        naturals: 'ℕ',
        nbs: ' ',
        nbsp: ' ',
        nbump: '≎̸',
        nbumpe: '≏̸',
        ncap: '⩃',
        ncaron: 'ň',
        ncedil: 'ņ',
        ncong: '≇',
        ncongdot: '⩭̸',
        ncup: '⩂',
        ncy: 'н',
        ndash: '–',
        ne: '≠',
        neArr: '⇗',
        nearhk: '⤤',
        nearr: '↗',
        nearrow: '↗',
        nedot: '≐̸',
        nequiv: '≢',
        nesear: '⤨',
        nesim: '≂̸',
        nexist: '∄',
        nexists: '∄',
        nfr: '𝔫',
        ngE: '≧̸',
        nge: '≱',
        ngeq: '≱',
        ngeqq: '≧̸',
        ngeqslant: '⩾̸',
        nges: '⩾̸',
        ngsim: '≵',
        ngt: '≯',
        ngtr: '≯',
        nhArr: '⇎',
        nharr: '↮',
        nhpar: '⫲',
        ni: '∋',
        nis: '⋼',
        nisd: '⋺',
        niv: '∋',
        njcy: 'њ',
        nlArr: '⇍',
        nlE: '≦̸',
        nlarr: '↚',
        nldr: '‥',
        nle: '≰',
        nleftarrow: '↚',
        nleftrightarrow: '↮',
        nleq: '≰',
        nleqq: '≦̸',
        nleqslant: '⩽̸',
        nles: '⩽̸',
        nless: '≮',
        nlsim: '≴',
        nlt: '≮',
        nltri: '⋪',
        nltrie: '⋬',
        nmid: '∤',
        nopf: '𝕟',
        no: '¬',
        not: '¬',
        notin: '∉',
        notinE: '⋹̸',
        notindot: '⋵̸',
        notinva: '∉',
        notinvb: '⋷',
        notinvc: '⋶',
        notni: '∌',
        notniva: '∌',
        notnivb: '⋾',
        notnivc: '⋽',
        npar: '∦',
        nparallel: '∦',
        nparsl: '⫽⃥',
        npart: '∂̸',
        npolint: '⨔',
        npr: '⊀',
        nprcue: '⋠',
        npre: '⪯̸',
        nprec: '⊀',
        npreceq: '⪯̸',
        nrArr: '⇏',
        nrarr: '↛',
        nrarrc: '⤳̸',
        nrarrw: '↝̸',
        nrightarrow: '↛',
        nrtri: '⋫',
        nrtrie: '⋭',
        nsc: '⊁',
        nsccue: '⋡',
        nsce: '⪰̸',
        nscr: '𝓃',
        nshortmid: '∤',
        nshortparallel: '∦',
        nsim: '≁',
        nsime: '≄',
        nsimeq: '≄',
        nsmid: '∤',
        nspar: '∦',
        nsqsube: '⋢',
        nsqsupe: '⋣',
        nsub: '⊄',
        nsubE: '⫅̸',
        nsube: '⊈',
        nsubset: '⊂⃒',
        nsubseteq: '⊈',
        nsubseteqq: '⫅̸',
        nsucc: '⊁',
        nsucceq: '⪰̸',
        nsup: '⊅',
        nsupE: '⫆̸',
        nsupe: '⊉',
        nsupset: '⊃⃒',
        nsupseteq: '⊉',
        nsupseteqq: '⫆̸',
        ntgl: '≹',
        ntild: 'ñ',
        ntilde: 'ñ',
        ntlg: '≸',
        ntriangleleft: '⋪',
        ntrianglelefteq: '⋬',
        ntriangleright: '⋫',
        ntrianglerighteq: '⋭',
        nu: 'ν',
        num: '#',
        numero: '№',
        numsp: ' ',
        nvDash: '⊭',
        nvHarr: '⤄',
        nvap: '≍⃒',
        nvdash: '⊬',
        nvge: '≥⃒',
        nvgt: '>⃒',
        nvinfin: '⧞',
        nvlArr: '⤂',
        nvle: '≤⃒',
        nvlt: '<⃒',
        nvltrie: '⊴⃒',
        nvrArr: '⤃',
        nvrtrie: '⊵⃒',
        nvsim: '∼⃒',
        nwArr: '⇖',
        nwarhk: '⤣',
        nwarr: '↖',
        nwarrow: '↖',
        nwnear: '⤧',
        oS: 'Ⓢ',
        oacut: 'ó',
        oacute: 'ó',
        oast: '⊛',
        ocir: 'ô',
        ocirc: 'ô',
        ocy: 'о',
        odash: '⊝',
        odblac: 'ő',
        odiv: '⨸',
        odot: '⊙',
        odsold: '⦼',
        oelig: 'œ',
        ofcir: '⦿',
        ofr: '𝔬',
        ogon: '˛',
        ograv: 'ò',
        ograve: 'ò',
        ogt: '⧁',
        ohbar: '⦵',
        ohm: 'Ω',
        oint: '∮',
        olarr: '↺',
        olcir: '⦾',
        olcross: '⦻',
        oline: '‾',
        olt: '⧀',
        omacr: 'ō',
        omega: 'ω',
        omicron: 'ο',
        omid: '⦶',
        ominus: '⊖',
        oopf: '𝕠',
        opar: '⦷',
        operp: '⦹',
        oplus: '⊕',
        or: '∨',
        orarr: '↻',
        ord: 'º',
        order: 'ℴ',
        orderof: 'ℴ',
        ordf: 'ª',
        ordm: 'º',
        origof: '⊶',
        oror: '⩖',
        orslope: '⩗',
        orv: '⩛',
        oscr: 'ℴ',
        oslas: 'ø',
        oslash: 'ø',
        osol: '⊘',
        otild: 'õ',
        otilde: 'õ',
        otimes: '⊗',
        otimesas: '⨶',
        oum: 'ö',
        ouml: 'ö',
        ovbar: '⌽',
        par: '¶',
        para: '¶',
        parallel: '∥',
        parsim: '⫳',
        parsl: '⫽',
        part: '∂',
        pcy: 'п',
        percnt: '%',
        period: '.',
        permil: '‰',
        perp: '⊥',
        pertenk: '‱',
        pfr: '𝔭',
        phi: 'φ',
        phiv: 'ϕ',
        phmmat: 'ℳ',
        phone: '☎',
        pi: 'π',
        pitchfork: '⋔',
        piv: 'ϖ',
        planck: 'ℏ',
        planckh: 'ℎ',
        plankv: 'ℏ',
        plus: '+',
        plusacir: '⨣',
        plusb: '⊞',
        pluscir: '⨢',
        plusdo: '∔',
        plusdu: '⨥',
        pluse: '⩲',
        plusm: '±',
        plusmn: '±',
        plussim: '⨦',
        plustwo: '⨧',
        pm: '±',
        pointint: '⨕',
        popf: '𝕡',
        poun: '£',
        pound: '£',
        pr: '≺',
        prE: '⪳',
        prap: '⪷',
        prcue: '≼',
        pre: '⪯',
        prec: '≺',
        precapprox: '⪷',
        preccurlyeq: '≼',
        preceq: '⪯',
        precnapprox: '⪹',
        precneqq: '⪵',
        precnsim: '⋨',
        precsim: '≾',
        prime: '′',
        primes: 'ℙ',
        prnE: '⪵',
        prnap: '⪹',
        prnsim: '⋨',
        prod: '∏',
        profalar: '⌮',
        profline: '⌒',
        profsurf: '⌓',
        prop: '∝',
        propto: '∝',
        prsim: '≾',
        prurel: '⊰',
        pscr: '𝓅',
        psi: 'ψ',
        puncsp: ' ',
        qfr: '𝔮',
        qint: '⨌',
        qopf: '𝕢',
        qprime: '⁗',
        qscr: '𝓆',
        quaternions: 'ℍ',
        quatint: '⨖',
        quest: '?',
        questeq: '≟',
        quo: '"',
        quot: '"',
        rAarr: '⇛',
        rArr: '⇒',
        rAtail: '⤜',
        rBarr: '⤏',
        rHar: '⥤',
        race: '∽̱',
        racute: 'ŕ',
        radic: '√',
        raemptyv: '⦳',
        rang: '⟩',
        rangd: '⦒',
        range: '⦥',
        rangle: '⟩',
        raqu: '»',
        raquo: '»',
        rarr: '→',
        rarrap: '⥵',
        rarrb: '⇥',
        rarrbfs: '⤠',
        rarrc: '⤳',
        rarrfs: '⤞',
        rarrhk: '↪',
        rarrlp: '↬',
        rarrpl: '⥅',
        rarrsim: '⥴',
        rarrtl: '↣',
        rarrw: '↝',
        ratail: '⤚',
        ratio: '∶',
        rationals: 'ℚ',
        rbarr: '⤍',
        rbbrk: '❳',
        rbrace: '}',
        rbrack: ']',
        rbrke: '⦌',
        rbrksld: '⦎',
        rbrkslu: '⦐',
        rcaron: 'ř',
        rcedil: 'ŗ',
        rceil: '⌉',
        rcub: '}',
        rcy: 'р',
        rdca: '⤷',
        rdldhar: '⥩',
        rdquo: '”',
        rdquor: '”',
        rdsh: '↳',
        real: 'ℜ',
        realine: 'ℛ',
        realpart: 'ℜ',
        reals: 'ℝ',
        rect: '▭',
        re: '®',
        reg: '®',
        rfisht: '⥽',
        rfloor: '⌋',
        rfr: '𝔯',
        rhard: '⇁',
        rharu: '⇀',
        rharul: '⥬',
        rho: 'ρ',
        rhov: 'ϱ',
        rightarrow: '→',
        rightarrowtail: '↣',
        rightharpoondown: '⇁',
        rightharpoonup: '⇀',
        rightleftarrows: '⇄',
        rightleftharpoons: '⇌',
        rightrightarrows: '⇉',
        rightsquigarrow: '↝',
        rightthreetimes: '⋌',
        ring: '˚',
        risingdotseq: '≓',
        rlarr: '⇄',
        rlhar: '⇌',
        rlm: '‏',
        rmoust: '⎱',
        rmoustache: '⎱',
        rnmid: '⫮',
        roang: '⟭',
        roarr: '⇾',
        robrk: '⟧',
        ropar: '⦆',
        ropf: '𝕣',
        roplus: '⨮',
        rotimes: '⨵',
        rpar: ')',
        rpargt: '⦔',
        rppolint: '⨒',
        rrarr: '⇉',
        rsaquo: '›',
        rscr: '𝓇',
        rsh: '↱',
        rsqb: ']',
        rsquo: '’',
        rsquor: '’',
        rthree: '⋌',
        rtimes: '⋊',
        rtri: '▹',
        rtrie: '⊵',
        rtrif: '▸',
        rtriltri: '⧎',
        ruluhar: '⥨',
        rx: '℞',
        sacute: 'ś',
        sbquo: '‚',
        sc: '≻',
        scE: '⪴',
        scap: '⪸',
        scaron: 'š',
        sccue: '≽',
        sce: '⪰',
        scedil: 'ş',
        scirc: 'ŝ',
        scnE: '⪶',
        scnap: '⪺',
        scnsim: '⋩',
        scpolint: '⨓',
        scsim: '≿',
        scy: 'с',
        sdot: '⋅',
        sdotb: '⊡',
        sdote: '⩦',
        seArr: '⇘',
        searhk: '⤥',
        searr: '↘',
        searrow: '↘',
        sec: '§',
        sect: '§',
        semi: ';',
        seswar: '⤩',
        setminus: '∖',
        setmn: '∖',
        sext: '✶',
        sfr: '𝔰',
        sfrown: '⌢',
        sharp: '♯',
        shchcy: 'щ',
        shcy: 'ш',
        shortmid: '∣',
        shortparallel: '∥',
        sh: '­',
        shy: '­',
        sigma: 'σ',
        sigmaf: 'ς',
        sigmav: 'ς',
        sim: '∼',
        simdot: '⩪',
        sime: '≃',
        simeq: '≃',
        simg: '⪞',
        simgE: '⪠',
        siml: '⪝',
        simlE: '⪟',
        simne: '≆',
        simplus: '⨤',
        simrarr: '⥲',
        slarr: '←',
        smallsetminus: '∖',
        smashp: '⨳',
        smeparsl: '⧤',
        smid: '∣',
        smile: '⌣',
        smt: '⪪',
        smte: '⪬',
        smtes: '⪬︀',
        softcy: 'ь',
        sol: '/',
        solb: '⧄',
        solbar: '⌿',
        sopf: '𝕤',
        spades: '♠',
        spadesuit: '♠',
        spar: '∥',
        sqcap: '⊓',
        sqcaps: '⊓︀',
        sqcup: '⊔',
        sqcups: '⊔︀',
        sqsub: '⊏',
        sqsube: '⊑',
        sqsubset: '⊏',
        sqsubseteq: '⊑',
        sqsup: '⊐',
        sqsupe: '⊒',
        sqsupset: '⊐',
        sqsupseteq: '⊒',
        squ: '□',
        square: '□',
        squarf: '▪',
        squf: '▪',
        srarr: '→',
        sscr: '𝓈',
        ssetmn: '∖',
        ssmile: '⌣',
        sstarf: '⋆',
        star: '☆',
        starf: '★',
        straightepsilon: 'ϵ',
        straightphi: 'ϕ',
        strns: '¯',
        sub: '⊂',
        subE: '⫅',
        subdot: '⪽',
        sube: '⊆',
        subedot: '⫃',
        submult: '⫁',
        subnE: '⫋',
        subne: '⊊',
        subplus: '⪿',
        subrarr: '⥹',
        subset: '⊂',
        subseteq: '⊆',
        subseteqq: '⫅',
        subsetneq: '⊊',
        subsetneqq: '⫋',
        subsim: '⫇',
        subsub: '⫕',
        subsup: '⫓',
        succ: '≻',
        succapprox: '⪸',
        succcurlyeq: '≽',
        succeq: '⪰',
        succnapprox: '⪺',
        succneqq: '⪶',
        succnsim: '⋩',
        succsim: '≿',
        sum: '∑',
        sung: '♪',
        sup: '⊃',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        supE: '⫆',
        supdot: '⪾',
        supdsub: '⫘',
        supe: '⊇',
        supedot: '⫄',
        suphsol: '⟉',
        suphsub: '⫗',
        suplarr: '⥻',
        supmult: '⫂',
        supnE: '⫌',
        supne: '⊋',
        supplus: '⫀',
        supset: '⊃',
        supseteq: '⊇',
        supseteqq: '⫆',
        supsetneq: '⊋',
        supsetneqq: '⫌',
        supsim: '⫈',
        supsub: '⫔',
        supsup: '⫖',
        swArr: '⇙',
        swarhk: '⤦',
        swarr: '↙',
        swarrow: '↙',
        swnwar: '⤪',
        szli: 'ß',
        szlig: 'ß',
        target: '⌖',
        tau: 'τ',
        tbrk: '⎴',
        tcaron: 'ť',
        tcedil: 'ţ',
        tcy: 'т',
        tdot: '⃛',
        telrec: '⌕',
        tfr: '𝔱',
        there4: '∴',
        therefore: '∴',
        theta: 'θ',
        thetasym: 'ϑ',
        thetav: 'ϑ',
        thickapprox: '≈',
        thicksim: '∼',
        thinsp: ' ',
        thkap: '≈',
        thksim: '∼',
        thor: 'þ',
        thorn: 'þ',
        tilde: '˜',
        time: '×',
        times: '×',
        timesb: '⊠',
        timesbar: '⨱',
        timesd: '⨰',
        tint: '∭',
        toea: '⤨',
        top: '⊤',
        topbot: '⌶',
        topcir: '⫱',
        topf: '𝕥',
        topfork: '⫚',
        tosa: '⤩',
        tprime: '‴',
        trade: '™',
        triangle: '▵',
        triangledown: '▿',
        triangleleft: '◃',
        trianglelefteq: '⊴',
        triangleq: '≜',
        triangleright: '▹',
        trianglerighteq: '⊵',
        tridot: '◬',
        trie: '≜',
        triminus: '⨺',
        triplus: '⨹',
        trisb: '⧍',
        tritime: '⨻',
        trpezium: '⏢',
        tscr: '𝓉',
        tscy: 'ц',
        tshcy: 'ћ',
        tstrok: 'ŧ',
        twixt: '≬',
        twoheadleftarrow: '↞',
        twoheadrightarrow: '↠',
        uArr: '⇑',
        uHar: '⥣',
        uacut: 'ú',
        uacute: 'ú',
        uarr: '↑',
        ubrcy: 'ў',
        ubreve: 'ŭ',
        ucir: 'û',
        ucirc: 'û',
        ucy: 'у',
        udarr: '⇅',
        udblac: 'ű',
        udhar: '⥮',
        ufisht: '⥾',
        ufr: '𝔲',
        ugrav: 'ù',
        ugrave: 'ù',
        uharl: '↿',
        uharr: '↾',
        uhblk: '▀',
        ulcorn: '⌜',
        ulcorner: '⌜',
        ulcrop: '⌏',
        ultri: '◸',
        umacr: 'ū',
        um: '¨',
        uml: '¨',
        uogon: 'ų',
        uopf: '𝕦',
        uparrow: '↑',
        updownarrow: '↕',
        upharpoonleft: '↿',
        upharpoonright: '↾',
        uplus: '⊎',
        upsi: 'υ',
        upsih: 'ϒ',
        upsilon: 'υ',
        upuparrows: '⇈',
        urcorn: '⌝',
        urcorner: '⌝',
        urcrop: '⌎',
        uring: 'ů',
        urtri: '◹',
        uscr: '𝓊',
        utdot: '⋰',
        utilde: 'ũ',
        utri: '▵',
        utrif: '▴',
        uuarr: '⇈',
        uum: 'ü',
        uuml: 'ü',
        uwangle: '⦧',
        vArr: '⇕',
        vBar: '⫨',
        vBarv: '⫩',
        vDash: '⊨',
        vangrt: '⦜',
        varepsilon: 'ϵ',
        varkappa: 'ϰ',
        varnothing: '∅',
        varphi: 'ϕ',
        varpi: 'ϖ',
        varpropto: '∝',
        varr: '↕',
        varrho: 'ϱ',
        varsigma: 'ς',
        varsubsetneq: '⊊︀',
        varsubsetneqq: '⫋︀',
        varsupsetneq: '⊋︀',
        varsupsetneqq: '⫌︀',
        vartheta: 'ϑ',
        vartriangleleft: '⊲',
        vartriangleright: '⊳',
        vcy: 'в',
        vdash: '⊢',
        vee: '∨',
        veebar: '⊻',
        veeeq: '≚',
        vellip: '⋮',
        verbar: '|',
        vert: '|',
        vfr: '𝔳',
        vltri: '⊲',
        vnsub: '⊂⃒',
        vnsup: '⊃⃒',
        vopf: '𝕧',
        vprop: '∝',
        vrtri: '⊳',
        vscr: '𝓋',
        vsubnE: '⫋︀',
        vsubne: '⊊︀',
        vsupnE: '⫌︀',
        vsupne: '⊋︀',
        vzigzag: '⦚',
        wcirc: 'ŵ',
        wedbar: '⩟',
        wedge: '∧',
        wedgeq: '≙',
        weierp: '℘',
        wfr: '𝔴',
        wopf: '𝕨',
        wp: '℘',
        wr: '≀',
        wreath: '≀',
        wscr: '𝓌',
        xcap: '⋂',
        xcirc: '◯',
        xcup: '⋃',
        xdtri: '▽',
        xfr: '𝔵',
        xhArr: '⟺',
        xharr: '⟷',
        xi: 'ξ',
        xlArr: '⟸',
        xlarr: '⟵',
        xmap: '⟼',
        xnis: '⋻',
        xodot: '⨀',
        xopf: '𝕩',
        xoplus: '⨁',
        xotime: '⨂',
        xrArr: '⟹',
        xrarr: '⟶',
        xscr: '𝓍',
        xsqcup: '⨆',
        xuplus: '⨄',
        xutri: '△',
        xvee: '⋁',
        xwedge: '⋀',
        yacut: 'ý',
        yacute: 'ý',
        yacy: 'я',
        ycirc: 'ŷ',
        ycy: 'ы',
        ye: '¥',
        yen: '¥',
        yfr: '𝔶',
        yicy: 'ї',
        yopf: '𝕪',
        yscr: '𝓎',
        yucy: 'ю',
        yum: 'ÿ',
        yuml: 'ÿ',
        zacute: 'ź',
        zcaron: 'ž',
        zcy: 'з',
        zdot: 'ż',
        zeetrf: 'ℨ',
        zeta: 'ζ',
        zfr: '𝔷',
        zhcy: 'ж',
        zigrarr: '⇝',
        zopf: '𝕫',
        zscr: '𝓏',
        zwj: '‍',
        zwnj: '‌',
      }; // CONCATENATED MODULE: ./node_modules/decode-named-character-reference/index.js

      const decode_named_character_reference_own = {}.hasOwnProperty;

      /**
       * Decode a single character reference (without the `&` or `;`).
       * You probably only need this when you’re building parsers yourself that follow
       * different rules compared to HTML.
       * This is optimized to be tiny in browsers.
       *
       * @param {string} value
       *   `notin` (named), `#123` (deci), `#x123` (hexa).
       * @returns {string|false}
       *   Decoded reference.
       */
      function decodeNamedCharacterReference(value) {
        return decode_named_character_reference_own.call(
          characterEntities,
          value
        )
          ? characterEntities[value]
          : false;
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/character-reference.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const characterReference = {
        name: 'characterReference',
        tokenize: tokenizeCharacterReference,
      };
      /** @type {Tokenizer} */

      function tokenizeCharacterReference(effects, ok, nok) {
        const self = this;
        let size = 0;
        /** @type {number} */

        let max;
        /** @type {(code: Code) => code is number} */

        let test;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('characterReference');
          effects.enter('characterReferenceMarker');
          effects.consume(code);
          effects.exit('characterReferenceMarker');
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (code === 35) {
            effects.enter('characterReferenceMarkerNumeric');
            effects.consume(code);
            effects.exit('characterReferenceMarkerNumeric');
            return numeric;
          }

          effects.enter('characterReferenceValue');
          max = 31;
          test = asciiAlphanumeric;
          return value(code);
        }
        /** @type {State} */

        function numeric(code) {
          if (code === 88 || code === 120) {
            effects.enter('characterReferenceMarkerHexadecimal');
            effects.consume(code);
            effects.exit('characterReferenceMarkerHexadecimal');
            effects.enter('characterReferenceValue');
            max = 6;
            test = asciiHexDigit;
            return value;
          }

          effects.enter('characterReferenceValue');
          max = 7;
          test = asciiDigit;
          return value(code);
        }
        /** @type {State} */

        function value(code) {
          /** @type {Token} */
          let token;

          if (code === 59 && size) {
            token = effects.exit('characterReferenceValue');

            if (
              test === asciiAlphanumeric &&
              !decodeNamedCharacterReference(self.sliceSerialize(token))
            ) {
              return nok(code);
            }

            effects.enter('characterReferenceMarker');
            effects.consume(code);
            effects.exit('characterReferenceMarker');
            effects.exit('characterReference');
            return ok;
          }

          if (test(code) && size++ < max) {
            effects.consume(code);
            return value;
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/character-escape.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const characterEscape = {
        name: 'characterEscape',
        tokenize: tokenizeCharacterEscape,
      };
      /** @type {Tokenizer} */

      function tokenizeCharacterEscape(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('characterEscape');
          effects.enter('escapeMarker');
          effects.consume(code);
          effects.exit('escapeMarker');
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (asciiPunctuation(code)) {
            effects.enter('characterEscapeValue');
            effects.consume(code);
            effects.exit('characterEscapeValue');
            effects.exit('characterEscape');
            return ok;
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/line-ending.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const lineEnding = {
        name: 'lineEnding',
        tokenize: tokenizeLineEnding,
      };
      /** @type {Tokenizer} */

      function tokenizeLineEnding(effects, ok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, ok, 'linePrefix');
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/label-end.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Event} Event
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const labelEnd = {
        name: 'labelEnd',
        tokenize: tokenizeLabelEnd,
        resolveTo: resolveToLabelEnd,
        resolveAll: resolveAllLabelEnd,
      };
      /** @type {Construct} */

      const resourceConstruct = {
        tokenize: tokenizeResource,
      };
      /** @type {Construct} */

      const fullReferenceConstruct = {
        tokenize: tokenizeFullReference,
      };
      /** @type {Construct} */

      const collapsedReferenceConstruct = {
        tokenize: tokenizeCollapsedReference,
      };
      /** @type {Resolver} */

      function resolveAllLabelEnd(events) {
        let index = -1;
        /** @type {Token} */

        let token;

        while (++index < events.length) {
          token = events[index][1];

          if (
            token.type === 'labelImage' ||
            token.type === 'labelLink' ||
            token.type === 'labelEnd'
          ) {
            // Remove the marker.
            events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
            token.type = 'data';
            index++;
          }
        }

        return events;
      }
      /** @type {Resolver} */

      function resolveToLabelEnd(events, context) {
        let index = events.length;
        let offset = 0;
        /** @type {Token} */

        let token;
        /** @type {number|undefined} */

        let open;
        /** @type {number|undefined} */

        let close;
        /** @type {Event[]} */

        let media; // Find an opening.

        while (index--) {
          token = events[index][1];

          if (open) {
            // If we see another link, or inactive link label, we’ve been here before.
            if (
              token.type === 'link' ||
              (token.type === 'labelLink' && token._inactive)
            ) {
              break;
            } // Mark other link openings as inactive, as we can’t have links in
            // links.

            if (events[index][0] === 'enter' && token.type === 'labelLink') {
              token._inactive = true;
            }
          } else if (close) {
            if (
              events[index][0] === 'enter' &&
              (token.type === 'labelImage' || token.type === 'labelLink') &&
              !token._balanced
            ) {
              open = index;

              if (token.type !== 'labelLink') {
                offset = 2;
                break;
              }
            }
          } else if (token.type === 'labelEnd') {
            close = index;
          }
        }

        const group = {
          type: events[open][1].type === 'labelLink' ? 'link' : 'image',
          start: Object.assign({}, events[open][1].start),
          end: Object.assign({}, events[events.length - 1][1].end),
        };
        const label = {
          type: 'label',
          start: Object.assign({}, events[open][1].start),
          end: Object.assign({}, events[close][1].end),
        };
        const text = {
          type: 'labelText',
          start: Object.assign({}, events[open + offset + 2][1].end),
          end: Object.assign({}, events[close - 2][1].start),
        };
        media = [
          ['enter', group, context],
          ['enter', label, context],
        ]; // Opening marker.

        media = push(media, events.slice(open + 1, open + offset + 3)); // Text open.

        media = push(media, [['enter', text, context]]); // Between.

        media = push(
          media,
          resolveAll(
            context.parser.constructs.insideSpan.null,
            events.slice(open + offset + 4, close - 3),
            context
          )
        ); // Text close, marker close, label close.

        media = push(media, [
          ['exit', text, context],
          events[close - 2],
          events[close - 1],
          ['exit', label, context],
        ]); // Reference, resource, or so.

        media = push(media, events.slice(close + 1)); // Media close.

        media = push(media, [['exit', group, context]]);
        splice(events, open, events.length, media);
        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeLabelEnd(effects, ok, nok) {
        const self = this;
        let index = self.events.length;
        /** @type {Token} */

        let labelStart;
        /** @type {boolean} */

        let defined; // Find an opening.

        while (index--) {
          if (
            (self.events[index][1].type === 'labelImage' ||
              self.events[index][1].type === 'labelLink') &&
            !self.events[index][1]._balanced
          ) {
            labelStart = self.events[index][1];
            break;
          }
        }

        return start;
        /** @type {State} */

        function start(code) {
          if (!labelStart) {
            return nok(code);
          } // It’s a balanced bracket, but contains a link.

          if (labelStart._inactive) return balanced(code);
          defined = self.parser.defined.includes(
            normalizeIdentifier(
              self.sliceSerialize({
                start: labelStart.end,
                end: self.now(),
              })
            )
          );
          effects.enter('labelEnd');
          effects.enter('labelMarker');
          effects.consume(code);
          effects.exit('labelMarker');
          effects.exit('labelEnd');
          return afterLabelEnd;
        }
        /** @type {State} */

        function afterLabelEnd(code) {
          // Resource: `[asd](fgh)`.
          if (code === 40) {
            return effects.attempt(
              resourceConstruct,
              ok,
              defined ? ok : balanced
            )(code);
          } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?

          if (code === 91) {
            return effects.attempt(
              fullReferenceConstruct,
              ok,
              defined
                ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
                : balanced
            )(code);
          } // Shortcut reference: `[asd]`?

          return defined ? ok(code) : balanced(code);
        }
        /** @type {State} */

        function balanced(code) {
          labelStart._balanced = true;
          return nok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeResource(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('resource');
          effects.enter('resourceMarker');
          effects.consume(code);
          effects.exit('resourceMarker');
          return factoryWhitespace(effects, open);
        }
        /** @type {State} */

        function open(code) {
          if (code === 41) {
            return end(code);
          }

          return factoryDestination(
            effects,
            destinationAfter,
            nok,
            'resourceDestination',
            'resourceDestinationLiteral',
            'resourceDestinationLiteralMarker',
            'resourceDestinationRaw',
            'resourceDestinationString',
            32
          )(code);
        }
        /** @type {State} */

        function destinationAfter(code) {
          return markdownLineEndingOrSpace(code)
            ? factoryWhitespace(effects, between)(code)
            : end(code);
        }
        /** @type {State} */

        function between(code) {
          if (code === 34 || code === 39 || code === 40) {
            return factoryTitle(
              effects,
              factoryWhitespace(effects, end),
              nok,
              'resourceTitle',
              'resourceTitleMarker',
              'resourceTitleString'
            )(code);
          }

          return end(code);
        }
        /** @type {State} */

        function end(code) {
          if (code === 41) {
            effects.enter('resourceMarker');
            effects.consume(code);
            effects.exit('resourceMarker');
            effects.exit('resource');
            return ok;
          }

          return nok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeFullReference(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          return factoryLabel.call(
            self,
            effects,
            afterLabel,
            nok,
            'reference',
            'referenceMarker',
            'referenceString'
          )(code);
        }
        /** @type {State} */

        function afterLabel(code) {
          return self.parser.defined.includes(
            normalizeIdentifier(
              self
                .sliceSerialize(self.events[self.events.length - 1][1])
                .slice(1, -1)
            )
          )
            ? ok(code)
            : nok(code);
        }
      }
      /** @type {Tokenizer} */

      function tokenizeCollapsedReference(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('reference');
          effects.enter('referenceMarker');
          effects.consume(code);
          effects.exit('referenceMarker');
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (code === 93) {
            effects.enter('referenceMarker');
            effects.consume(code);
            effects.exit('referenceMarker');
            effects.exit('reference');
            return ok;
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/label-start-image.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */

      const labelStartImage = {
        name: 'labelStartImage',
        tokenize: tokenizeLabelStartImage,
        resolveAll: labelEnd.resolveAll,
      };
      /** @type {Tokenizer} */

      function tokenizeLabelStartImage(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('labelImage');
          effects.enter('labelImageMarker');
          effects.consume(code);
          effects.exit('labelImageMarker');
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (code === 91) {
            effects.enter('labelMarker');
            effects.consume(code);
            effects.exit('labelMarker');
            effects.exit('labelImage');
            return after;
          }

          return nok(code);
        }
        /** @type {State} */

        function after(code) {
          /* To do: remove in the future once we’ve switched from
           * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
           * which doesn’t need this */

          /* Hidden footnotes hook */

          /* c8 ignore next 3 */
          return code === 94 &&
            '_hiddenFootnoteSupport' in self.parser.constructs
            ? nok(code)
            : ok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-util-classify-character/index.js

      /**
       * @typedef {import('micromark-util-types').Code} Code
       */

      /**
       * Classify whether a character code represents whitespace, punctuation, or
       * something else.
       *
       * Used for attention (emphasis, strong), whose sequences can open or close
       * based on the class of surrounding characters.
       *
       * Note that eof (`null`) is seen as whitespace.
       *
       * @param {Code} code
       * @returns {number|undefined}
       */
      function classifyCharacter(code) {
        if (
          code === null ||
          markdownLineEndingOrSpace(code) ||
          unicodeWhitespace(code)
        ) {
          return 1;
        }

        if (unicodePunctuation(code)) {
          return 2;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/attention.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').Event} Event
       * @typedef {import('micromark-util-types').Code} Code
       * @typedef {import('micromark-util-types').Point} Point
       */

      /** @type {Construct} */
      const attention = {
        name: 'attention',
        tokenize: tokenizeAttention,
        resolveAll: resolveAllAttention,
      };
      /**
       * Take all events and resolve attention to emphasis or strong.
       *
       * @type {Resolver}
       */

      function resolveAllAttention(events, context) {
        let index = -1;
        /** @type {number} */

        let open;
        /** @type {Token} */

        let group;
        /** @type {Token} */

        let text;
        /** @type {Token} */

        let openingSequence;
        /** @type {Token} */

        let closingSequence;
        /** @type {number} */

        let use;
        /** @type {Event[]} */

        let nextEvents;
        /** @type {number} */

        let offset; // Walk through all events.
        //
        // Note: performance of this is fine on an mb of normal markdown, but it’s
        // a bottleneck for malicious stuff.

        while (++index < events.length) {
          // Find a token that can close.
          if (
            events[index][0] === 'enter' &&
            events[index][1].type === 'attentionSequence' &&
            events[index][1]._close
          ) {
            open = index; // Now walk back to find an opener.

            while (open--) {
              // Find a token that can open the closer.
              if (
                events[open][0] === 'exit' &&
                events[open][1].type === 'attentionSequence' &&
                events[open][1]._open && // If the markers are the same:
                context.sliceSerialize(events[open][1]).charCodeAt(0) ===
                  context.sliceSerialize(events[index][1]).charCodeAt(0)
              ) {
                // If the opening can close or the closing can open,
                // and the close size *is not* a multiple of three,
                // but the sum of the opening and closing size *is* multiple of three,
                // then don’t match.
                if (
                  (events[open][1]._close || events[index][1]._open) &&
                  (events[index][1].end.offset -
                    events[index][1].start.offset) %
                    3 &&
                  !(
                    (events[open][1].end.offset -
                      events[open][1].start.offset +
                      events[index][1].end.offset -
                      events[index][1].start.offset) %
                    3
                  )
                ) {
                  continue;
                } // Number of markers to use from the sequence.

                use =
                  events[open][1].end.offset - events[open][1].start.offset >
                    1 &&
                  events[index][1].end.offset - events[index][1].start.offset >
                    1
                    ? 2
                    : 1;
                const start = Object.assign({}, events[open][1].end);
                const end = Object.assign({}, events[index][1].start);
                movePoint(start, -use);
                movePoint(end, use);
                openingSequence = {
                  type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                  start,
                  end: Object.assign({}, events[open][1].end),
                };
                closingSequence = {
                  type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                  start: Object.assign({}, events[index][1].start),
                  end,
                };
                text = {
                  type: use > 1 ? 'strongText' : 'emphasisText',
                  start: Object.assign({}, events[open][1].end),
                  end: Object.assign({}, events[index][1].start),
                };
                group = {
                  type: use > 1 ? 'strong' : 'emphasis',
                  start: Object.assign({}, openingSequence.start),
                  end: Object.assign({}, closingSequence.end),
                };
                events[open][1].end = Object.assign({}, openingSequence.start);
                events[index][1].start = Object.assign({}, closingSequence.end);
                nextEvents = []; // If there are more markers in the opening, add them before.

                if (events[open][1].end.offset - events[open][1].start.offset) {
                  nextEvents = push(nextEvents, [
                    ['enter', events[open][1], context],
                    ['exit', events[open][1], context],
                  ]);
                } // Opening.

                nextEvents = push(nextEvents, [
                  ['enter', group, context],
                  ['enter', openingSequence, context],
                  ['exit', openingSequence, context],
                  ['enter', text, context],
                ]); // Between.

                nextEvents = push(
                  nextEvents,
                  resolveAll(
                    context.parser.constructs.insideSpan.null,
                    events.slice(open + 1, index),
                    context
                  )
                ); // Closing.

                nextEvents = push(nextEvents, [
                  ['exit', text, context],
                  ['enter', closingSequence, context],
                  ['exit', closingSequence, context],
                  ['exit', group, context],
                ]); // If there are more markers in the closing, add them after.

                if (
                  events[index][1].end.offset - events[index][1].start.offset
                ) {
                  offset = 2;
                  nextEvents = push(nextEvents, [
                    ['enter', events[index][1], context],
                    ['exit', events[index][1], context],
                  ]);
                } else {
                  offset = 0;
                }

                splice(events, open - 1, index - open + 3, nextEvents);
                index = open + nextEvents.length - offset - 2;
                break;
              }
            }
          }
        } // Remove remaining sequences.

        index = -1;

        while (++index < events.length) {
          if (events[index][1].type === 'attentionSequence') {
            events[index][1].type = 'data';
          }
        }

        return events;
      }
      /** @type {Tokenizer} */

      function tokenizeAttention(effects, ok) {
        const attentionMarkers = this.parser.constructs.attentionMarkers.null;
        const previous = this.previous;
        const before = classifyCharacter(previous);
        /** @type {NonNullable<Code>} */

        let marker;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('attentionSequence');
          marker = code;
          return sequence(code);
        }
        /** @type {State} */

        function sequence(code) {
          if (code === marker) {
            effects.consume(code);
            return sequence;
          }

          const token = effects.exit('attentionSequence');
          const after = classifyCharacter(code);
          const open =
            !after ||
            (after === 2 && before) ||
            attentionMarkers.includes(code);
          const close =
            !before ||
            (before === 2 && after) ||
            attentionMarkers.includes(previous);
          token._open = Boolean(
            marker === 42 ? open : open && (before || !close)
          );
          token._close = Boolean(
            marker === 42 ? close : close && (after || !open)
          );
          return ok(code);
        }
      }
      /**
       * Move a point a bit.
       *
       * Note: `move` only works inside lines! It’s not possible to move past other
       * chunks (replacement characters, tabs, or line endings).
       *
       * @param {Point} point
       * @param {number} offset
       * @returns {void}
       */

      function movePoint(point, offset) {
        point.column += offset;
        point.offset += offset;
        point._bufferIndex += offset;
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/autolink.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const autolink = {
        name: 'autolink',
        tokenize: tokenizeAutolink,
      };
      /** @type {Tokenizer} */

      function tokenizeAutolink(effects, ok, nok) {
        let size = 1;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('autolink');
          effects.enter('autolinkMarker');
          effects.consume(code);
          effects.exit('autolinkMarker');
          effects.enter('autolinkProtocol');
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            return schemeOrEmailAtext;
          }

          return asciiAtext(code) ? emailAtext(code) : nok(code);
        }
        /** @type {State} */

        function schemeOrEmailAtext(code) {
          return code === 43 ||
            code === 45 ||
            code === 46 ||
            asciiAlphanumeric(code)
            ? schemeInsideOrEmailAtext(code)
            : emailAtext(code);
        }
        /** @type {State} */

        function schemeInsideOrEmailAtext(code) {
          if (code === 58) {
            effects.consume(code);
            return urlInside;
          }

          if (
            (code === 43 ||
              code === 45 ||
              code === 46 ||
              asciiAlphanumeric(code)) &&
            size++ < 32
          ) {
            effects.consume(code);
            return schemeInsideOrEmailAtext;
          }

          return emailAtext(code);
        }
        /** @type {State} */

        function urlInside(code) {
          if (code === 62) {
            effects.exit('autolinkProtocol');
            return end(code);
          }

          if (
            code === null ||
            code === 32 ||
            code === 60 ||
            asciiControl(code)
          ) {
            return nok(code);
          }

          effects.consume(code);
          return urlInside;
        }
        /** @type {State} */

        function emailAtext(code) {
          if (code === 64) {
            effects.consume(code);
            size = 0;
            return emailAtSignOrDot;
          }

          if (asciiAtext(code)) {
            effects.consume(code);
            return emailAtext;
          }

          return nok(code);
        }
        /** @type {State} */

        function emailAtSignOrDot(code) {
          return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
        }
        /** @type {State} */

        function emailLabel(code) {
          if (code === 46) {
            effects.consume(code);
            size = 0;
            return emailAtSignOrDot;
          }

          if (code === 62) {
            // Exit, then change the type.
            effects.exit('autolinkProtocol').type = 'autolinkEmail';
            return end(code);
          }

          return emailValue(code);
        }
        /** @type {State} */

        function emailValue(code) {
          if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
            effects.consume(code);
            return code === 45 ? emailValue : emailLabel;
          }

          return nok(code);
        }
        /** @type {State} */

        function end(code) {
          effects.enter('autolinkMarker');
          effects.consume(code);
          effects.exit('autolinkMarker');
          effects.exit('autolink');
          return ok;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/html-text.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       * @typedef {import('micromark-util-types').Code} Code
       */

      /** @type {Construct} */
      const htmlText = {
        name: 'htmlText',
        tokenize: tokenizeHtmlText,
      };
      /** @type {Tokenizer} */

      function tokenizeHtmlText(effects, ok, nok) {
        const self = this;
        /** @type {NonNullable<Code>|undefined} */

        let marker;
        /** @type {string} */

        let buffer;
        /** @type {number} */

        let index;
        /** @type {State} */

        let returnState;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('htmlText');
          effects.enter('htmlTextData');
          effects.consume(code);
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (code === 33) {
            effects.consume(code);
            return declarationOpen;
          }

          if (code === 47) {
            effects.consume(code);
            return tagCloseStart;
          }

          if (code === 63) {
            effects.consume(code);
            return instruction;
          }

          if (asciiAlpha(code)) {
            effects.consume(code);
            return tagOpen;
          }

          return nok(code);
        }
        /** @type {State} */

        function declarationOpen(code) {
          if (code === 45) {
            effects.consume(code);
            return commentOpen;
          }

          if (code === 91) {
            effects.consume(code);
            buffer = 'CDATA[';
            index = 0;
            return cdataOpen;
          }

          if (asciiAlpha(code)) {
            effects.consume(code);
            return declaration;
          }

          return nok(code);
        }
        /** @type {State} */

        function commentOpen(code) {
          if (code === 45) {
            effects.consume(code);
            return commentStart;
          }

          return nok(code);
        }
        /** @type {State} */

        function commentStart(code) {
          if (code === null || code === 62) {
            return nok(code);
          }

          if (code === 45) {
            effects.consume(code);
            return commentStartDash;
          }

          return comment(code);
        }
        /** @type {State} */

        function commentStartDash(code) {
          if (code === null || code === 62) {
            return nok(code);
          }

          return comment(code);
        }
        /** @type {State} */

        function comment(code) {
          if (code === null) {
            return nok(code);
          }

          if (code === 45) {
            effects.consume(code);
            return commentClose;
          }

          if (markdownLineEnding(code)) {
            returnState = comment;
            return atLineEnding(code);
          }

          effects.consume(code);
          return comment;
        }
        /** @type {State} */

        function commentClose(code) {
          if (code === 45) {
            effects.consume(code);
            return end;
          }

          return comment(code);
        }
        /** @type {State} */

        function cdataOpen(code) {
          if (code === buffer.charCodeAt(index++)) {
            effects.consume(code);
            return index === buffer.length ? cdata : cdataOpen;
          }

          return nok(code);
        }
        /** @type {State} */

        function cdata(code) {
          if (code === null) {
            return nok(code);
          }

          if (code === 93) {
            effects.consume(code);
            return cdataClose;
          }

          if (markdownLineEnding(code)) {
            returnState = cdata;
            return atLineEnding(code);
          }

          effects.consume(code);
          return cdata;
        }
        /** @type {State} */

        function cdataClose(code) {
          if (code === 93) {
            effects.consume(code);
            return cdataEnd;
          }

          return cdata(code);
        }
        /** @type {State} */

        function cdataEnd(code) {
          if (code === 62) {
            return end(code);
          }

          if (code === 93) {
            effects.consume(code);
            return cdataEnd;
          }

          return cdata(code);
        }
        /** @type {State} */

        function declaration(code) {
          if (code === null || code === 62) {
            return end(code);
          }

          if (markdownLineEnding(code)) {
            returnState = declaration;
            return atLineEnding(code);
          }

          effects.consume(code);
          return declaration;
        }
        /** @type {State} */

        function instruction(code) {
          if (code === null) {
            return nok(code);
          }

          if (code === 63) {
            effects.consume(code);
            return instructionClose;
          }

          if (markdownLineEnding(code)) {
            returnState = instruction;
            return atLineEnding(code);
          }

          effects.consume(code);
          return instruction;
        }
        /** @type {State} */

        function instructionClose(code) {
          return code === 62 ? end(code) : instruction(code);
        }
        /** @type {State} */

        function tagCloseStart(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            return tagClose;
          }

          return nok(code);
        }
        /** @type {State} */

        function tagClose(code) {
          if (code === 45 || asciiAlphanumeric(code)) {
            effects.consume(code);
            return tagClose;
          }

          return tagCloseBetween(code);
        }
        /** @type {State} */

        function tagCloseBetween(code) {
          if (markdownLineEnding(code)) {
            returnState = tagCloseBetween;
            return atLineEnding(code);
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return tagCloseBetween;
          }

          return end(code);
        }
        /** @type {State} */

        function tagOpen(code) {
          if (code === 45 || asciiAlphanumeric(code)) {
            effects.consume(code);
            return tagOpen;
          }

          if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
            return tagOpenBetween(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function tagOpenBetween(code) {
          if (code === 47) {
            effects.consume(code);
            return end;
          }

          if (code === 58 || code === 95 || asciiAlpha(code)) {
            effects.consume(code);
            return tagOpenAttributeName;
          }

          if (markdownLineEnding(code)) {
            returnState = tagOpenBetween;
            return atLineEnding(code);
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return tagOpenBetween;
          }

          return end(code);
        }
        /** @type {State} */

        function tagOpenAttributeName(code) {
          if (
            code === 45 ||
            code === 46 ||
            code === 58 ||
            code === 95 ||
            asciiAlphanumeric(code)
          ) {
            effects.consume(code);
            return tagOpenAttributeName;
          }

          return tagOpenAttributeNameAfter(code);
        }
        /** @type {State} */

        function tagOpenAttributeNameAfter(code) {
          if (code === 61) {
            effects.consume(code);
            return tagOpenAttributeValueBefore;
          }

          if (markdownLineEnding(code)) {
            returnState = tagOpenAttributeNameAfter;
            return atLineEnding(code);
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return tagOpenAttributeNameAfter;
          }

          return tagOpenBetween(code);
        }
        /** @type {State} */

        function tagOpenAttributeValueBefore(code) {
          if (
            code === null ||
            code === 60 ||
            code === 61 ||
            code === 62 ||
            code === 96
          ) {
            return nok(code);
          }

          if (code === 34 || code === 39) {
            effects.consume(code);
            marker = code;
            return tagOpenAttributeValueQuoted;
          }

          if (markdownLineEnding(code)) {
            returnState = tagOpenAttributeValueBefore;
            return atLineEnding(code);
          }

          if (markdownSpace(code)) {
            effects.consume(code);
            return tagOpenAttributeValueBefore;
          }

          effects.consume(code);
          marker = undefined;
          return tagOpenAttributeValueUnquoted;
        }
        /** @type {State} */

        function tagOpenAttributeValueQuoted(code) {
          if (code === marker) {
            effects.consume(code);
            return tagOpenAttributeValueQuotedAfter;
          }

          if (code === null) {
            return nok(code);
          }

          if (markdownLineEnding(code)) {
            returnState = tagOpenAttributeValueQuoted;
            return atLineEnding(code);
          }

          effects.consume(code);
          return tagOpenAttributeValueQuoted;
        }
        /** @type {State} */

        function tagOpenAttributeValueQuotedAfter(code) {
          if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
            return tagOpenBetween(code);
          }

          return nok(code);
        }
        /** @type {State} */

        function tagOpenAttributeValueUnquoted(code) {
          if (
            code === null ||
            code === 34 ||
            code === 39 ||
            code === 60 ||
            code === 61 ||
            code === 96
          ) {
            return nok(code);
          }

          if (code === 62 || markdownLineEndingOrSpace(code)) {
            return tagOpenBetween(code);
          }

          effects.consume(code);
          return tagOpenAttributeValueUnquoted;
        } // We can’t have blank lines in content, so no need to worry about empty
        // tokens.

        /** @type {State} */

        function atLineEnding(code) {
          effects.exit('htmlTextData');
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(
            effects,
            afterPrefix,
            'linePrefix',
            self.parser.constructs.disable.null.includes('codeIndented')
              ? undefined
              : 4
          );
        }
        /** @type {State} */

        function afterPrefix(code) {
          effects.enter('htmlTextData');
          return returnState(code);
        }
        /** @type {State} */

        function end(code) {
          if (code === 62) {
            effects.consume(code);
            effects.exit('htmlTextData');
            effects.exit('htmlText');
            return ok;
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/label-start-link.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */

      const labelStartLink = {
        name: 'labelStartLink',
        tokenize: tokenizeLabelStartLink,
        resolveAll: labelEnd.resolveAll,
      };
      /** @type {Tokenizer} */

      function tokenizeLabelStartLink(effects, ok, nok) {
        const self = this;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('labelLink');
          effects.enter('labelMarker');
          effects.consume(code);
          effects.exit('labelMarker');
          effects.exit('labelLink');
          return after;
        }
        /** @type {State} */

        function after(code) {
          /* To do: remove in the future once we’ve switched from
           * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
           * which doesn’t need this */

          /* Hidden footnotes hook. */

          /* c8 ignore next 3 */
          return code === 94 &&
            '_hiddenFootnoteSupport' in self.parser.constructs
            ? nok(code)
            : ok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/hard-break-escape.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const hardBreakEscape = {
        name: 'hardBreakEscape',
        tokenize: tokenizeHardBreakEscape,
      };
      /** @type {Tokenizer} */

      function tokenizeHardBreakEscape(effects, ok, nok) {
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('hardBreakEscape');
          effects.enter('escapeMarker');
          effects.consume(code);
          return open;
        }
        /** @type {State} */

        function open(code) {
          if (markdownLineEnding(code)) {
            effects.exit('escapeMarker');
            effects.exit('hardBreakEscape');
            return ok(code);
          }

          return nok(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark-core-commonmark/lib/code-text.js

      /**
       * @typedef {import('micromark-util-types').Construct} Construct
       * @typedef {import('micromark-util-types').Resolver} Resolver
       * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
       * @typedef {import('micromark-util-types').Previous} Previous
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').State} State
       */

      /** @type {Construct} */
      const codeText = {
        name: 'codeText',
        tokenize: tokenizeCodeText,
        resolve: resolveCodeText,
        previous,
      };
      /** @type {Resolver} */

      function resolveCodeText(events) {
        let tailExitIndex = events.length - 4;
        let headEnterIndex = 3;
        /** @type {number} */

        let index;
        /** @type {number|undefined} */

        let enter; // If we start and end with an EOL or a space.

        if (
          (events[headEnterIndex][1].type === 'lineEnding' ||
            events[headEnterIndex][1].type === 'space') &&
          (events[tailExitIndex][1].type === 'lineEnding' ||
            events[tailExitIndex][1].type === 'space')
        ) {
          index = headEnterIndex; // And we have data.

          while (++index < tailExitIndex) {
            if (events[index][1].type === 'codeTextData') {
              // Then we have padding.
              events[headEnterIndex][1].type = 'codeTextPadding';
              events[tailExitIndex][1].type = 'codeTextPadding';
              headEnterIndex += 2;
              tailExitIndex -= 2;
              break;
            }
          }
        } // Merge adjacent spaces and data.

        index = headEnterIndex - 1;
        tailExitIndex++;

        while (++index <= tailExitIndex) {
          if (enter === undefined) {
            if (
              index !== tailExitIndex &&
              events[index][1].type !== 'lineEnding'
            ) {
              enter = index;
            }
          } else if (
            index === tailExitIndex ||
            events[index][1].type === 'lineEnding'
          ) {
            events[enter][1].type = 'codeTextData';

            if (index !== enter + 2) {
              events[enter][1].end = events[index - 1][1].end;
              events.splice(enter + 2, index - enter - 2);
              tailExitIndex -= index - enter - 2;
              index = enter + 2;
            }

            enter = undefined;
          }
        }

        return events;
      }
      /** @type {Previous} */

      function previous(code) {
        // If there is a previous code, there will always be a tail.
        return (
          code !== 96 ||
          this.events[this.events.length - 1][1].type === 'characterEscape'
        );
      }
      /** @type {Tokenizer} */

      function tokenizeCodeText(effects, ok, nok) {
        const self = this;
        let sizeOpen = 0;
        /** @type {number} */

        let size;
        /** @type {Token} */

        let token;
        return start;
        /** @type {State} */

        function start(code) {
          effects.enter('codeText');
          effects.enter('codeTextSequence');
          return openingSequence(code);
        }
        /** @type {State} */

        function openingSequence(code) {
          if (code === 96) {
            effects.consume(code);
            sizeOpen++;
            return openingSequence;
          }

          effects.exit('codeTextSequence');
          return gap(code);
        }
        /** @type {State} */

        function gap(code) {
          // EOF.
          if (code === null) {
            return nok(code);
          } // Closing fence?
          // Could also be data.

          if (code === 96) {
            token = effects.enter('codeTextSequence');
            size = 0;
            return closingSequence(code);
          } // Tabs don’t work, and virtual spaces don’t make sense.

          if (code === 32) {
            effects.enter('space');
            effects.consume(code);
            effects.exit('space');
            return gap;
          }

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return gap;
          } // Data.

          effects.enter('codeTextData');
          return data(code);
        } // In code.

        /** @type {State} */

        function data(code) {
          if (
            code === null ||
            code === 32 ||
            code === 96 ||
            markdownLineEnding(code)
          ) {
            effects.exit('codeTextData');
            return gap(code);
          }

          effects.consume(code);
          return data;
        } // Closing fence.

        /** @type {State} */

        function closingSequence(code) {
          // More.
          if (code === 96) {
            effects.consume(code);
            size++;
            return closingSequence;
          } // Done!

          if (size === sizeOpen) {
            effects.exit('codeTextSequence');
            effects.exit('codeText');
            return ok(code);
          } // More or less accents: mark as data.

          token.type = 'codeTextData';
          return data(code);
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/constructs.js

      /**
       * @typedef {import('micromark-util-types').Extension} Extension
       */

      /** @type {Extension['document']} */

      const constructs_document = {
        [42]: list,
        [43]: list,
        [45]: list,
        [48]: list,
        [49]: list,
        [50]: list,
        [51]: list,
        [52]: list,
        [53]: list,
        [54]: list,
        [55]: list,
        [56]: list,
        [57]: list,
        [62]: blockQuote,
      };
      /** @type {Extension['contentInitial']} */

      const contentInitial = {
        [91]: definition,
      };
      /** @type {Extension['flowInitial']} */

      const flowInitial = {
        [-2]: codeIndented,
        [-1]: codeIndented,
        [32]: codeIndented,
      };
      /** @type {Extension['flow']} */

      const constructs_flow = {
        [35]: headingAtx,
        [42]: thematicBreak,
        [45]: [setextUnderline, thematicBreak],
        [60]: htmlFlow,
        [61]: setextUnderline,
        [95]: thematicBreak,
        [96]: codeFenced,
        [126]: codeFenced,
      };
      /** @type {Extension['string']} */

      const constructs_string = {
        [38]: characterReference,
        [92]: characterEscape,
      };
      /** @type {Extension['text']} */

      const constructs_text = {
        [-5]: lineEnding,
        [-4]: lineEnding,
        [-3]: lineEnding,
        [33]: labelStartImage,
        [38]: characterReference,
        [42]: attention,
        [60]: [autolink, htmlText],
        [91]: labelStartLink,
        [92]: [hardBreakEscape, characterEscape],
        [93]: labelEnd,
        [95]: attention,
        [96]: codeText,
      };
      /** @type {Extension['insideSpan']} */

      const insideSpan = {
        null: [attention, resolver],
      };
      /** @type {Extension['attentionMarkers']} */

      const attentionMarkers = {
        null: [42, 95],
      };
      /** @type {Extension['disable']} */

      const disable = {
        null: [],
      }; // CONCATENATED MODULE: ./node_modules/micromark/lib/parse.js

      /**
       * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
       * @typedef {import('micromark-util-types').FullNormalizedExtension} FullNormalizedExtension
       * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
       * @typedef {import('micromark-util-types').ParseContext} ParseContext
       * @typedef {import('micromark-util-types').Create} Create
       */

      /**
       * @param {ParseOptions} [options]
       * @returns {ParseContext}
       */

      function parse(options = {}) {
        /** @type {FullNormalizedExtension} */
        // @ts-expect-error `defaultConstructs` is full, so the result will be too.
        const constructs = combineExtensions(
          // @ts-expect-error Same as above.
          [constructs_namespaceObject].concat(options.extensions || [])
        );
        /** @type {ParseContext} */

        const parser = {
          defined: [],
          lazy: {},
          constructs,
          content: create(content),
          document: create(document_document),
          flow: create(flow),
          string: create(string),
          text: create(text_text),
        };
        return parser;
        /**
         * @param {InitialConstruct} initial
         */

        function create(initial) {
          return creator;
          /** @type {Create} */

          function creator(from) {
            return createTokenizer(parser, initial, from);
          }
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/preprocess.js

      /**
       * @typedef {import('micromark-util-types').Encoding} Encoding
       * @typedef {import('micromark-util-types').Value} Value
       * @typedef {import('micromark-util-types').Chunk} Chunk
       * @typedef {import('micromark-util-types').Code} Code
       */

      /**
       * @callback Preprocessor
       * @param {Value} value
       * @param {Encoding} [encoding]
       * @param {boolean} [end=false]
       * @returns {Chunk[]}
       */
      const search = /[\0\t\n\r]/g;
      /**
       * @returns {Preprocessor}
       */

      function preprocess() {
        let column = 1;
        let buffer = '';
        /** @type {boolean|undefined} */

        let start = true;
        /** @type {boolean|undefined} */

        let atCarriageReturn;
        return preprocessor;
        /** @type {Preprocessor} */

        function preprocessor(value, encoding, end) {
          /** @type {Chunk[]} */
          const chunks = [];
          /** @type {RegExpMatchArray|null} */

          let match;
          /** @type {number} */

          let next;
          /** @type {number} */

          let startPosition;
          /** @type {number} */

          let endPosition;
          /** @type {Code} */

          let code; // @ts-expect-error `Buffer` does allow an encoding.

          value = buffer + value.toString(encoding);
          startPosition = 0;
          buffer = '';

          if (start) {
            if (value.charCodeAt(0) === 65279) {
              startPosition++;
            }

            start = undefined;
          }

          while (startPosition < value.length) {
            search.lastIndex = startPosition;
            match = search.exec(value);
            endPosition =
              match && match.index !== undefined ? match.index : value.length;
            code = value.charCodeAt(endPosition);

            if (!match) {
              buffer = value.slice(startPosition);
              break;
            }

            if (
              code === 10 &&
              startPosition === endPosition &&
              atCarriageReturn
            ) {
              chunks.push(-3);
              atCarriageReturn = undefined;
            } else {
              if (atCarriageReturn) {
                chunks.push(-5);
                atCarriageReturn = undefined;
              }

              if (startPosition < endPosition) {
                chunks.push(value.slice(startPosition, endPosition));
                column += endPosition - startPosition;
              }

              switch (code) {
                case 0: {
                  chunks.push(65533);
                  column++;
                  break;
                }

                case 9: {
                  next = Math.ceil(column / 4) * 4;
                  chunks.push(-2);

                  while (column++ < next) chunks.push(-1);

                  break;
                }

                case 10: {
                  chunks.push(-4);
                  column = 1;
                  break;
                }

                default: {
                  atCarriageReturn = true;
                  column = 1;
                }
              }
            }

            startPosition = endPosition + 1;
          }

          if (end) {
            if (atCarriageReturn) chunks.push(-5);
            if (buffer) chunks.push(buffer);
            chunks.push(null);
          }

          return chunks;
        }
      } // CONCATENATED MODULE: ./node_modules/micromark/lib/postprocess.js

      /**
       * @typedef {import('micromark-util-types').Event} Event
       */

      /**
       * @param {Event[]} events
       * @returns {Event[]}
       */

      function postprocess(events) {
        while (!subtokenize(events)) {
          // Empty
        }

        return events;
      } // CONCATENATED MODULE: ./node_modules/micromark-util-decode-numeric-character-reference/index.js

      /**
       * Turn the number (in string form as either hexa- or plain decimal) coming from
       * a numeric character reference into a character.
       *
       * @param {string} value
       *   Value to decode.
       * @param {number} base
       *   Numeric base.
       * @returns {string}
       */
      function decodeNumericCharacterReference(value, base) {
        const code = Number.parseInt(value, base);

        if (
          // C0 except for HT, LF, FF, CR, space
          code < 9 ||
          code === 11 ||
          (code > 13 && code < 32) || // Control character (DEL) of the basic block and C1 controls.
          (code > 126 && code < 160) || // Lone high surrogates and low surrogates.
          (code > 55295 && code < 57344) || // Noncharacters.
          (code > 64975 && code < 65008) ||
          (code & 65535) === 65535 ||
          (code & 65535) === 65534 || // Out of range
          code > 1114111
        ) {
          return '\uFFFD';
        }

        return String.fromCharCode(code);
      } // CONCATENATED MODULE: ./node_modules/micromark-util-decode-string/index.js

      const characterEscapeOrReference =
        /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
      /**
       * Utility to decode markdown strings (which occur in places such as fenced
       * code info strings, destinations, labels, and titles).
       * The “string” content type allows character escapes and -references.
       * This decodes those.
       *
       * @param {string} value
       * @returns {string}
       */

      function decodeString(value) {
        return value.replace(characterEscapeOrReference, decode);
      }
      /**
       * @param {string} $0
       * @param {string} $1
       * @param {string} $2
       * @returns {string}
       */

      function decode($0, $1, $2) {
        if ($1) {
          // Escape.
          return $1;
        } // Reference.

        const head = $2.charCodeAt(0);

        if (head === 35) {
          const head = $2.charCodeAt(1);
          const hex = head === 120 || head === 88;
          return decodeNumericCharacterReference(
            $2.slice(hex ? 2 : 1),
            hex ? 16 : 10
          );
        }

        return decodeNamedCharacterReference($2) || $0;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-from-markdown/lib/index.js

      /**
       * @typedef {import('micromark-util-types').Encoding} Encoding
       * @typedef {import('micromark-util-types').Event} Event
       * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
       * @typedef {import('micromark-util-types').Token} Token
       * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
       * @typedef {import('micromark-util-types').Value} Value
       * @typedef {import('unist').Parent} UnistParent
       * @typedef {import('unist').Point} Point
       * @typedef {import('mdast').PhrasingContent} PhrasingContent
       * @typedef {import('mdast').Content} Content
       * @typedef {Root|Content} Node
       * @typedef {Extract<Node, UnistParent>} Parent
       * @typedef {import('mdast').Break} Break
       * @typedef {import('mdast').Blockquote} Blockquote
       * @typedef {import('mdast').Code} Code
       * @typedef {import('mdast').Definition} Definition
       * @typedef {import('mdast').Emphasis} Emphasis
       * @typedef {import('mdast').Heading} Heading
       * @typedef {import('mdast').HTML} HTML
       * @typedef {import('mdast').Image} Image
       * @typedef {import('mdast').ImageReference} ImageReference
       * @typedef {import('mdast').InlineCode} InlineCode
       * @typedef {import('mdast').Link} Link
       * @typedef {import('mdast').LinkReference} LinkReference
       * @typedef {import('mdast').List} List
       * @typedef {import('mdast').ListItem} ListItem
       * @typedef {import('mdast').Paragraph} Paragraph
       * @typedef {import('mdast').Root} Root
       * @typedef {import('mdast').Strong} Strong
       * @typedef {import('mdast').Text} Text
       * @typedef {import('mdast').ThematicBreak} ThematicBreak
       *
       * @typedef {UnistParent & {type: 'fragment', children: Array<PhrasingContent>}} Fragment
       */

      /**
       * @typedef _CompileDataFields
       * @property {boolean|undefined} expectingFirstListItemValue
       * @property {boolean|undefined} flowCodeInside
       * @property {boolean|undefined} setextHeadingSlurpLineEnding
       * @property {boolean|undefined} atHardBreak
       * @property {'collapsed'|'full'} referenceType
       * @property {boolean|undefined} inReference
       * @property {'characterReferenceMarkerHexadecimal'|'characterReferenceMarkerNumeric'} characterReferenceType
       *
       * @typedef {Record<string, unknown> & Partial<_CompileDataFields>} CompileData
       *
       * @typedef {(tree: Root) => Root|void} Transform
       * @typedef {(this: CompileContext, token: Token) => void} Handle
       * @typedef {Record<string, Handle>} Handles
       *   Token types mapping to handles
       * @typedef {Record<string, Record<string, unknown>|Array<unknown>> & {canContainEols: Array<string>, transforms: Array<Transform>, enter: Handles, exit: Handles}} NormalizedExtension
       * @typedef {Partial<NormalizedExtension>} Extension
       *   An mdast extension changes how markdown tokens are turned into mdast.
       *
       * @typedef {(this: Omit<CompileContext, 'sliceSerialize'>, left: Token|undefined, right: Token) => void} OnEnterError
       * @typedef {(this: Omit<CompileContext, 'sliceSerialize'>, left: Token, right: Token) => void} OnExitError
       *
       * @typedef CompileContext
       *   mdast compiler context
       * @property {Array<Node | Fragment>} stack
       * @property {Array<[Token, OnEnterError|undefined]>} tokenStack
       * @property {(key: string, value?: unknown) => void} setData
       *   Set data into the key-value store.
       * @property {<K extends string>(key: K) => CompileData[K]} getData
       *   Get data from the key-value store.
       * @property {(this: CompileContext) => void} buffer
       *   Capture some of the output data.
       * @property {(this: CompileContext) => string} resume
       *   Stop capturing and access the output data.
       * @property {<N extends Node>(this: CompileContext, node: N, token: Token, onError?: OnEnterError) => N} enter
       *   Enter a token.
       * @property {(this: CompileContext, token: Token, onError?: OnExitError) => Node} exit
       *   Exit a token.
       * @property {TokenizeContext['sliceSerialize']} sliceSerialize
       *   Get the string value of a token.
       * @property {NormalizedExtension} config
       *   Configuration.
       *
       * @typedef {{mdastExtensions?: Array<Extension|Array<Extension>>}} FromMarkdownOptions
       * @typedef {ParseOptions & FromMarkdownOptions} Options
       */

      const lib_own = {}.hasOwnProperty;
      /**
       * @param value Markdown to parse (`string` or `Buffer`).
       * @param [encoding] Character encoding to understand `value` as when it’s a `Buffer` (`string`, default: `'utf8'`).
       * @param [options] Configuration
       */

      const fromMarkdown =
        /**
         * @type {(
         *   ((value: Value, encoding: Encoding, options?: Options) => Root) &
         *   ((value: Value, options?: Options) => Root)
         * )}
         */

        /**
         * @param {Value} value
         * @param {Encoding} [encoding]
         * @param {Options} [options]
         * @returns {Root}
         */
        function (value, encoding, options) {
          if (typeof encoding !== 'string') {
            options = encoding;
            encoding = undefined;
          }

          return compiler(options)(
            postprocess(
              parse(options)
                .document()
                .write(preprocess()(value, encoding, true))
            )
          );
        };
      /**
       * Note this compiler only understand complete buffering, not streaming.
       *
       * @param {Options} [options]
       */

      function compiler(options = {}) {
        /** @type {NormalizedExtension} */
        // @ts-expect-error: our base has all required fields, so the result will too.
        const config = configure(
          {
            transforms: [],
            canContainEols: [
              'emphasis',
              'fragment',
              'heading',
              'paragraph',
              'strong',
            ],
            enter: {
              autolink: opener(link),
              autolinkProtocol: onenterdata,
              autolinkEmail: onenterdata,
              atxHeading: opener(heading),
              blockQuote: opener(blockQuote),
              characterEscape: onenterdata,
              characterReference: onenterdata,
              codeFenced: opener(codeFlow),
              codeFencedFenceInfo: buffer,
              codeFencedFenceMeta: buffer,
              codeIndented: opener(codeFlow, buffer),
              codeText: opener(codeText, buffer),
              codeTextData: onenterdata,
              data: onenterdata,
              codeFlowValue: onenterdata,
              definition: opener(definition),
              definitionDestinationString: buffer,
              definitionLabelString: buffer,
              definitionTitleString: buffer,
              emphasis: opener(emphasis),
              hardBreakEscape: opener(hardBreak),
              hardBreakTrailing: opener(hardBreak),
              htmlFlow: opener(html, buffer),
              htmlFlowData: onenterdata,
              htmlText: opener(html, buffer),
              htmlTextData: onenterdata,
              image: opener(image),
              label: buffer,
              link: opener(link),
              listItem: opener(listItem),
              listItemValue: onenterlistitemvalue,
              listOrdered: opener(list, onenterlistordered),
              listUnordered: opener(list),
              paragraph: opener(paragraph),
              reference: onenterreference,
              referenceString: buffer,
              resourceDestinationString: buffer,
              resourceTitleString: buffer,
              setextHeading: opener(heading),
              strong: opener(strong),
              thematicBreak: opener(thematicBreak),
            },
            exit: {
              atxHeading: closer(),
              atxHeadingSequence: onexitatxheadingsequence,
              autolink: closer(),
              autolinkEmail: onexitautolinkemail,
              autolinkProtocol: onexitautolinkprotocol,
              blockQuote: closer(),
              characterEscapeValue: onexitdata,
              characterReferenceMarkerHexadecimal:
                onexitcharacterreferencemarker,
              characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
              characterReferenceValue: onexitcharacterreferencevalue,
              codeFenced: closer(onexitcodefenced),
              codeFencedFence: onexitcodefencedfence,
              codeFencedFenceInfo: onexitcodefencedfenceinfo,
              codeFencedFenceMeta: onexitcodefencedfencemeta,
              codeFlowValue: onexitdata,
              codeIndented: closer(onexitcodeindented),
              codeText: closer(onexitcodetext),
              codeTextData: onexitdata,
              data: onexitdata,
              definition: closer(),
              definitionDestinationString: onexitdefinitiondestinationstring,
              definitionLabelString: onexitdefinitionlabelstring,
              definitionTitleString: onexitdefinitiontitlestring,
              emphasis: closer(),
              hardBreakEscape: closer(onexithardbreak),
              hardBreakTrailing: closer(onexithardbreak),
              htmlFlow: closer(onexithtmlflow),
              htmlFlowData: onexitdata,
              htmlText: closer(onexithtmltext),
              htmlTextData: onexitdata,
              image: closer(onexitimage),
              label: onexitlabel,
              labelText: onexitlabeltext,
              lineEnding: onexitlineending,
              link: closer(onexitlink),
              listItem: closer(),
              listOrdered: closer(),
              listUnordered: closer(),
              paragraph: closer(),
              referenceString: onexitreferencestring,
              resourceDestinationString: onexitresourcedestinationstring,
              resourceTitleString: onexitresourcetitlestring,
              resource: onexitresource,
              setextHeading: closer(onexitsetextheading),
              setextHeadingLineSequence: onexitsetextheadinglinesequence,
              setextHeadingText: onexitsetextheadingtext,
              strong: closer(),
              thematicBreak: closer(),
            },
          },
          options.mdastExtensions || []
        );
        /** @type {CompileData} */

        const data = {};
        return compile;
        /**
         * @param {Array<Event>} events
         * @returns {Root}
         */

        function compile(events) {
          /** @type {Root} */
          let tree = {
            type: 'root',
            children: [],
          };
          /** @type {CompileContext['stack']} */

          const stack = [tree];
          /** @type {CompileContext['tokenStack']} */

          const tokenStack = [];
          /** @type {Array<number>} */

          const listStack = [];
          /** @type {Omit<CompileContext, 'sliceSerialize'>} */

          const context = {
            stack,
            tokenStack,
            config,
            enter,
            exit,
            buffer,
            resume,
            setData,
            getData,
          };
          let index = -1;

          while (++index < events.length) {
            // We preprocess lists to add `listItem` tokens, and to infer whether
            // items the list itself are spread out.
            if (
              events[index][1].type === 'listOrdered' ||
              events[index][1].type === 'listUnordered'
            ) {
              if (events[index][0] === 'enter') {
                listStack.push(index);
              } else {
                const tail = listStack.pop();
                index = prepareList(events, tail, index);
              }
            }
          }

          index = -1;

          while (++index < events.length) {
            const handler = config[events[index][0]];

            if (lib_own.call(handler, events[index][1].type)) {
              handler[events[index][1].type].call(
                Object.assign(
                  {
                    sliceSerialize: events[index][2].sliceSerialize,
                  },
                  context
                ),
                events[index][1]
              );
            }
          }

          if (tokenStack.length > 0) {
            const tail = tokenStack[tokenStack.length - 1];
            const handler = tail[1] || defaultOnError;
            handler.call(context, undefined, tail[0]);
          } // Figure out `root` position.

          tree.position = {
            start: point(
              events.length > 0
                ? events[0][1].start
                : {
                    line: 1,
                    column: 1,
                    offset: 0,
                  }
            ),
            end: point(
              events.length > 0
                ? events[events.length - 2][1].end
                : {
                    line: 1,
                    column: 1,
                    offset: 0,
                  }
            ),
          };
          index = -1;

          while (++index < config.transforms.length) {
            tree = config.transforms[index](tree) || tree;
          }

          return tree;
        }
        /**
         * @param {Array<Event>} events
         * @param {number} start
         * @param {number} length
         * @returns {number}
         */

        function prepareList(events, start, length) {
          let index = start - 1;
          let containerBalance = -1;
          let listSpread = false;
          /** @type {Token|undefined} */

          let listItem;
          /** @type {number|undefined} */

          let lineIndex;
          /** @type {number|undefined} */

          let firstBlankLineIndex;
          /** @type {boolean|undefined} */

          let atMarker;

          while (++index <= length) {
            const event = events[index];

            if (
              event[1].type === 'listUnordered' ||
              event[1].type === 'listOrdered' ||
              event[1].type === 'blockQuote'
            ) {
              if (event[0] === 'enter') {
                containerBalance++;
              } else {
                containerBalance--;
              }

              atMarker = undefined;
            } else if (event[1].type === 'lineEndingBlank') {
              if (event[0] === 'enter') {
                if (
                  listItem &&
                  !atMarker &&
                  !containerBalance &&
                  !firstBlankLineIndex
                ) {
                  firstBlankLineIndex = index;
                }

                atMarker = undefined;
              }
            } else if (
              event[1].type === 'linePrefix' ||
              event[1].type === 'listItemValue' ||
              event[1].type === 'listItemMarker' ||
              event[1].type === 'listItemPrefix' ||
              event[1].type === 'listItemPrefixWhitespace'
            ) {
              // Empty.
            } else {
              atMarker = undefined;
            }

            if (
              (!containerBalance &&
                event[0] === 'enter' &&
                event[1].type === 'listItemPrefix') ||
              (containerBalance === -1 &&
                event[0] === 'exit' &&
                (event[1].type === 'listUnordered' ||
                  event[1].type === 'listOrdered'))
            ) {
              if (listItem) {
                let tailIndex = index;
                lineIndex = undefined;

                while (tailIndex--) {
                  const tailEvent = events[tailIndex];

                  if (
                    tailEvent[1].type === 'lineEnding' ||
                    tailEvent[1].type === 'lineEndingBlank'
                  ) {
                    if (tailEvent[0] === 'exit') continue;

                    if (lineIndex) {
                      events[lineIndex][1].type = 'lineEndingBlank';
                      listSpread = true;
                    }

                    tailEvent[1].type = 'lineEnding';
                    lineIndex = tailIndex;
                  } else if (
                    tailEvent[1].type === 'linePrefix' ||
                    tailEvent[1].type === 'blockQuotePrefix' ||
                    tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
                    tailEvent[1].type === 'blockQuoteMarker' ||
                    tailEvent[1].type === 'listItemIndent'
                  ) {
                    // Empty
                  } else {
                    break;
                  }
                }

                if (
                  firstBlankLineIndex &&
                  (!lineIndex || firstBlankLineIndex < lineIndex)
                ) {
                  // @ts-expect-error Patched.
                  listItem._spread = true;
                } // Fix position.

                listItem.end = Object.assign(
                  {},
                  lineIndex ? events[lineIndex][1].start : event[1].end
                );
                events.splice(lineIndex || index, 0, [
                  'exit',
                  listItem,
                  event[2],
                ]);
                index++;
                length++;
              } // Create a new list item.

              if (event[1].type === 'listItemPrefix') {
                listItem = {
                  type: 'listItem',
                  // @ts-expect-error Patched
                  _spread: false,
                  start: Object.assign({}, event[1].start),
                }; // @ts-expect-error: `listItem` is most definitely defined, TS...

                events.splice(index, 0, ['enter', listItem, event[2]]);
                index++;
                length++;
                firstBlankLineIndex = undefined;
                atMarker = true;
              }
            }
          } // @ts-expect-error Patched.

          events[start][1]._spread = listSpread;
          return length;
        }
        /**
         * @type {CompileContext['setData']}
         * @param [value]
         */

        function setData(key, value) {
          data[key] = value;
        }
        /**
         * @type {CompileContext['getData']}
         * @template {string} K
         * @param {K} key
         * @returns {CompileData[K]}
         */

        function getData(key) {
          return data[key];
        }
        /**
         * @param {Point} d
         * @returns {Point}
         */

        function point(d) {
          return {
            line: d.line,
            column: d.column,
            offset: d.offset,
          };
        }
        /**
         * @param {(token: Token) => Node} create
         * @param {Handle} [and]
         * @returns {Handle}
         */

        function opener(create, and) {
          return open;
          /**
           * @this {CompileContext}
           * @param {Token} token
           * @returns {void}
           */

          function open(token) {
            enter.call(this, create(token), token);
            if (and) and.call(this, token);
          }
        }
        /** @type {CompileContext['buffer']} */

        function buffer() {
          this.stack.push({
            type: 'fragment',
            children: [],
          });
        }
        /**
         * @type {CompileContext['enter']}
         * @template {Node} N
         * @this {CompileContext}
         * @param {N} node
         * @param {Token} token
         * @param {OnEnterError} [errorHandler]
         * @returns {N}
         */

        function enter(node, token, errorHandler) {
          const parent = this.stack[this.stack.length - 1];
          // @ts-expect-error: Assume `Node` can exist as a child of `parent`.
          parent.children.push(node);
          this.stack.push(node);
          this.tokenStack.push([token, errorHandler]); // @ts-expect-error: `end` will be patched later.

          node.position = {
            start: point(token.start),
          };
          return node;
        }
        /**
         * @param {Handle} [and]
         * @returns {Handle}
         */

        function closer(and) {
          return close;
          /**
           * @this {CompileContext}
           * @param {Token} token
           * @returns {void}
           */

          function close(token) {
            if (and) and.call(this, token);
            exit.call(this, token);
          }
        }
        /**
         * @type {CompileContext['exit']}
         * @this {CompileContext}
         * @param {Token} token
         * @param {OnExitError} [onExitError]
         * @returns {Node}
         */

        function exit(token, onExitError) {
          const node = this.stack.pop();
          const open = this.tokenStack.pop();

          if (!open) {
            throw new Error(
              'Cannot close `' +
                token.type +
                '` (' +
                stringifyPosition({
                  start: token.start,
                  end: token.end,
                }) +
                '): it’s not open'
            );
          } else if (open[0].type !== token.type) {
            if (onExitError) {
              onExitError.call(this, token, open[0]);
            } else {
              const handler = open[1] || defaultOnError;
              handler.call(this, token, open[0]);
            }
          }

          node.position.end = point(token.end);
          return node;
        }
        /**
         * @this {CompileContext}
         * @returns {string}
         */

        function resume() {
          return (0, mdast_util_to_string /* toString */.B)(this.stack.pop());
        } //
        // Handlers.
        //

        /** @type {Handle} */

        function onenterlistordered() {
          setData('expectingFirstListItemValue', true);
        }
        /** @type {Handle} */

        function onenterlistitemvalue(token) {
          if (getData('expectingFirstListItemValue')) {
            const ancestor =
              /** @type {List} */
              this.stack[this.stack.length - 2];
            ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
            setData('expectingFirstListItemValue');
          }
        }
        /** @type {Handle} */

        function onexitcodefencedfenceinfo() {
          const data = this.resume();
          const node =
            /** @type {Code} */
            this.stack[this.stack.length - 1];
          node.lang = data;
        }
        /** @type {Handle} */

        function onexitcodefencedfencemeta() {
          const data = this.resume();
          const node =
            /** @type {Code} */
            this.stack[this.stack.length - 1];
          node.meta = data;
        }
        /** @type {Handle} */

        function onexitcodefencedfence() {
          // Exit if this is the closing fence.
          if (getData('flowCodeInside')) return;
          this.buffer();
          setData('flowCodeInside', true);
        }
        /** @type {Handle} */

        function onexitcodefenced() {
          const data = this.resume();
          const node =
            /** @type {Code} */
            this.stack[this.stack.length - 1];
          node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
          setData('flowCodeInside');
        }
        /** @type {Handle} */

        function onexitcodeindented() {
          const data = this.resume();
          const node =
            /** @type {Code} */
            this.stack[this.stack.length - 1];
          node.value = data.replace(/(\r?\n|\r)$/g, '');
        }
        /** @type {Handle} */

        function onexitdefinitionlabelstring(token) {
          // Discard label, use the source content instead.
          const label = this.resume();
          const node =
            /** @type {Definition} */
            this.stack[this.stack.length - 1];
          node.label = label;
          node.identifier = normalizeIdentifier(
            this.sliceSerialize(token)
          ).toLowerCase();
        }
        /** @type {Handle} */

        function onexitdefinitiontitlestring() {
          const data = this.resume();
          const node =
            /** @type {Definition} */
            this.stack[this.stack.length - 1];
          node.title = data;
        }
        /** @type {Handle} */

        function onexitdefinitiondestinationstring() {
          const data = this.resume();
          const node =
            /** @type {Definition} */
            this.stack[this.stack.length - 1];
          node.url = data;
        }
        /** @type {Handle} */

        function onexitatxheadingsequence(token) {
          const node =
            /** @type {Heading} */
            this.stack[this.stack.length - 1];

          if (!node.depth) {
            const depth = this.sliceSerialize(token).length;
            node.depth = depth;
          }
        }
        /** @type {Handle} */

        function onexitsetextheadingtext() {
          setData('setextHeadingSlurpLineEnding', true);
        }
        /** @type {Handle} */

        function onexitsetextheadinglinesequence(token) {
          const node =
            /** @type {Heading} */
            this.stack[this.stack.length - 1];
          node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
        }
        /** @type {Handle} */

        function onexitsetextheading() {
          setData('setextHeadingSlurpLineEnding');
        }
        /** @type {Handle} */

        function onenterdata(token) {
          const parent =
            /** @type {Parent} */
            this.stack[this.stack.length - 1];
          /** @type {Node} */

          let tail = parent.children[parent.children.length - 1];

          if (!tail || tail.type !== 'text') {
            // Add a new text node.
            tail = text(); // @ts-expect-error: we’ll add `end` later.

            tail.position = {
              start: point(token.start),
            }; // @ts-expect-error: Assume `parent` accepts `text`.

            parent.children.push(tail);
          }

          this.stack.push(tail);
        }
        /** @type {Handle} */

        function onexitdata(token) {
          const tail = this.stack.pop();
          tail.value += this.sliceSerialize(token);
          tail.position.end = point(token.end);
        }
        /** @type {Handle} */

        function onexitlineending(token) {
          const context = this.stack[this.stack.length - 1];

          // If we’re at a hard break, include the line ending in there.
          if (getData('atHardBreak')) {
            const tail = context.children[context.children.length - 1];
            tail.position.end = point(token.end);
            setData('atHardBreak');
            return;
          }

          if (
            !getData('setextHeadingSlurpLineEnding') &&
            config.canContainEols.includes(context.type)
          ) {
            onenterdata.call(this, token);
            onexitdata.call(this, token);
          }
        }
        /** @type {Handle} */

        function onexithardbreak() {
          setData('atHardBreak', true);
        }
        /** @type {Handle} */

        function onexithtmlflow() {
          const data = this.resume();
          const node =
            /** @type {HTML} */
            this.stack[this.stack.length - 1];
          node.value = data;
        }
        /** @type {Handle} */

        function onexithtmltext() {
          const data = this.resume();
          const node =
            /** @type {HTML} */
            this.stack[this.stack.length - 1];
          node.value = data;
        }
        /** @type {Handle} */

        function onexitcodetext() {
          const data = this.resume();
          const node =
            /** @type {InlineCode} */
            this.stack[this.stack.length - 1];
          node.value = data;
        }
        /** @type {Handle} */

        function onexitlink() {
          const context =
            /** @type {Link & {identifier: string, label: string}} */
            this.stack[this.stack.length - 1]; // To do: clean.

          if (getData('inReference')) {
            context.type += 'Reference'; // @ts-expect-error: mutate.

            context.referenceType = getData('referenceType') || 'shortcut'; // @ts-expect-error: mutate.

            delete context.url;
            delete context.title;
          } else {
            // @ts-expect-error: mutate.
            delete context.identifier; // @ts-expect-error: mutate.

            delete context.label;
          }

          setData('referenceType');
        }
        /** @type {Handle} */

        function onexitimage() {
          const context =
            /** @type {Image & {identifier: string, label: string}} */
            this.stack[this.stack.length - 1]; // To do: clean.

          if (getData('inReference')) {
            context.type += 'Reference'; // @ts-expect-error: mutate.

            context.referenceType = getData('referenceType') || 'shortcut'; // @ts-expect-error: mutate.

            delete context.url;
            delete context.title;
          } else {
            // @ts-expect-error: mutate.
            delete context.identifier; // @ts-expect-error: mutate.

            delete context.label;
          }

          setData('referenceType');
        }
        /** @type {Handle} */

        function onexitlabeltext(token) {
          const ancestor =
            /** @type {(Link|Image) & {identifier: string, label: string}} */
            this.stack[this.stack.length - 2];
          const string = this.sliceSerialize(token);
          ancestor.label = decodeString(string);
          ancestor.identifier = normalizeIdentifier(string).toLowerCase();
        }
        /** @type {Handle} */

        function onexitlabel() {
          const fragment =
            /** @type {Fragment} */
            this.stack[this.stack.length - 1];
          const value = this.resume();
          const node =
            /** @type {(Link|Image) & {identifier: string, label: string}} */
            this.stack[this.stack.length - 1]; // Assume a reference.

          setData('inReference', true);

          if (node.type === 'link') {
            // @ts-expect-error: Assume static phrasing content.
            node.children = fragment.children;
          } else {
            node.alt = value;
          }
        }
        /** @type {Handle} */

        function onexitresourcedestinationstring() {
          const data = this.resume();
          const node =
            /** @type {Link|Image} */
            this.stack[this.stack.length - 1];
          node.url = data;
        }
        /** @type {Handle} */

        function onexitresourcetitlestring() {
          const data = this.resume();
          const node =
            /** @type {Link|Image} */
            this.stack[this.stack.length - 1];
          node.title = data;
        }
        /** @type {Handle} */

        function onexitresource() {
          setData('inReference');
        }
        /** @type {Handle} */

        function onenterreference() {
          setData('referenceType', 'collapsed');
        }
        /** @type {Handle} */

        function onexitreferencestring(token) {
          const label = this.resume();
          const node =
            /** @type {LinkReference|ImageReference} */
            this.stack[this.stack.length - 1];
          node.label = label;
          node.identifier = normalizeIdentifier(
            this.sliceSerialize(token)
          ).toLowerCase();
          setData('referenceType', 'full');
        }
        /** @type {Handle} */

        function onexitcharacterreferencemarker(token) {
          setData('characterReferenceType', token.type);
        }
        /** @type {Handle} */

        function onexitcharacterreferencevalue(token) {
          const data = this.sliceSerialize(token);
          const type = getData('characterReferenceType');
          /** @type {string} */

          let value;

          if (type) {
            value = decodeNumericCharacterReference(
              data,
              type === 'characterReferenceMarkerNumeric' ? 10 : 16
            );
            setData('characterReferenceType');
          } else {
            // @ts-expect-error `decodeNamedCharacterReference` can return false for
            // invalid named character references, but everything we’ve tokenized is
            // valid.
            value = decodeNamedCharacterReference(data);
          }

          const tail = this.stack.pop();
          tail.value += value;
          tail.position.end = point(token.end);
        }
        /** @type {Handle} */

        function onexitautolinkprotocol(token) {
          onexitdata.call(this, token);
          const node =
            /** @type {Link} */
            this.stack[this.stack.length - 1];
          node.url = this.sliceSerialize(token);
        }
        /** @type {Handle} */

        function onexitautolinkemail(token) {
          onexitdata.call(this, token);
          const node =
            /** @type {Link} */
            this.stack[this.stack.length - 1];
          node.url = 'mailto:' + this.sliceSerialize(token);
        } //
        // Creaters.
        //

        /** @returns {Blockquote} */

        function blockQuote() {
          return {
            type: 'blockquote',
            children: [],
          };
        }
        /** @returns {Code} */

        function codeFlow() {
          return {
            type: 'code',
            lang: null,
            meta: null,
            value: '',
          };
        }
        /** @returns {InlineCode} */

        function codeText() {
          return {
            type: 'inlineCode',
            value: '',
          };
        }
        /** @returns {Definition} */

        function definition() {
          return {
            type: 'definition',
            identifier: '',
            label: null,
            title: null,
            url: '',
          };
        }
        /** @returns {Emphasis} */

        function emphasis() {
          return {
            type: 'emphasis',
            children: [],
          };
        }
        /** @returns {Heading} */

        function heading() {
          // @ts-expect-error `depth` will be set later.
          return {
            type: 'heading',
            depth: undefined,
            children: [],
          };
        }
        /** @returns {Break} */

        function hardBreak() {
          return {
            type: 'break',
          };
        }
        /** @returns {HTML} */

        function html() {
          return {
            type: 'html',
            value: '',
          };
        }
        /** @returns {Image} */

        function image() {
          return {
            type: 'image',
            title: null,
            url: '',
            alt: null,
          };
        }
        /** @returns {Link} */

        function link() {
          return {
            type: 'link',
            title: null,
            url: '',
            children: [],
          };
        }
        /**
         * @param {Token} token
         * @returns {List}
         */

        function list(token) {
          return {
            type: 'list',
            ordered: token.type === 'listOrdered',
            start: null,
            // @ts-expect-error Patched.
            spread: token._spread,
            children: [],
          };
        }
        /**
         * @param {Token} token
         * @returns {ListItem}
         */

        function listItem(token) {
          return {
            type: 'listItem',
            // @ts-expect-error Patched.
            spread: token._spread,
            checked: null,
            children: [],
          };
        }
        /** @returns {Paragraph} */

        function paragraph() {
          return {
            type: 'paragraph',
            children: [],
          };
        }
        /** @returns {Strong} */

        function strong() {
          return {
            type: 'strong',
            children: [],
          };
        }
        /** @returns {Text} */

        function text() {
          return {
            type: 'text',
            value: '',
          };
        }
        /** @returns {ThematicBreak} */

        function thematicBreak() {
          return {
            type: 'thematicBreak',
          };
        }
      }
      /**
       * @param {Extension} combined
       * @param {Array<Extension|Array<Extension>>} extensions
       * @returns {Extension}
       */

      function configure(combined, extensions) {
        let index = -1;

        while (++index < extensions.length) {
          const value = extensions[index];

          if (Array.isArray(value)) {
            configure(combined, value);
          } else {
            extension(combined, value);
          }
        }

        return combined;
      }
      /**
       * @param {Extension} combined
       * @param {Extension} extension
       * @returns {void}
       */

      function extension(combined, extension) {
        /** @type {string} */
        let key;

        for (key in extension) {
          if (lib_own.call(extension, key)) {
            const list = key === 'canContainEols' || key === 'transforms';
            const maybe = lib_own.call(combined, key)
              ? combined[key]
              : undefined;
            /* c8 ignore next */

            const left = maybe || (combined[key] = list ? [] : {});
            const right = extension[key];

            if (right) {
              if (list) {
                // @ts-expect-error: `left` is an array.
                combined[key] = [...left, ...right];
              } else {
                Object.assign(left, right);
              }
            }
          }
        }
      }
      /** @type {OnEnterError} */

      function defaultOnError(left, right) {
        if (left) {
          throw new Error(
            'Cannot close `' +
              left.type +
              '` (' +
              stringifyPosition({
                start: left.start,
                end: left.end,
              }) +
              '): a different token (`' +
              right.type +
              '`, ' +
              stringifyPosition({
                start: right.start,
                end: right.end,
              }) +
              ') is open'
          );
        } else {
          throw new Error(
            'Cannot close document, a token (`' +
              right.type +
              '`, ' +
              stringifyPosition({
                start: right.start,
                end: right.end,
              }) +
              ') is still open'
          );
        }
      } // CONCATENATED MODULE: ./node_modules/remark-parse/lib/index.js

      /**
       * @typedef {import('mdast').Root} Root
       * @typedef {import('mdast-util-from-markdown').Options} Options
       */

      /** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */
      function remarkParse(options) {
        /** @type {import('unified').ParserFunction<Root>} */
        const parser = (doc) => {
          // Assume options.
          const settings = /** @type {Options} */ (this.data('settings'));

          return fromMarkdown(
            doc,
            Object.assign({}, settings, options, {
              // Note: these options are not in the readme.
              // The goal is for them to be set by plugins on `data` instead of being
              // passed by users.
              extensions: this.data('micromarkExtensions') || [],
              mdastExtensions: this.data('fromMarkdownExtensions') || [],
            })
          );
        };

        Object.assign(this, { Parser: parser });
      } // CONCATENATED MODULE: ./node_modules/remark-parse/index.js

      /* harmony default export */ const remark_parse = remarkParse; // CONCATENATED MODULE: ./node_modules/zwitch/index.js

      var zwitch_own = {}.hasOwnProperty;

      /**
       * @callback Handler
       * @param {...unknown} value
       * @return {unknown}
       *
       * @typedef {Record<string, Handler>} Handlers
       *
       * @typedef {Object} Options
       * @property {Handler} [unknown]
       * @property {Handler} [invalid]
       * @property {Handlers} [handlers]
       */

      /**
       * Handle values based on a property.
       *
       * @param {string} key
       * @param {Options} [options]
       */
      function zwitch(key, options) {
        var settings = options || {};

        /**
         * Handle one value.
         * Based on the bound `key`, a respective handler will be called.
         * If `value` is not an object, or doesn’t have a `key` property, the special
         * “invalid” handler will be called.
         * If `value` has an unknown `key`, the special “unknown” handler will be
         * called.
         *
         * All arguments, and the context object, are passed through to the handler,
         * and it’s result is returned.
         *
         * @param {...unknown} [value]
         * @this {unknown}
         * @returns {unknown}
         * @property {Handler} invalid
         * @property {Handler} unknown
         * @property {Handlers} handlers
         */
        function one(value) {
          var fn = one.invalid;
          var handlers = one.handlers;

          if (value && zwitch_own.call(value, key)) {
            fn = zwitch_own.call(handlers, value[key])
              ? handlers[value[key]]
              : one.unknown;
          }

          if (fn) {
            return fn.apply(this, arguments);
          }
        }

        one.handlers = settings.handlers || {};
        one.invalid = settings.invalid;
        one.unknown = settings.unknown;

        return one;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/configure.js

      /**
       * @typedef {import('./types.js').Options} Options
       * @typedef {import('./types.js').Context} Context
       */

      /**
       * @param {Context} base
       * @param {Options} extension
       * @returns {Context}
       */
      function configure_configure(base, extension) {
        let index = -1;
        /** @type {string} */
        let key;

        // First do subextensions.
        if (extension.extensions) {
          while (++index < extension.extensions.length) {
            configure_configure(base, extension.extensions[index]);
          }
        }

        for (key in extension) {
          if (key === 'extensions') {
            // Empty.
          } else if (key === 'unsafe' || key === 'join') {
            /* c8 ignore next 2 */
            // @ts-expect-error: hush.
            base[key] = [...(base[key] || []), ...(extension[key] || [])];
          } else if (key === 'handlers') {
            base[key] = Object.assign(base[key], extension[key] || {});
          } else {
            // @ts-expect-error: hush.
            base.options[key] = extension[key];
          }
        }

        return base;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/track.js

      /**
       * @typedef {import('unist').Point} Point
       * @typedef {import('../types.js').TrackFields} TrackFields
       */

      /**
       * Functions to track output positions.
       * This info isn’t used yet but suchs functionality allows line wrapping,
       * and theoretically source maps (though, is there practical use in that?).
       *
       * @param {TrackFields} options_
       */
      function track(options_) {
        // Defaults are used to prevent crashes when older utilities somehow activate
        // this code.
        /* c8 ignore next 5 */
        const options = options_ || {};
        const now = options.now || {};
        let lineShift = options.lineShift || 0;
        let line = now.line || 1;
        let column = now.column || 1;

        return { move, current, shift };

        /**
         * Get the current tracked info.
         *
         * @returns {{now: Point, lineShift: number}}
         */
        function current() {
          return { now: { line, column }, lineShift };
        }

        /**
         * Define an increased line shift (the typical indent for lines).
         *
         * @param {number} value
         */
        function shift(value) {
          lineShift += value;
        }

        /**
         * Move past a string.
         *
         * @param {string} value
         * @returns {string}
         */
        function move(value = '') {
          const chunks = value.split(/\r?\n|\r/g);
          const tail = chunks[chunks.length - 1];
          line += chunks.length - 1;
          column =
            chunks.length === 1
              ? column + tail.length
              : 1 + tail.length + lineShift;
          return value;
        }
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/container-flow.js

      /**
       * @typedef {import('../types.js').Node} Node
       * @typedef {import('../types.js').Parent} Parent
       * @typedef {import('../types.js').Join} Join
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').TrackFields} TrackFields
       */

      /**
       * @param {Parent} parent
       * @param {Context} context
       * @param {TrackFields} safeOptions
       * @returns {string}
       */
      function containerFlow(parent, context, safeOptions) {
        const indexStack = context.indexStack;
        const children = parent.children || [];
        const tracker = track(safeOptions);
        /** @type {Array<string>} */
        const results = [];
        let index = -1;

        indexStack.push(-1);

        while (++index < children.length) {
          const child = children[index];

          indexStack[indexStack.length - 1] = index;

          results.push(
            tracker.move(
              context.handle(child, parent, context, {
                before: '\n',
                after: '\n',
                ...tracker.current(),
              })
            )
          );

          if (child.type !== 'list') {
            context.bulletLastUsed = undefined;
          }

          if (index < children.length - 1) {
            results.push(tracker.move(between(child, children[index + 1])));
          }
        }

        indexStack.pop();

        return results.join('');

        /**
         * @param {Node} left
         * @param {Node} right
         * @returns {string}
         */
        function between(left, right) {
          let index = context.join.length;

          while (index--) {
            const result = context.join[index](left, right, parent, context);

            if (result === true || result === 1) {
              break;
            }

            if (typeof result === 'number') {
              return '\n'.repeat(1 + result);
            }

            if (result === false) {
              return '\n\n<!---->\n\n';
            }
          }

          return '\n\n';
        }
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/indent-lines.js

      /**
       * @callback Map
       * @param {string} value
       * @param {number} line
       * @param {boolean} blank
       * @returns {string}
       */

      const eol = /\r?\n|\r/g;

      /**
       * @param {string} value
       * @param {Map} map
       * @returns {string}
       */
      function indentLines(value, map) {
        /** @type {Array<string>} */
        const result = [];
        let start = 0;
        let line = 0;
        /** @type {RegExpExecArray|null} */
        let match;

        while ((match = eol.exec(value))) {
          one(value.slice(start, match.index));
          result.push(match[0]);
          start = match.index + match[0].length;
          line++;
        }

        one(value.slice(start));

        return result.join('');

        /**
         * @param {string} value
         */
        function one(value) {
          result.push(map(value, line, !value));
        }
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/blockquote.js

      /**
       * @typedef {import('mdast').Blockquote} Blockquote
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('../util/indent-lines.js').Map} Map
       */

      /**
       * @type {Handle}
       * @param {Blockquote} node
       */
      function blockquote(node, _, context, safeOptions) {
        const exit = context.enter('blockquote');
        const tracker = track(safeOptions);
        tracker.move('> ');
        tracker.shift(2);
        const value = indentLines(
          containerFlow(node, context, tracker.current()),
          map
        );
        exit();
        return value;
      }

      /** @type {Map} */
      function map(line, _, blank) {
        return '>' + (blank ? '' : ' ') + line;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js

      /**
       * @typedef {import('../types.js').Unsafe} Unsafe
       */

      /**
       * @param {Array<string>} stack
       * @param {Unsafe} pattern
       * @returns {boolean}
       */
      function patternInScope(stack, pattern) {
        return (
          listInScope(stack, pattern.inConstruct, true) &&
          !listInScope(stack, pattern.notInConstruct, false)
        );
      }

      /**
       * @param {Array<string>} stack
       * @param {Unsafe['inConstruct']} list
       * @param {boolean} none
       * @returns {boolean}
       */
      function listInScope(stack, list, none) {
        if (!list) {
          return none;
        }

        if (typeof list === 'string') {
          list = [list];
        }

        let index = -1;

        while (++index < list.length) {
          if (stack.includes(list[index])) {
            return true;
          }
        }

        return false;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/break.js

      /**
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('mdast').Break} Break
       */

      /**
       * @type {Handle}
       * @param {Break} _
       */
      function hardBreak(_, _1, context, safe) {
        let index = -1;

        while (++index < context.unsafe.length) {
          // If we can’t put eols in this construct (setext headings, tables), use a
          // space instead.
          if (
            context.unsafe[index].character === '\n' &&
            patternInScope(context.stack, context.unsafe[index])
          ) {
            return /[ \t]/.test(safe.before) ? '' : ' ';
          }
        }

        return '\\\n';
      } // CONCATENATED MODULE: ./node_modules/longest-streak/index.js

      /**
       * Get the count of the longest repeating streak of `character` in `value`.
       *
       * @param {string} value
       *   Content to search in.
       * @param {string} character
       *   Single character to look for.
       * @returns {number}
       *   Count of most frequent adjacent `character`s in `value`.
       */
      function longestStreak(value, character) {
        const source = String(value);
        let index = source.indexOf(character);
        let expected = index;
        let count = 0;
        let max = 0;

        if (typeof character !== 'string' || character.length !== 1) {
          throw new Error('Expected character');
        }

        while (index !== -1) {
          if (index === expected) {
            if (++count > max) {
              max = count;
            }
          } else {
            count = 1;
          }

          expected = index + 1;
          index = source.indexOf(character, expected);
        }

        return max;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js

      /**
       * @typedef {import('mdast').Code} Code
       * @typedef {import('../types.js').Context} Context
       */

      /**
       * @param {Code} node
       * @param {Context} context
       * @returns {boolean}
       */
      function formatCodeAsIndented(node, context) {
        return Boolean(
          !context.options.fences &&
            node.value &&
            // If there’s no info…
            !node.lang &&
            // And there’s a non-whitespace character…
            /[^ \r\n]/.test(node.value) &&
            // And the value doesn’t start or end in a blank…
            !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
        );
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-fence.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['fence'], undefined>}
       */
      function checkFence(context) {
        const marker = context.options.fence || '`';

        if (marker !== '`' && marker !== '~') {
          throw new Error(
            'Cannot serialize code with `' +
              marker +
              '` for `options.fence`, expected `` ` `` or `~`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js

      /**
       * @typedef {import('../types.js').Unsafe} Unsafe
       */

      /**
       * @param {Unsafe} pattern
       * @returns {RegExp}
       */
      function patternCompile(pattern) {
        if (!pattern._compiled) {
          const before =
            (pattern.atBreak ? '[\\r\\n][\\t ]*' : '') +
            (pattern.before ? '(?:' + pattern.before + ')' : '');

          pattern._compiled = new RegExp(
            (before ? '(' + before + ')' : '') +
              (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
              pattern.character +
              (pattern.after ? '(?:' + pattern.after + ')' : ''),
            'g'
          );
        }

        return pattern._compiled;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/safe.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').SafeOptions} SafeOptions
       */

      /**
       * @param {Context} context
       * @param {string|null|undefined} input
       * @param {SafeOptions & {encode?: Array<string>}} config
       * @returns {string}
       */
      function safe(context, input, config) {
        const value =
          (config.before || '') + (input || '') + (config.after || '');
        /** @type {Array<number>} */
        const positions = [];
        /** @type {Array<string>} */
        const result = [];
        /** @type {Record<number, {before: boolean, after: boolean}>} */
        const infos = {};
        let index = -1;

        while (++index < context.unsafe.length) {
          const pattern = context.unsafe[index];

          if (!patternInScope(context.stack, pattern)) {
            continue;
          }

          const expression = patternCompile(pattern);
          /** @type {RegExpExecArray|null} */
          let match;

          while ((match = expression.exec(value))) {
            const before = 'before' in pattern || Boolean(pattern.atBreak);
            const after = 'after' in pattern;
            const position = match.index + (before ? match[1].length : 0);

            if (positions.includes(position)) {
              if (infos[position].before && !before) {
                infos[position].before = false;
              }

              if (infos[position].after && !after) {
                infos[position].after = false;
              }
            } else {
              positions.push(position);
              infos[position] = { before, after };
            }
          }
        }

        positions.sort(numerical);

        let start = config.before ? config.before.length : 0;
        const end = value.length - (config.after ? config.after.length : 0);
        index = -1;

        while (++index < positions.length) {
          const position = positions[index];

          // Character before or after matched:
          if (position < start || position >= end) {
            continue;
          }

          // If this character is supposed to be escaped because it has a condition on
          // the next character, and the next character is definitly being escaped,
          // then skip this escape.
          if (
            (position + 1 < end &&
              positions[index + 1] === position + 1 &&
              infos[position].after &&
              !infos[position + 1].before &&
              !infos[position + 1].after) ||
            (positions[index - 1] === position - 1 &&
              infos[position].before &&
              !infos[position - 1].before &&
              !infos[position - 1].after)
          ) {
            continue;
          }

          if (start !== position) {
            // If we have to use a character reference, an ampersand would be more
            // correct, but as backslashes only care about punctuation, either will
            // do the trick
            result.push(escapeBackslashes(value.slice(start, position), '\\'));
          }

          start = position;

          if (
            /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
            (!config.encode || !config.encode.includes(value.charAt(position)))
          ) {
            // Character escape.
            result.push('\\');
          } else {
            // Character reference.
            result.push(
              '&#x' +
                value.charCodeAt(position).toString(16).toUpperCase() +
                ';'
            );
            start++;
          }
        }

        result.push(escapeBackslashes(value.slice(start, end), config.after));

        return result.join('');
      }

      /**
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      function numerical(a, b) {
        return a - b;
      }

      /**
       * @param {string} value
       * @param {string} after
       * @returns {string}
       */
      function escapeBackslashes(value, after) {
        const expression = /\\(?=[!-/:-@[-`{-~])/g;
        /** @type {Array<number>} */
        const positions = [];
        /** @type {Array<string>} */
        const results = [];
        const whole = value + after;
        let index = -1;
        let start = 0;
        /** @type {RegExpExecArray|null} */
        let match;

        while ((match = expression.exec(whole))) {
          positions.push(match.index);
        }

        while (++index < positions.length) {
          if (start !== positions[index]) {
            results.push(value.slice(start, positions[index]));
          }

          results.push('\\');
          start = positions[index];
        }

        results.push(value.slice(start));

        return results.join('');
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/code.js

      /**
       * @typedef {import('mdast').Code} Code
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('../types.js').Exit} Exit
       * @typedef {import('../util/indent-lines.js').Map} Map
       */

      /**
       * @type {Handle}
       * @param {Code} node
       */
      function code(node, _, context, safeOptions) {
        const marker = checkFence(context);
        const raw = node.value || '';
        const suffix = marker === '`' ? 'GraveAccent' : 'Tilde';

        if (formatCodeAsIndented(node, context)) {
          const exit = context.enter('codeIndented');
          const value = indentLines(raw, code_map);
          exit();
          return value;
        }

        const tracker = track(safeOptions);
        const sequence = marker.repeat(
          Math.max(longestStreak(raw, marker) + 1, 3)
        );
        const exit = context.enter('codeFenced');
        let value = tracker.move(sequence);

        if (node.lang) {
          const subexit = context.enter('codeFencedLang' + suffix);
          value += tracker.move(
            safe(context, node.lang, {
              before: value,
              after: ' ',
              encode: ['`'],
              ...tracker.current(),
            })
          );
          subexit();
        }

        if (node.lang && node.meta) {
          const subexit = context.enter('codeFencedMeta' + suffix);
          value += tracker.move(' ');
          value += tracker.move(
            safe(context, node.meta, {
              before: value,
              after: '\n',
              encode: ['`'],
              ...tracker.current(),
            })
          );
          subexit();
        }

        value += tracker.move('\n');

        if (raw) {
          value += tracker.move(raw + '\n');
        }

        value += tracker.move(sequence);
        exit();
        return value;
      }

      /** @type {Map} */
      function code_map(line, _, blank) {
        return (blank ? '' : '    ') + line;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/association.js

      /**
       * @typedef {import('mdast').Association} Association
       */

      /**
       * The `label` of an association is the string value: character escapes and
       * references work, and casing is intact.
       * The `identifier` is used to match one association to another: controversially,
       * character escapes and references don’t work in this matching: `&copy;` does
       * not match `©`, and `\+` does not match `+`.
       * But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
       * matches `a b`.
       * So, we do prefer the label when figuring out how we’re going to serialize:
       * it has whitespace, casing, and we can ignore most useless character escapes
       * and all character references.
       *
       * @param {Association} node
       * @returns {string}
       */
      function association(node) {
        if (node.label || !node.identifier) {
          return node.label || '';
        }

        return decodeString(node.identifier);
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-quote.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['quote'], undefined>}
       */
      function checkQuote(context) {
        const marker = context.options.quote || '"';

        if (marker !== '"' && marker !== "'") {
          throw new Error(
            'Cannot serialize title with `' +
              marker +
              '` for `options.quote`, expected `"`, or `\'`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/definition.js

      /**
       * @typedef {import('mdast').Definition} Definition
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {Definition} node
       */
      function definition_definition(node, _, context, safeOptions) {
        const quote = checkQuote(context);
        const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
        const exit = context.enter('definition');
        let subexit = context.enter('label');
        const tracker = track(safeOptions);
        let value = tracker.move('[');
        value += tracker.move(
          safe(context, association(node), {
            before: value,
            after: ']',
            ...tracker.current(),
          })
        );
        value += tracker.move(']: ');

        subexit();

        if (
          // If there’s no url, or…
          !node.url ||
          // If there are control characters or whitespace.
          /[\0- \u007F]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value += tracker.move('<');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: '>',
              ...tracker.current(),
            })
          );
          value += tracker.move('>');
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: node.title ? ' ' : '\n',
              ...tracker.current(),
            })
          );
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value += tracker.move(' ' + quote);
          value += tracker.move(
            safe(context, node.title, {
              before: value,
              after: quote,
              ...tracker.current(),
            })
          );
          value += tracker.move(quote);
          subexit();
        }

        exit();

        return value;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['emphasis'], undefined>}
       */
      function checkEmphasis(context) {
        const marker = context.options.emphasis || '*';

        if (marker !== '*' && marker !== '_') {
          throw new Error(
            'Cannot serialize emphasis with `' +
              marker +
              '` for `options.emphasis`, expected `*`, or `_`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js

      /**
       * @typedef {import('../types.js').Node} Node
       * @typedef {import('../types.js').Parent} Parent
       * @typedef {import('../types.js').SafeOptions} SafeOptions
       * @typedef {import('../types.js').Context} Context
       */

      /**
       * @param {Parent} parent
       * @param {Context} context
       * @param {SafeOptions} safeOptions
       * @returns {string}
       */
      function containerPhrasing(parent, context, safeOptions) {
        const indexStack = context.indexStack;
        const children = parent.children || [];
        /** @type {Array<string>} */
        const results = [];
        let index = -1;
        let before = safeOptions.before;

        indexStack.push(-1);
        let tracker = track(safeOptions);

        while (++index < children.length) {
          const child = children[index];
          /** @type {string} */
          let after;

          indexStack[indexStack.length - 1] = index;

          if (index + 1 < children.length) {
            // @ts-expect-error: hush, it’s actually a `zwitch`.
            let handle = context.handle.handlers[children[index + 1].type];
            if (handle && handle.peek) handle = handle.peek;
            after = handle
              ? handle(children[index + 1], parent, context, {
                  before: '',
                  after: '',
                  ...tracker.current(),
                }).charAt(0)
              : '';
          } else {
            after = safeOptions.after;
          }

          // In some cases, html (text) can be found in phrasing right after an eol.
          // When we’d serialize that, in most cases that would be seen as html
          // (flow).
          // As we can’t escape or so to prevent it from happening, we take a somewhat
          // reasonable approach: replace that eol with a space.
          // See: <https://github.com/syntax-tree/mdast-util-to-markdown/issues/15>
          if (
            results.length > 0 &&
            (before === '\r' || before === '\n') &&
            child.type === 'html'
          ) {
            results[results.length - 1] = results[results.length - 1].replace(
              /(\r?\n|\r)$/,
              ' '
            );
            before = ' ';

            // To do: does this work to reset tracker?
            tracker = track(safeOptions);
            tracker.move(results.join(''));
          }

          results.push(
            tracker.move(
              context.handle(child, parent, context, {
                ...tracker.current(),
                before,
                after,
              })
            )
          );

          before = results[results.length - 1].slice(-1);
        }

        indexStack.pop();

        return results.join('');
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/emphasis.js

      /**
       * @typedef {import('mdast').Emphasis} Emphasis
       * @typedef {import('../types.js').Handle} Handle
       */

      emphasis.peek = emphasisPeek;

      // To do: there are cases where emphasis cannot “form” depending on the
      // previous or next character of sequences.
      // There’s no way around that though, except for injecting zero-width stuff.
      // Do we need to safeguard against that?
      /**
       * @type {Handle}
       * @param {Emphasis} node
       */
      function emphasis(node, _, context, safeOptions) {
        const marker = checkEmphasis(context);
        const exit = context.enter('emphasis');
        const tracker = track(safeOptions);
        let value = tracker.move(marker);
        value += tracker.move(
          containerPhrasing(node, context, {
            before: value,
            after: marker,
            ...tracker.current(),
          })
        );
        value += tracker.move(marker);
        exit();
        return value;
      }

      /**
       * @type {Handle}
       * @param {Emphasis} _
       */
      function emphasisPeek(_, _1, context) {
        return context.options.emphasis || '*';
      }

      // EXTERNAL MODULE: ./node_modules/unist-util-is/index.js
      var unist_util_is = __nccwpck_require__(1481); // CONCATENATED MODULE: ./node_modules/unist-util-visit-parents/color.js
      /**
       * @param {string} d
       * @returns {string}
       */
      function color(d) {
        return '\u001B[33m' + d + '\u001B[39m';
      } // CONCATENATED MODULE: ./node_modules/unist-util-visit-parents/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Parent} Parent
       * @typedef {import('unist-util-is').Test} Test
       * @typedef {import('./complex-types').Action} Action
       * @typedef {import('./complex-types').Index} Index
       * @typedef {import('./complex-types').ActionTuple} ActionTuple
       * @typedef {import('./complex-types').VisitorResult} VisitorResult
       * @typedef {import('./complex-types').Visitor} Visitor
       */

      /**
       * Continue traversing as normal
       */
      const CONTINUE = true;
      /**
       * Do not traverse this node’s children
       */
      const SKIP = 'skip';
      /**
       * Stop traversing immediately
       */
      const EXIT = false;

      /**
       * Visit children of tree which pass a test
       *
       * @param tree Abstract syntax tree to walk
       * @param test Test node, optional
       * @param visitor Function to run for each node
       * @param reverse Visit the tree in reverse order, defaults to false
       */
      const visitParents =
        /**
         * @type {(
         *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
         *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
         * )}
         */
        (
          /**
           * @param {Node} tree
           * @param {Test} test
           * @param {import('./complex-types').Visitor<Node>} visitor
           * @param {boolean} [reverse]
           */
          function (tree, test, visitor, reverse) {
            if (typeof test === 'function' && typeof visitor !== 'function') {
              reverse = visitor;
              // @ts-expect-error no visitor given, so `visitor` is test.
              visitor = test;
              test = null;
            }

            const is = (0, unist_util_is /* convert */.O)(test);
            const step = reverse ? -1 : 1;

            factory(tree, null, [])();

            /**
             * @param {Node} node
             * @param {number?} index
             * @param {Array.<Parent>} parents
             */
            function factory(node, index, parents) {
              /** @type {Object.<string, unknown>} */
              // @ts-expect-error: hush
              const value =
                typeof node === 'object' && node !== null ? node : {};
              /** @type {string|undefined} */
              let name;

              if (typeof value.type === 'string') {
                name =
                  typeof value.tagName === 'string'
                    ? value.tagName
                    : typeof value.name === 'string'
                    ? value.name
                    : undefined;

                Object.defineProperty(visit, 'name', {
                  value:
                    'node (' +
                    color(value.type + (name ? '<' + name + '>' : '')) +
                    ')',
                });
              }

              return visit;

              function visit() {
                /** @type {ActionTuple} */
                let result = [];
                /** @type {ActionTuple} */
                let subresult;
                /** @type {number} */
                let offset;
                /** @type {Array.<Parent>} */
                let grandparents;

                if (
                  !test ||
                  is(node, index, parents[parents.length - 1] || null)
                ) {
                  result = toResult(visitor(node, parents));

                  if (result[0] === EXIT) {
                    return result;
                  }
                }

                // @ts-expect-error looks like a parent.
                if (node.children && result[0] !== SKIP) {
                  // @ts-expect-error looks like a parent.
                  offset = (reverse ? node.children.length : -1) + step;
                  // @ts-expect-error looks like a parent.
                  grandparents = parents.concat(node);

                  // @ts-expect-error looks like a parent.
                  while (offset > -1 && offset < node.children.length) {
                    // @ts-expect-error looks like a parent.
                    subresult = factory(
                      node.children[offset],
                      offset,
                      grandparents
                    )();

                    if (subresult[0] === EXIT) {
                      return subresult;
                    }

                    offset =
                      typeof subresult[1] === 'number'
                        ? subresult[1]
                        : offset + step;
                  }
                }

                return result;
              }
            }
          }
        );

      /**
       * @param {VisitorResult} value
       * @returns {ActionTuple}
       */
      function toResult(value) {
        if (Array.isArray(value)) {
          return value;
        }

        if (typeof value === 'number') {
          return [CONTINUE, value];
        }

        return [value];
      } // CONCATENATED MODULE: ./node_modules/unist-util-visit/index.js

      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Parent} Parent
       * @typedef {import('unist-util-is').Test} Test
       * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
       * @typedef {import('./complex-types').Visitor} Visitor
       */

      /**
       * Visit children of tree which pass a test
       *
       * @param tree Abstract syntax tree to walk
       * @param test Test, optional
       * @param visitor Function to run for each node
       * @param reverse Fisit the tree in reverse, defaults to false
       */
      const visit =
        /**
         * @type {(
         *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
         *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
         * )}
         */
        (
          /**
           * @param {Node} tree
           * @param {Test} test
           * @param {import('./complex-types').Visitor} visitor
           * @param {boolean} [reverse]
           */
          function (tree, test, visitor, reverse) {
            if (typeof test === 'function' && typeof visitor !== 'function') {
              reverse = visitor;
              visitor = test;
              test = null;
            }

            visitParents(tree, test, overload, reverse);

            /**
             * @param {Node} node
             * @param {Array.<Parent>} parents
             */
            function overload(node, parents) {
              const parent = parents[parents.length - 1];
              return visitor(
                node,
                parent ? parent.children.indexOf(node) : null,
                parent
              );
            }
          }
        ); // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js

      /**
       * @typedef {import('mdast').Heading} Heading
       * @typedef {import('../types.js').Context} Context
       */

      /**
       * @param {Heading} node
       * @param {Context} context
       * @returns {boolean}
       */
      function formatHeadingAsSetext(node, context) {
        let literalWithBreak = false;

        // Look for literals with a line break.
        // Note that this also
        visit(node, (node) => {
          if (
            ('value' in node && /\r?\n|\r/.test(node.value)) ||
            node.type === 'break'
          ) {
            literalWithBreak = true;
            return EXIT;
          }
        });

        return Boolean(
          (!node.depth || node.depth < 3) &&
            (0, mdast_util_to_string /* toString */.B)(node) &&
            (context.options.setext || literalWithBreak)
        );
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/heading.js

      /**
       * @typedef {import('mdast').Heading} Heading
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('../types.js').Exit} Exit
       */

      /**
       * @type {Handle}
       * @param {Heading} node
       */
      function heading(node, _, context, safeOptions) {
        const rank = Math.max(Math.min(6, node.depth || 1), 1);
        const tracker = track(safeOptions);

        if (formatHeadingAsSetext(node, context)) {
          const exit = context.enter('headingSetext');
          const subexit = context.enter('phrasing');
          const value = containerPhrasing(node, context, {
            ...tracker.current(),
            before: '\n',
            after: '\n',
          });
          subexit();
          exit();

          return (
            value +
            '\n' +
            (rank === 1 ? '=' : '-').repeat(
              // The whole size…
              value.length -
                // Minus the position of the character after the last EOL (or
                // 0 if there is none)…
                (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
            )
          );
        }

        const sequence = '#'.repeat(rank);
        const exit = context.enter('headingAtx');
        const subexit = context.enter('phrasing');

        // Note: for proper tracking, we should reset the output positions when there
        // is no content returned, because then the space is not output.
        // Practically, in that case, there is no content, so it doesn’t matter that
        // we’ve tracked one too many characters.
        tracker.move(sequence + ' ');

        let value = containerPhrasing(node, context, {
          before: '# ',
          after: '\n',
          ...tracker.current(),
        });

        if (/^[\t ]/.test(value)) {
          // To do: what effect has the character reference on tracking?
          value =
            '&#x' +
            value.charCodeAt(0).toString(16).toUpperCase() +
            ';' +
            value.slice(1);
        }

        value = value ? sequence + ' ' + value : sequence;

        if (context.options.closeAtx) {
          value += ' ' + sequence;
        }

        subexit();
        exit();

        return value;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/html.js

      /**
       * @typedef {import('mdast').HTML} HTML
       * @typedef {import('../types.js').Handle} Handle
       */

      html.peek = htmlPeek;

      /**
       * @type {Handle}
       * @param {HTML} node
       */
      function html(node) {
        return node.value || '';
      }

      /**
       * @type {Handle}
       */
      function htmlPeek() {
        return '<';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/image.js

      /**
       * @typedef {import('mdast').Image} Image
       * @typedef {import('../types.js').Handle} Handle
       */

      image_image.peek = imagePeek;

      /**
       * @type {Handle}
       * @param {Image} node
       */
      function image_image(node, _, context, safeOptions) {
        const quote = checkQuote(context);
        const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
        const exit = context.enter('image');
        let subexit = context.enter('label');
        const tracker = track(safeOptions);
        let value = tracker.move('![');
        value += tracker.move(
          safe(context, node.alt, {
            before: value,
            after: ']',
            ...tracker.current(),
          })
        );
        value += tracker.move('](');

        subexit();

        if (
          // If there’s no url but there is a title…
          (!node.url && node.title) ||
          // If there are control characters or whitespace.
          /[\0- \u007F]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value += tracker.move('<');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: '>',
              ...tracker.current(),
            })
          );
          value += tracker.move('>');
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: node.title ? ' ' : ')',
              ...tracker.current(),
            })
          );
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value += tracker.move(' ' + quote);
          value += tracker.move(
            safe(context, node.title, {
              before: value,
              after: quote,
              ...tracker.current(),
            })
          );
          value += tracker.move(quote);
          subexit();
        }

        value += tracker.move(')');
        exit();

        return value;
      }

      /**
       * @type {Handle}
       */
      function imagePeek() {
        return '!';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/image-reference.js

      /**
       * @typedef {import('mdast').ImageReference} ImageReference
       * @typedef {import('../types.js').Handle} Handle
       */

      imageReference.peek = imageReferencePeek;

      /**
       * @type {Handle}
       * @param {ImageReference} node
       */
      function imageReference(node, _, context, safeOptions) {
        const type = node.referenceType;
        const exit = context.enter('imageReference');
        let subexit = context.enter('label');
        const tracker = track(safeOptions);
        let value = tracker.move('![');
        const alt = safe(context, node.alt, {
          before: value,
          after: ']',
          ...tracker.current(),
        });
        value += tracker.move(alt + '][');

        subexit();
        // Hide the fact that we’re in phrasing, because escapes don’t work.
        const stack = context.stack;
        context.stack = [];
        subexit = context.enter('reference');
        // Note: for proper tracking, we should reset the output positions when we end
        // up making a `shortcut` reference, because then there is no brace output.
        // Practically, in that case, there is no content, so it doesn’t matter that
        // we’ve tracked one too many characters.
        const reference = safe(context, association(node), {
          before: value,
          after: ']',
          ...tracker.current(),
        });
        subexit();
        context.stack = stack;
        exit();

        if (type === 'full' || !alt || alt !== reference) {
          value += tracker.move(reference + ']');
        } else if (type === 'shortcut') {
          // Remove the unwanted `[`.
          value = value.slice(0, -1);
        } else {
          value += tracker.move(']');
        }

        return value;
      }

      /**
       * @type {Handle}
       */
      function imageReferencePeek() {
        return '!';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/inline-code.js

      /**
       * @typedef {import('mdast').InlineCode} InlineCode
       * @typedef {import('../types.js').Handle} Handle
       */

      inlineCode.peek = inlineCodePeek;

      /**
       * @type {Handle}
       * @param {InlineCode} node
       */
      function inlineCode(node, _, context) {
        let value = node.value || '';
        let sequence = '`';
        let index = -1;

        // If there is a single grave accent on its own in the code, use a fence of
        // two.
        // If there are two in a row, use one.
        while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
          sequence += '`';
        }

        // If this is not just spaces or eols (tabs don’t count), and either the
        // first or last character are a space, eol, or tick, then pad with spaces.
        if (
          /[^ \r\n]/.test(value) &&
          ((/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value)) ||
            /^`|`$/.test(value))
        ) {
          value = ' ' + value + ' ';
        }

        // We have a potential problem: certain characters after eols could result in
        // blocks being seen.
        // For example, if someone injected the string `'\n# b'`, then that would
        // result in an ATX heading.
        // We can’t escape characters in `inlineCode`, but because eols are
        // transformed to spaces when going from markdown to HTML anyway, we can swap
        // them out.
        while (++index < context.unsafe.length) {
          const pattern = context.unsafe[index];
          const expression = patternCompile(pattern);
          /** @type {RegExpExecArray|null} */
          let match;

          // Only look for `atBreak`s.
          // Btw: note that `atBreak` patterns will always start the regex at LF or
          // CR.
          if (!pattern.atBreak) continue;

          while ((match = expression.exec(value))) {
            let position = match.index;

            // Support CRLF (patterns only look for one of the characters).
            if (
              value.charCodeAt(position) === 10 /* `\n` */ &&
              value.charCodeAt(position - 1) === 13 /* `\r` */
            ) {
              position--;
            }

            value =
              value.slice(0, position) + ' ' + value.slice(match.index + 1);
          }
        }

        return sequence + value + sequence;
      }

      /**
       * @type {Handle}
       */
      function inlineCodePeek() {
        return '`';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js

      /**
       * @typedef {import('mdast').Link} Link
       * @typedef {import('../types.js').Context} Context
       */

      /**
       * @param {Link} node
       * @param {Context} context
       * @returns {boolean}
       */
      function formatLinkAsAutolink(node, context) {
        const raw = (0, mdast_util_to_string /* toString */.B)(node);

        return Boolean(
          !context.options.resourceLink &&
            // If there’s a url…
            node.url &&
            // And there’s a no title…
            !node.title &&
            // And the content of `node` is a single text node…
            node.children &&
            node.children.length === 1 &&
            node.children[0].type === 'text' &&
            // And if the url is the same as the content…
            (raw === node.url || 'mailto:' + raw === node.url) &&
            // And that starts w/ a protocol…
            /^[a-z][a-z+.-]+:/i.test(node.url) &&
            // And that doesn’t contain ASCII control codes (character escapes and
            // references don’t work), space, or angle brackets…
            !/[\0- <>\u007F]/.test(node.url)
        );
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/link.js

      /**
       * @typedef {import('mdast').Link} Link
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('../types.js').Exit} Exit
       */

      link_link.peek = linkPeek;

      /**
       * @type {Handle}
       * @param {Link} node
       */
      function link_link(node, _, context, safeOptions) {
        const quote = checkQuote(context);
        const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
        const tracker = track(safeOptions);
        /** @type {Exit} */
        let exit;
        /** @type {Exit} */
        let subexit;

        if (formatLinkAsAutolink(node, context)) {
          // Hide the fact that we’re in phrasing, because escapes don’t work.
          const stack = context.stack;
          context.stack = [];
          exit = context.enter('autolink');
          let value = tracker.move('<');
          value += tracker.move(
            containerPhrasing(node, context, {
              before: value,
              after: '>',
              ...tracker.current(),
            })
          );
          value += tracker.move('>');
          exit();
          context.stack = stack;
          return value;
        }

        exit = context.enter('link');
        subexit = context.enter('label');
        let value = tracker.move('[');
        value += tracker.move(
          containerPhrasing(node, context, {
            before: value,
            after: '](',
            ...tracker.current(),
          })
        );
        value += tracker.move('](');
        subexit();

        if (
          // If there’s no url but there is a title…
          (!node.url && node.title) ||
          // If there are control characters or whitespace.
          /[\0- \u007F]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value += tracker.move('<');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: '>',
              ...tracker.current(),
            })
          );
          value += tracker.move('>');
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += tracker.move(
            safe(context, node.url, {
              before: value,
              after: node.title ? ' ' : ')',
              ...tracker.current(),
            })
          );
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value += tracker.move(' ' + quote);
          value += tracker.move(
            safe(context, node.title, {
              before: value,
              after: quote,
              ...tracker.current(),
            })
          );
          value += tracker.move(quote);
          subexit();
        }

        value += tracker.move(')');

        exit();
        return value;
      }

      /**
       * @type {Handle}
       * @param {Link} node
       */
      function linkPeek(node, _, context) {
        return formatLinkAsAutolink(node, context) ? '<' : '[';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/link-reference.js

      /**
       * @typedef {import('mdast').LinkReference} LinkReference
       * @typedef {import('../types.js').Handle} Handle
       */

      linkReference.peek = linkReferencePeek;

      /**
       * @type {Handle}
       * @param {LinkReference} node
       */
      function linkReference(node, _, context, safeOptions) {
        const type = node.referenceType;
        const exit = context.enter('linkReference');
        let subexit = context.enter('label');
        const tracker = track(safeOptions);
        let value = tracker.move('[');
        const text = containerPhrasing(node, context, {
          before: value,
          after: ']',
          ...tracker.current(),
        });
        value += tracker.move(text + '][');

        subexit();
        // Hide the fact that we’re in phrasing, because escapes don’t work.
        const stack = context.stack;
        context.stack = [];
        subexit = context.enter('reference');
        // Note: for proper tracking, we should reset the output positions when we end
        // up making a `shortcut` reference, because then there is no brace output.
        // Practically, in that case, there is no content, so it doesn’t matter that
        // we’ve tracked one too many characters.
        const reference = safe(context, association(node), {
          before: value,
          after: ']',
          ...tracker.current(),
        });
        subexit();
        context.stack = stack;
        exit();

        if (type === 'full' || !text || text !== reference) {
          value += tracker.move(reference + ']');
        } else if (type === 'shortcut') {
          // Remove the unwanted `[`.
          value = value.slice(0, -1);
        } else {
          value += tracker.move(']');
        }

        return value;
      }

      /**
       * @type {Handle}
       */
      function linkReferencePeek() {
        return '[';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-bullet.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['bullet'], undefined>}
       */
      function checkBullet(context) {
        const marker = context.options.bullet || '*';

        if (marker !== '*' && marker !== '+' && marker !== '-') {
          throw new Error(
            'Cannot serialize items with `' +
              marker +
              '` for `options.bullet`, expected `*`, `+`, or `-`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['bullet'], undefined>}
       */
      function checkBulletOther(context) {
        const bullet = checkBullet(context);
        const bulletOther = context.options.bulletOther;

        if (!bulletOther) {
          return bullet === '*' ? '-' : '*';
        }

        if (bulletOther !== '*' && bulletOther !== '+' && bulletOther !== '-') {
          throw new Error(
            'Cannot serialize items with `' +
              bulletOther +
              '` for `options.bulletOther`, expected `*`, `+`, or `-`'
          );
        }

        if (bulletOther === bullet) {
          throw new Error(
            'Expected `bullet` (`' +
              bullet +
              '`) and `bulletOther` (`' +
              bulletOther +
              '`) to be different'
          );
        }

        return bulletOther;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['bulletOrdered'], undefined>}
       */
      function checkBulletOrdered(context) {
        const marker = context.options.bulletOrdered || '.';

        if (marker !== '.' && marker !== ')') {
          throw new Error(
            'Cannot serialize items with `' +
              marker +
              '` for `options.bulletOrdered`, expected `.` or `)`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered-other.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['bulletOrdered'], undefined>}
       */
      function checkBulletOrderedOther(context) {
        const bulletOrdered = checkBulletOrdered(context);
        const bulletOrderedOther = context.options.bulletOrderedOther;

        if (!bulletOrderedOther) {
          return bulletOrdered === '.' ? ')' : '.';
        }

        if (bulletOrderedOther !== '.' && bulletOrderedOther !== ')') {
          throw new Error(
            'Cannot serialize items with `' +
              bulletOrderedOther +
              '` for `options.bulletOrderedOther`, expected `*`, `+`, or `-`'
          );
        }

        if (bulletOrderedOther === bulletOrdered) {
          throw new Error(
            'Expected `bulletOrdered` (`' +
              bulletOrdered +
              '`) and `bulletOrderedOther` (`' +
              bulletOrderedOther +
              '`) to be different'
          );
        }

        return bulletOrderedOther;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-rule.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['rule'], undefined>}
       */
      function checkRule(context) {
        const marker = context.options.rule || '*';

        if (marker !== '*' && marker !== '-' && marker !== '_') {
          throw new Error(
            'Cannot serialize rules with `' +
              marker +
              '` for `options.rule`, expected `*`, `-`, or `_`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/list.js

      /**
       * @typedef {import('mdast').List} List
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {List} node
       */
      function list_list(node, parent, context, safeOptions) {
        const exit = context.enter('list');
        const bulletCurrent = context.bulletCurrent;
        /** @type {string} */
        let bullet = node.ordered
          ? checkBulletOrdered(context)
          : checkBullet(context);
        /** @type {string} */
        const bulletOther = node.ordered
          ? checkBulletOrderedOther(context)
          : checkBulletOther(context);
        const bulletLastUsed = context.bulletLastUsed;
        let useDifferentMarker = false;

        if (
          parent &&
          // Explicit `other` set.
          (node.ordered
            ? context.options.bulletOrderedOther
            : context.options.bulletOther) &&
          bulletLastUsed &&
          bullet === bulletLastUsed
        ) {
          useDifferentMarker = true;
        }

        if (!node.ordered) {
          const firstListItem = node.children ? node.children[0] : undefined;

          // If there’s an empty first list item directly in two list items,
          // we have to use a different bullet:
          //
          // ```markdown
          // * - *
          // ```
          //
          // …because otherwise it would become one big thematic break.
          if (
            // Bullet could be used as a thematic break marker:
            (bullet === '*' || bullet === '-') &&
            // Empty first list item:
            firstListItem &&
            (!firstListItem.children || !firstListItem.children[0]) &&
            // Directly in two other list items:
            context.stack[context.stack.length - 1] === 'list' &&
            context.stack[context.stack.length - 2] === 'listItem' &&
            context.stack[context.stack.length - 3] === 'list' &&
            context.stack[context.stack.length - 4] === 'listItem' &&
            // That are each the first child.
            context.indexStack[context.indexStack.length - 1] === 0 &&
            context.indexStack[context.indexStack.length - 2] === 0 &&
            context.indexStack[context.indexStack.length - 3] === 0
          ) {
            useDifferentMarker = true;
          }

          // If there’s a thematic break at the start of the first list item,
          // we have to use a different bullet:
          //
          // ```markdown
          // * ---
          // ```
          //
          // …because otherwise it would become one big thematic break.
          if (checkRule(context) === bullet && firstListItem) {
            let index = -1;

            while (++index < node.children.length) {
              const item = node.children[index];

              if (
                item &&
                item.type === 'listItem' &&
                item.children &&
                item.children[0] &&
                item.children[0].type === 'thematicBreak'
              ) {
                useDifferentMarker = true;
                break;
              }
            }
          }
        }

        if (useDifferentMarker) {
          bullet = bulletOther;
        }

        context.bulletCurrent = bullet;
        const value = containerFlow(node, context, safeOptions);
        context.bulletLastUsed = bullet;
        context.bulletCurrent = bulletCurrent;
        exit();
        return value;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['listItemIndent'], undefined>}
       */
      function checkListItemIndent(context) {
        const style = context.options.listItemIndent || 'tab';

        // To do: remove in a major.
        // @ts-expect-error: deprecated.
        if (style === 1 || style === '1') {
          return 'one';
        }

        if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
          throw new Error(
            'Cannot serialize items with `' +
              style +
              '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
          );
        }

        return style;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/list-item.js

      /**
       * @typedef {import('mdast').ListItem} ListItem
       * @typedef {import('mdast').List} List
       * @typedef {import('../util/indent-lines.js').Map} Map
       * @typedef {import('../types.js').Options} Options
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {ListItem} node
       */
      function listItem(node, parent, context, safeOptions) {
        const listItemIndent = checkListItemIndent(context);
        let bullet = context.bulletCurrent || checkBullet(context);

        // Add the marker value for ordered lists.
        if (parent && parent.type === 'list' && parent.ordered) {
          bullet =
            (typeof parent.start === 'number' && parent.start > -1
              ? parent.start
              : 1) +
            (context.options.incrementListMarker === false
              ? 0
              : parent.children.indexOf(node)) +
            bullet;
        }

        let size = bullet.length + 1;

        if (
          listItemIndent === 'tab' ||
          (listItemIndent === 'mixed' &&
            ((parent && parent.type === 'list' && parent.spread) ||
              node.spread))
        ) {
          size = Math.ceil(size / 4) * 4;
        }

        const tracker = track(safeOptions);
        tracker.move(bullet + ' '.repeat(size - bullet.length));
        tracker.shift(size);
        const exit = context.enter('listItem');
        const value = indentLines(
          containerFlow(node, context, tracker.current()),
          map
        );
        exit();

        return value;

        /** @type {Map} */
        function map(line, index, blank) {
          if (index) {
            return (blank ? '' : ' '.repeat(size)) + line;
          }

          return (
            (blank ? bullet : bullet + ' '.repeat(size - bullet.length)) + line
          );
        }
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/paragraph.js

      /**
       * @typedef {import('mdast').Paragraph} Paragraph
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {Paragraph} node
       */
      function paragraph(node, _, context, safeOptions) {
        const exit = context.enter('paragraph');
        const subexit = context.enter('phrasing');
        const value = containerPhrasing(node, context, safeOptions);
        subexit();
        exit();
        return value;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/root.js

      /**
       * @typedef {import('mdast').Root} Root
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {Root} node
       */
      function root(node, _, context, safeOptions) {
        return containerFlow(node, context, safeOptions);
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-strong.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['strong'], undefined>}
       */
      function checkStrong(context) {
        const marker = context.options.strong || '*';

        if (marker !== '*' && marker !== '_') {
          throw new Error(
            'Cannot serialize strong with `' +
              marker +
              '` for `options.strong`, expected `*`, or `_`'
          );
        }

        return marker;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/strong.js

      /**
       * @typedef {import('mdast').Strong} Strong
       * @typedef {import('../types.js').Handle} Handle
       */

      strong.peek = strongPeek;

      // To do: there are cases where emphasis cannot “form” depending on the
      // previous or next character of sequences.
      // There’s no way around that though, except for injecting zero-width stuff.
      // Do we need to safeguard against that?
      /**
       * @type {Handle}
       * @param {Strong} node
       */
      function strong(node, _, context, safeOptions) {
        const marker = checkStrong(context);
        const exit = context.enter('strong');
        const tracker = track(safeOptions);
        let value = tracker.move(marker + marker);
        value += tracker.move(
          containerPhrasing(node, context, {
            before: value,
            after: marker,
            ...tracker.current(),
          })
        );
        value += tracker.move(marker + marker);
        exit();
        return value;
      }

      /**
       * @type {Handle}
       * @param {Strong} _
       */
      function strongPeek(_, _1, context) {
        return context.options.strong || '*';
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/text.js

      /**
       * @typedef {import('mdast').Text} Text
       * @typedef {import('../types.js').Handle} Handle
       */

      /**
       * @type {Handle}
       * @param {Text} node
       */
      function handle_text_text(node, _, context, safeOptions) {
        return safe(context, node.value, safeOptions);
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js

      /**
       * @typedef {import('../types.js').Context} Context
       * @typedef {import('../types.js').Options} Options
       */

      /**
       * @param {Context} context
       * @returns {Exclude<Options['ruleRepetition'], undefined>}
       */
      function checkRuleRepetition(context) {
        const repetition = context.options.ruleRepetition || 3;

        if (repetition < 3) {
          throw new Error(
            'Cannot serialize rules with repetition `' +
              repetition +
              '` for `options.ruleRepetition`, expected `3` or more'
          );
        }

        return repetition;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js

      /**
       * @typedef {import('../types.js').Handle} Handle
       * @typedef {import('mdast').ThematicBreak} ThematicBreak
       */

      /**
       * @type {Handle}
       * @param {ThematicBreak} _
       */
      function thematic_break_thematicBreak(_, _1, context) {
        const value = (
          checkRule(context) + (context.options.ruleSpaces ? ' ' : '')
        ).repeat(checkRuleRepetition(context));

        return context.options.ruleSpaces ? value.slice(0, -1) : value;
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/handle/index.js

      const handle = {
        blockquote: blockquote,
        break: hardBreak,
        code: code,
        definition: definition_definition,
        emphasis: emphasis,
        hardBreak: hardBreak,
        heading: heading,
        html: html,
        image: image_image,
        imageReference: imageReference,
        inlineCode: inlineCode,
        link: link_link,
        linkReference: linkReference,
        list: list_list,
        listItem: listItem,
        paragraph: paragraph,
        root: root,
        strong: strong,
        text: handle_text_text,
        thematicBreak: thematic_break_thematicBreak,
      }; // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/join.js

      /**
       * @typedef {import('./types.js').Join} Join
       */

      /** @type {Array<Join>} */
      const join = [joinDefaults];

      /** @type {Join} */
      function joinDefaults(left, right, parent, context) {
        // Indented code after list or another indented code.
        if (
          right.type === 'code' &&
          formatCodeAsIndented(right, context) &&
          (left.type === 'list' ||
            (left.type === right.type && formatCodeAsIndented(left, context)))
        ) {
          return false;
        }

        // Two lists with the same marker.
        if (
          left.type === 'list' &&
          left.type === right.type &&
          Boolean(left.ordered) === Boolean(right.ordered) &&
          !(left.ordered
            ? context.options.bulletOrderedOther
            : context.options.bulletOther)
        ) {
          return false;
        }

        // Join children of a list or an item.
        // In which case, `parent` has a `spread` field.
        if ('spread' in parent && typeof parent.spread === 'boolean') {
          if (
            left.type === 'paragraph' &&
            // Two paragraphs.
            (left.type === right.type ||
              right.type === 'definition' ||
              // Paragraph followed by a setext heading.
              (right.type === 'heading' &&
                formatHeadingAsSetext(right, context)))
          ) {
            return;
          }

          return parent.spread ? 1 : 0;
        }
      } // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/unsafe.js

      /**
       * @typedef {import('./types.js').Unsafe} Unsafe
       */

      /**
       * List of constructs that occur in phrasing (paragraphs, headings), but cannot
       * contain things like attention (emphasis, strong), images, or links.
       * So they sort of cancel each other out.
       * Note: could use a better name.
       */
      const fullPhrasingSpans = [
        'autolink',
        'destinationLiteral',
        'destinationRaw',
        'reference',
        'titleQuote',
        'titleApostrophe',
      ];

      /** @type {Array<Unsafe>} */
      const unsafe = [
        { character: '\t', after: '[\\r\\n]', inConstruct: 'phrasing' },
        { character: '\t', before: '[\\r\\n]', inConstruct: 'phrasing' },
        {
          character: '\t',
          inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde'],
        },
        {
          character: '\r',
          inConstruct: [
            'codeFencedLangGraveAccent',
            'codeFencedLangTilde',
            'codeFencedMetaGraveAccent',
            'codeFencedMetaTilde',
            'destinationLiteral',
            'headingAtx',
          ],
        },
        {
          character: '\n',
          inConstruct: [
            'codeFencedLangGraveAccent',
            'codeFencedLangTilde',
            'codeFencedMetaGraveAccent',
            'codeFencedMetaTilde',
            'destinationLiteral',
            'headingAtx',
          ],
        },
        { character: ' ', after: '[\\r\\n]', inConstruct: 'phrasing' },
        { character: ' ', before: '[\\r\\n]', inConstruct: 'phrasing' },
        {
          character: ' ',
          inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde'],
        },
        // An exclamation mark can start an image, if it is followed by a link or
        // a link reference.
        {
          character: '!',
          after: '\\[',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        // A quote can break out of a title.
        { character: '"', inConstruct: 'titleQuote' },
        // A number sign could start an ATX heading if it starts a line.
        { atBreak: true, character: '#' },
        { character: '#', inConstruct: 'headingAtx', after: '(?:[\r\n]|$)' },
        // Dollar sign and percentage are not used in markdown.
        // An ampersand could start a character reference.
        { character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing' },
        // An apostrophe can break out of a title.
        { character: "'", inConstruct: 'titleApostrophe' },
        // A left paren could break out of a destination raw.
        { character: '(', inConstruct: 'destinationRaw' },
        // A left paren followed by `]` could make something into a link or image.
        {
          before: '\\]',
          character: '(',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        // A right paren could start a list item or break out of a destination
        // raw.
        { atBreak: true, before: '\\d+', character: ')' },
        { character: ')', inConstruct: 'destinationRaw' },
        // An asterisk can start thematic breaks, list items, emphasis, strong.
        { atBreak: true, character: '*' },
        {
          character: '*',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        // A plus sign could start a list item.
        { atBreak: true, character: '+' },
        // A dash can start thematic breaks, list items, and setext heading
        // underlines.
        { atBreak: true, character: '-' },
        // A dot could start a list item.
        {
          atBreak: true,
          before: '\\d+',
          character: '.',
          after: '(?:[ \t\r\n]|$)',
        },
        // Slash, colon, and semicolon are not used in markdown for constructs.
        // A less than can start html (flow or text) or an autolink.
        // HTML could start with an exclamation mark (declaration, cdata, comment),
        // slash (closing tag), question mark (instruction), or a letter (tag).
        // An autolink also starts with a letter.
        // Finally, it could break out of a destination literal.
        { atBreak: true, character: '<', after: '[!/?A-Za-z]' },
        {
          character: '<',
          after: '[!/?A-Za-z]',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        { character: '<', inConstruct: 'destinationLiteral' },
        // An equals to can start setext heading underlines.
        { atBreak: true, character: '=' },
        // A greater than can start block quotes and it can break out of a
        // destination literal.
        { atBreak: true, character: '>' },
        { character: '>', inConstruct: 'destinationLiteral' },
        // Question mark and at sign are not used in markdown for constructs.
        // A left bracket can start definitions, references, labels,
        { atBreak: true, character: '[' },
        {
          character: '[',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        { character: '[', inConstruct: ['label', 'reference'] },
        // A backslash can start an escape (when followed by punctuation) or a
        // hard break (when followed by an eol).
        // Note: typical escapes are handled in `safe`!
        { character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing' },
        // A right bracket can exit labels.
        { character: ']', inConstruct: ['label', 'reference'] },
        // Caret is not used in markdown for constructs.
        // An underscore can start emphasis, strong, or a thematic break.
        { atBreak: true, character: '_' },
        {
          character: '_',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        // A grave accent can start code (fenced or text), or it can break out of
        // a grave accent code fence.
        { atBreak: true, character: '`' },
        {
          character: '`',
          inConstruct: [
            'codeFencedLangGraveAccent',
            'codeFencedMetaGraveAccent',
          ],
        },
        {
          character: '`',
          inConstruct: 'phrasing',
          notInConstruct: fullPhrasingSpans,
        },
        // Left brace, vertical bar, right brace are not used in markdown for
        // constructs.
        // A tilde can start code (fenced).
        { atBreak: true, character: '~' },
      ]; // CONCATENATED MODULE: ./node_modules/mdast-util-to-markdown/lib/index.js

      /**
       * @typedef {import('./types.js').Node} Node
       * @typedef {import('./types.js').Options} Options
       * @typedef {import('./types.js').Context} Context
       * @typedef {import('./types.js').Handle} Handle
       * @typedef {import('./types.js').Join} Join
       * @typedef {import('./types.js').Unsafe} Unsafe
       */

      /**
       * @param {Node} tree
       * @param {Options} [options]
       * @returns {string}
       */
      function toMarkdown(tree, options = {}) {
        /** @type {Context} */
        // @ts-expect-error: we’ll add `handle` later.
        const context = {
          enter,
          stack: [],
          unsafe: [],
          join: [],
          handlers: {},
          options: {},
          indexStack: [],
        };

        configure_configure(context, {
          unsafe: unsafe,
          join: join,
          handlers: handle,
        });
        configure_configure(context, options);

        if (context.options.tightDefinitions) {
          configure_configure(context, { join: [joinDefinition] });
        }

        /** @type {Handle} */
        context.handle = zwitch('type', {
          invalid,
          // @ts-expect-error: hush.
          unknown,
          // @ts-expect-error: hush.
          handlers: context.handlers,
        });

        let result = context.handle(tree, null, context, {
          before: '\n',
          after: '\n',
          now: { line: 1, column: 1 },
          lineShift: 0,
        });

        if (
          result &&
          result.charCodeAt(result.length - 1) !== 10 &&
          result.charCodeAt(result.length - 1) !== 13
        ) {
          result += '\n';
        }

        return result;

        /** @type {Context['enter']} */
        function enter(name) {
          context.stack.push(name);
          return exit;

          function exit() {
            context.stack.pop();
          }
        }
      }

      /**
       * @type {Handle}
       * @param {unknown} value
       */
      function invalid(value) {
        throw new Error('Cannot handle value `' + value + '`, expected node');
      }

      /**
       * @type {Handle}
       * @param {Node} node
       */
      function unknown(node) {
        throw new Error('Cannot handle unknown node `' + node.type + '`');
      }

      /** @type {Join} */
      function joinDefinition(left, right) {
        // No blank line between adjacent definitions.
        if (left.type === 'definition' && left.type === right.type) {
          return 0;
        }
      } // CONCATENATED MODULE: ./node_modules/remark-stringify/lib/index.js

      /**
       * @typedef {import('mdast').Root|import('mdast').Content} Node
       * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownOptions
       * @typedef {Omit<ToMarkdownOptions, 'extensions'>} Options
       */

      /** @type {import('unified').Plugin<[Options]|void[], Node, string>} */
      function remarkStringify(options) {
        /** @type {import('unified').CompilerFunction<Node, string>} */
        const compiler = (tree) => {
          // Assume options.
          const settings = /** @type {Options} */ (this.data('settings'));

          return toMarkdown(
            tree,
            Object.assign({}, settings, options, {
              // Note: this option is not in the readme.
              // The goal is for it to be set by plugins on `data` instead of being
              // passed by users.
              extensions:
                /** @type {ToMarkdownOptions['extensions']} */ (
                  this.data('toMarkdownExtensions')
                ) || [],
            })
          );
        };

        Object.assign(this, { Compiler: compiler });
      } // CONCATENATED MODULE: ./node_modules/remark-stringify/index.js

      /* harmony default export */ const remark_stringify = remarkStringify; // CONCATENATED MODULE: ./node_modules/remark/index.js

      const remark = unified().use(remark_parse).use(remark_stringify).freeze();

      /***/
    },

    /***/ 1481: /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __nccwpck_require__
    ) => {
      'use strict';
      /* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
        /* harmony export */ O: () => /* binding */ convert,
        /* harmony export */
      });
      /* unused harmony export is */
      /**
       * @typedef {import('unist').Node} Node
       * @typedef {import('unist').Parent} Parent
       *
       * @typedef {string} Type
       * @typedef {Object<string, unknown>} Props
       *
       * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
       */

      /**
       * Check if a node passes a test
       *
       * @callback TestFunctionAnything
       * @param {Node} node
       * @param {number|null|undefined} [index]
       * @param {Parent|null|undefined} [parent]
       * @returns {boolean|void}
       */

      /**
       * Check if a node passes a certain node test
       *
       * @template {Node} X
       * @callback TestFunctionPredicate
       * @param {Node} node
       * @param {number|null|undefined} [index]
       * @param {Parent|null|undefined} [parent]
       * @returns {node is X}
       */

      /**
       * @callback AssertAnything
       * @param {unknown} [node]
       * @param {number|null|undefined} [index]
       * @param {Parent|null|undefined} [parent]
       * @returns {boolean}
       */

      /**
       * Check if a node passes a certain node test
       *
       * @template {Node} Y
       * @callback AssertPredicate
       * @param {unknown} [node]
       * @param {number|null|undefined} [index]
       * @param {Parent|null|undefined} [parent]
       * @returns {node is Y}
       */

      const is =
        /**
         * Check if a node passes a test.
         * When a `parent` node is known the `index` of node should also be given.
         *
         * @type {(
         *   (<T extends Node>(node: unknown, test: T['type']|Partial<T>|TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|TestFunctionPredicate<T>>, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => node is T) &
         *   ((node?: unknown, test?: Test, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => boolean)
         * )}
         */
        (
          /**
           * Check if a node passes a test.
           * When a `parent` node is known the `index` of node should also be given.
           *
           * @param {unknown} [node] Node to check
           * @param {Test} [test]
           * When nullish, checks if `node` is a `Node`.
           * When `string`, works like passing `function (node) {return node.type === test}`.
           * When `function` checks if function passed the node is true.
           * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
           * When `array`, checks any one of the subtests pass.
           * @param {number|null|undefined} [index] Position of `node` in `parent`
           * @param {Parent|null|undefined} [parent] Parent of `node`
           * @param {unknown} [context] Context object to invoke `test` with
           * @returns {boolean} Whether test passed and `node` is a `Node` (object with `type` set to non-empty `string`).
           */
          // eslint-disable-next-line max-params
          function is(node, test, index, parent, context) {
            const check = convert(test);

            if (
              index !== undefined &&
              index !== null &&
              (typeof index !== 'number' ||
                index < 0 ||
                index === Number.POSITIVE_INFINITY)
            ) {
              throw new Error('Expected positive finite index');
            }

            if (
              parent !== undefined &&
              parent !== null &&
              (!is(parent) || !parent.children)
            ) {
              throw new Error('Expected parent node');
            }

            if (
              (parent === undefined || parent === null) !==
              (index === undefined || index === null)
            ) {
              throw new Error('Expected both parent and index');
            }

            // @ts-expect-error Looks like a node.
            return node && node.type && typeof node.type === 'string'
              ? Boolean(check.call(context, node, index, parent))
              : false;
          }
        );

      const convert =
        /**
         * @type {(
         *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
         *   ((test?: Test) => AssertAnything)
         * )}
         */
        (
          /**
           * Generate an assertion from a check.
           * @param {Test} [test]
           * When nullish, checks if `node` is a `Node`.
           * When `string`, works like passing `function (node) {return node.type === test}`.
           * When `function` checks if function passed the node is true.
           * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
           * When `array`, checks any one of the subtests pass.
           * @returns {AssertAnything}
           */
          function (test) {
            if (test === undefined || test === null) {
              return ok;
            }

            if (typeof test === 'string') {
              return typeFactory(test);
            }

            if (typeof test === 'object') {
              return Array.isArray(test)
                ? anyFactory(test)
                : propsFactory(test);
            }

            if (typeof test === 'function') {
              return castFactory(test);
            }

            throw new Error('Expected function, string, or object as test');
          }
        );
      /**
       * @param {Array.<Type|Props|TestFunctionAnything>} tests
       * @returns {AssertAnything}
       */
      function anyFactory(tests) {
        /** @type {Array.<AssertAnything>} */
        const checks = [];
        let index = -1;

        while (++index < tests.length) {
          checks[index] = convert(tests[index]);
        }

        return castFactory(any);

        /**
         * @this {unknown}
         * @param {unknown[]} parameters
         * @returns {boolean}
         */
        function any(...parameters) {
          let index = -1;

          while (++index < checks.length) {
            if (checks[index].call(this, ...parameters)) return true;
          }

          return false;
        }
      }

      /**
       * Utility to assert each property in `test` is represented in `node`, and each
       * values are strictly equal.
       *
       * @param {Props} check
       * @returns {AssertAnything}
       */
      function propsFactory(check) {
        return castFactory(all);

        /**
         * @param {Node} node
         * @returns {boolean}
         */
        function all(node) {
          /** @type {string} */
          let key;

          for (key in check) {
            // @ts-expect-error: hush, it sure works as an index.
            if (node[key] !== check[key]) return false;
          }

          return true;
        }
      }

      /**
       * Utility to convert a string into a function which checks a given node’s type
       * for said string.
       *
       * @param {Type} check
       * @returns {AssertAnything}
       */
      function typeFactory(check) {
        return castFactory(type);

        /**
         * @param {Node} node
         */
        function type(node) {
          return node && node.type === check;
        }
      }

      /**
       * Utility to convert a string into a function which checks a given node’s type
       * for said string.
       * @param {TestFunctionAnything} check
       * @returns {AssertAnything}
       */
      function castFactory(check) {
        return assertion;

        /**
         * @this {unknown}
         * @param {Array.<unknown>} parameters
         * @returns {boolean}
         */
        function assertion(...parameters) {
          // @ts-expect-error: spreading is fine.
          return Boolean(check.call(this, ...parameters));
        }
      }

      // Utility to return true.
      function ok() {
        return true;
      }

      /***/
    },

    /***/ 3558: /***/ (module) => {
      'use strict';
      module.exports = { i8: '3.1.7' };

      /***/
    },

    /******/
  }; // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {}; // The require function
  /******/
  /******/ /******/ function __nccwpck_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ var threw = true;
    /******/ try {
      /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __nccwpck_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete __webpack_module_cache__[moduleId];
      /******/
    } // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } /* webpack/runtime/define property getters */
  /******/
  /************************************************************************/
  /******/ /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __nccwpck_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __nccwpck_require__.o(definition, key) &&
          !__nccwpck_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })(); /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  /******/ /******/ (() => {
    /******/ __nccwpck_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })(); /* webpack/runtime/make namespace object */
  /******/
  /******/ /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __nccwpck_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })(); /* webpack/runtime/compat */
  /******/
  /******/ /******/
  /******/ if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'; // startup // Load entry module and return exports // This entry module is referenced by other modules so it can't be inlined
  /******/
  /************************************************************************/
  /******/
  /******/ /******/ /******/ /******/ var __webpack_exports__ =
    __nccwpck_require__(6144);
  /******/ module.exports = __webpack_exports__;
  /******/
  /******/
})();
