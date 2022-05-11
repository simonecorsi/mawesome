/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 7351: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
          result['default'] = mod;
          return result;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
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
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
          result['default'] = mod;
          return result;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      const command_1 = __nccwpck_require__(7351);
      const file_command_1 = __nccwpck_require__(717);
      const utils_1 = __nccwpck_require__(5278);
      const os = __importStar(__nccwpck_require__(2037));
      const path = __importStar(__nccwpck_require__(1017));
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
       * Gets the value of an input.  The value is also trimmed.
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
        return val.trim();
      }
      exports.getInput = getInput;
      /**
       * Sets the value of an output.
       *
       * @param     name     name of the output to set
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function setOutput(name, value) {
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
       */
      function error(message) {
        command_1.issue(
          'error',
          message instanceof Error ? message.toString() : message
        );
      }
      exports.error = error;
      /**
       * Adds an warning issue
       * @param message warning issue message. Errors will be converted to string via toString()
       */
      function warning(message) {
        command_1.issue(
          'warning',
          message instanceof Error ? message.toString() : message
        );
      }
      exports.warning = warning;
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
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
          result['default'] = mod;
          return result;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
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

    /***/ 5278: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      // We use any as a valid input type
      /* eslint-disable @typescript-eslint/no-explicit-any */
      Object.defineProperty(exports, '__esModule', { value: true });
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
      const child = __importStar(__nccwpck_require__(8493));
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
      const childProcess = __nccwpck_require__(8493);
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

    /***/ 7240: /***/ (module) => {
      'use strict';

      module.exports = bail;

      function bail(err) {
        if (err) {
          throw err;
        }
      }

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
      var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat(
        'cache'
      );
      var _BOM = /^\uFEFF/;

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
        var opts = utils.shallowCopy({}, options);
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
        var data = d || {};
        var opts = o || {};

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
          data = {};
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
        opts = opts || {};
        var options = {};
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
              prepended +=
                '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring =
                '  var __locals = (' + opts.localsName + ' || {}),\n';
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
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
                  var d = utils.shallowCopy({}, data);
                  if (includeData) {
                    d = utils.shallowCopy(d, includeData);
                  }
                  return includeFile(path, opts)(d);
                };
                return fn.apply(opts.context, [
                  data || {},
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
        for (var p in from) {
          to[p] = from[p];
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
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          if (typeof from[p] != 'undefined') {
            to[p] = from[p];
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

    /***/ 237: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      var emoji = __nccwpck_require__(5464);

      module.exports = BananaSlug;

      var own = Object.hasOwnProperty;
      var whitespace = /\s/g;
      var specials = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;

      function BananaSlug() {
        var self = this;

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
        var self = this;
        var slug = slugger(value, maintainCase === true);
        var originalSlug = slug;

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

        return string
          .trim()
          .replace(specials, '')
          .replace(emoji(), '')
          .replace(whitespace, '-');
      }

      BananaSlug.slug = slugger;

      /***/
    },

    /***/ 5464: /***/ (module) => {
      module.exports = function () {
        return /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C\uDDFE\uD83C[\uDDEA\uDDF9]|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDFC\uD83C[\uDDEB\uDDF8]|\uD83C\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uD83C\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF8\uDDFE\uDDFF]|\uD83C\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uD83C\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uD83C\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uD83C\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uD83C\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uD83C\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uD83C\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uD83C\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uD83C\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uD83C\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uD83C\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uD83C\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uD83C\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uD83C\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uD83C\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uD83C\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|[#\*0-9]\u20E3/g;
      };

      /***/
    },

    /***/ 4232: /***/ (module) => {
      'use strict';

      module.exports = longestStreak;

      // Get the count of the longest repeating streak of `character` in `value`.
      function longestStreak(value, character) {
        var count = 0;
        var maximum = 0;
        var expected;
        var index;

        if (typeof character !== 'string' || character.length !== 1) {
          throw new Error('Expected character');
        }

        value = String(value);
        index = value.indexOf(character);
        expected = index;

        while (index !== -1) {
          count++;

          if (index === expected) {
            if (count > maximum) {
              maximum = count;
            }
          } else {
            count = 1;
          }

          expected = index + 1;
          index = value.indexOf(character, expected);
        }

        return maximum;
      }

      /***/
    },

    /***/ 6869: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = fromMarkdown;

      // These three are compiled away in the `dist/`

      var toString = __nccwpck_require__(5789);
      var assign = __nccwpck_require__(3512);
      var own = __nccwpck_require__(3500);
      var normalizeIdentifier = __nccwpck_require__(712);
      var safeFromInt = __nccwpck_require__(6214);
      var parser = __nccwpck_require__(488);
      var preprocessor = __nccwpck_require__(5603);
      var postprocess = __nccwpck_require__(6948);
      var decode = __nccwpck_require__(3485);
      var stringifyPosition = __nccwpck_require__(1957);

      function fromMarkdown(value, encoding, options) {
        if (typeof encoding !== 'string') {
          options = encoding;
          encoding = undefined;
        }

        return compiler(options)(
          postprocess(
            parser(options)
              .document()
              .write(preprocessor()(value, encoding, true))
          )
        );
      }

      // Note this compiler only understand complete buffering, not streaming.
      function compiler(options) {
        var settings = options || {};
        var config = configure(
          {
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
              characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
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

          settings.mdastExtensions || []
        );

        var data = {};

        return compile;

        function compile(events) {
          var stack = [{ type: 'root', children: [] }];
          var tokenStack = [];
          var listStack = [];
          var index = -1;
          var handler;
          var listStart;

          var context = {
            stack: stack,
            tokenStack: tokenStack,
            config: config,
            enter: enter,
            exit: exit,
            buffer: buffer,
            resume: resume,
            setData: setData,
            getData: getData,
          };

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
                listStart = listStack.pop(index);
                index = prepareList(events, listStart, index);
              }
            }
          }

          index = -1;

          while (++index < events.length) {
            handler = config[events[index][0]];

            if (own.call(handler, events[index][1].type)) {
              handler[events[index][1].type].call(
                assign(
                  { sliceSerialize: events[index][2].sliceSerialize },
                  context
                ),
                events[index][1]
              );
            }
          }

          if (tokenStack.length) {
            throw new Error(
              'Cannot close document, a token (`' +
                tokenStack[tokenStack.length - 1].type +
                '`, ' +
                stringifyPosition({
                  start: tokenStack[tokenStack.length - 1].start,
                  end: tokenStack[tokenStack.length - 1].end,
                }) +
                ') is still open'
            );
          }

          // Figure out `root` position.
          stack[0].position = {
            start: point(
              events.length
                ? events[0][1].start
                : { line: 1, column: 1, offset: 0 }
            ),

            end: point(
              events.length
                ? events[events.length - 2][1].end
                : { line: 1, column: 1, offset: 0 }
            ),
          };

          return stack[0];
        }

        function prepareList(events, start, length) {
          var index = start - 1;
          var containerBalance = -1;
          var listSpread = false;
          var listItem;
          var tailIndex;
          var lineIndex;
          var tailEvent;
          var event;
          var firstBlankLineIndex;
          var atMarker;

          while (++index <= length) {
            event = events[index];

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
                tailIndex = index;
                lineIndex = undefined;

                while (tailIndex--) {
                  tailEvent = events[tailIndex];

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
                  listItem._spread = true;
                }

                // Fix position.
                listItem.end = point(
                  lineIndex ? events[lineIndex][1].start : event[1].end
                );

                events.splice(lineIndex || index, 0, [
                  'exit',
                  listItem,
                  event[2],
                ]);
                index++;
                length++;
              }

              // Create a new list item.
              if (event[1].type === 'listItemPrefix') {
                listItem = {
                  type: 'listItem',
                  _spread: false,
                  start: point(event[1].start),
                };

                events.splice(index, 0, ['enter', listItem, event[2]]);
                index++;
                length++;
                firstBlankLineIndex = undefined;
                atMarker = true;
              }
            }
          }

          events[start][1]._spread = listSpread;
          return length;
        }

        function setData(key, value) {
          data[key] = value;
        }

        function getData(key) {
          return data[key];
        }

        function point(d) {
          return { line: d.line, column: d.column, offset: d.offset };
        }

        function opener(create, and) {
          return open;

          function open(token) {
            enter.call(this, create(token), token);
            if (and) and.call(this, token);
          }
        }

        function buffer() {
          this.stack.push({ type: 'fragment', children: [] });
        }

        function enter(node, token) {
          this.stack[this.stack.length - 1].children.push(node);
          this.stack.push(node);
          this.tokenStack.push(token);
          node.position = { start: point(token.start) };
          return node;
        }

        function closer(and) {
          return close;

          function close(token) {
            if (and) and.call(this, token);
            exit.call(this, token);
          }
        }

        function exit(token) {
          var node = this.stack.pop();
          var open = this.tokenStack.pop();

          if (!open) {
            throw new Error(
              'Cannot close `' +
                token.type +
                '` (' +
                stringifyPosition({ start: token.start, end: token.end }) +
                '): it’s not open'
            );
          } else if (open.type !== token.type) {
            throw new Error(
              'Cannot close `' +
                token.type +
                '` (' +
                stringifyPosition({ start: token.start, end: token.end }) +
                '): a different token (`' +
                open.type +
                '`, ' +
                stringifyPosition({ start: open.start, end: open.end }) +
                ') is open'
            );
          }

          node.position.end = point(token.end);
          return node;
        }

        function resume() {
          return toString(this.stack.pop());
        }

        //
        // Handlers.
        //

        function onenterlistordered() {
          setData('expectingFirstListItemValue', true);
        }

        function onenterlistitemvalue(token) {
          if (getData('expectingFirstListItemValue')) {
            this.stack[this.stack.length - 2].start = parseInt(
              this.sliceSerialize(token),
              10
            );

            setData('expectingFirstListItemValue');
          }
        }

        function onexitcodefencedfenceinfo() {
          var data = this.resume();
          this.stack[this.stack.length - 1].lang = data;
        }

        function onexitcodefencedfencemeta() {
          var data = this.resume();
          this.stack[this.stack.length - 1].meta = data;
        }

        function onexitcodefencedfence() {
          // Exit if this is the closing fence.
          if (getData('flowCodeInside')) return;
          this.buffer();
          setData('flowCodeInside', true);
        }

        function onexitcodefenced() {
          var data = this.resume();
          this.stack[this.stack.length - 1].value = data.replace(
            /^(\r?\n|\r)|(\r?\n|\r)$/g,
            ''
          );

          setData('flowCodeInside');
        }

        function onexitcodeindented() {
          var data = this.resume();
          this.stack[this.stack.length - 1].value = data;
        }

        function onexitdefinitionlabelstring(token) {
          // Discard label, use the source content instead.
          var label = this.resume();
          this.stack[this.stack.length - 1].label = label;
          this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
            this.sliceSerialize(token)
          ).toLowerCase();
        }

        function onexitdefinitiontitlestring() {
          var data = this.resume();
          this.stack[this.stack.length - 1].title = data;
        }

        function onexitdefinitiondestinationstring() {
          var data = this.resume();
          this.stack[this.stack.length - 1].url = data;
        }

        function onexitatxheadingsequence(token) {
          if (!this.stack[this.stack.length - 1].depth) {
            this.stack[this.stack.length - 1].depth = this.sliceSerialize(
              token
            ).length;
          }
        }

        function onexitsetextheadingtext() {
          setData('setextHeadingSlurpLineEnding', true);
        }

        function onexitsetextheadinglinesequence(token) {
          this.stack[this.stack.length - 1].depth =
            this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
        }

        function onexitsetextheading() {
          setData('setextHeadingSlurpLineEnding');
        }

        function onenterdata(token) {
          var siblings = this.stack[this.stack.length - 1].children;
          var tail = siblings[siblings.length - 1];

          if (!tail || tail.type !== 'text') {
            // Add a new text node.
            tail = text();
            tail.position = { start: point(token.start) };
            this.stack[this.stack.length - 1].children.push(tail);
          }

          this.stack.push(tail);
        }

        function onexitdata(token) {
          var tail = this.stack.pop();
          tail.value += this.sliceSerialize(token);
          tail.position.end = point(token.end);
        }

        function onexitlineending(token) {
          var context = this.stack[this.stack.length - 1];

          // If we’re at a hard break, include the line ending in there.
          if (getData('atHardBreak')) {
            context.children[context.children.length - 1].position.end = point(
              token.end
            );

            setData('atHardBreak');
            return;
          }

          if (
            !getData('setextHeadingSlurpLineEnding') &&
            config.canContainEols.indexOf(context.type) > -1
          ) {
            onenterdata.call(this, token);
            onexitdata.call(this, token);
          }
        }

        function onexithardbreak() {
          setData('atHardBreak', true);
        }

        function onexithtmlflow() {
          var data = this.resume();
          this.stack[this.stack.length - 1].value = data;
        }

        function onexithtmltext() {
          var data = this.resume();
          this.stack[this.stack.length - 1].value = data;
        }

        function onexitcodetext() {
          var data = this.resume();
          this.stack[this.stack.length - 1].value = data;
        }

        function onexitlink() {
          var context = this.stack[this.stack.length - 1];

          // To do: clean.
          if (getData('inReference')) {
            context.type += 'Reference';
            context.referenceType = getData('referenceType') || 'shortcut';
            delete context.url;
            delete context.title;
          } else {
            delete context.identifier;
            delete context.label;
            delete context.referenceType;
          }

          setData('referenceType');
        }

        function onexitimage() {
          var context = this.stack[this.stack.length - 1];

          // To do: clean.
          if (getData('inReference')) {
            context.type += 'Reference';
            context.referenceType = getData('referenceType') || 'shortcut';
            delete context.url;
            delete context.title;
          } else {
            delete context.identifier;
            delete context.label;
            delete context.referenceType;
          }

          setData('referenceType');
        }

        function onexitlabeltext(token) {
          this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
            this.sliceSerialize(token)
          ).toLowerCase();
        }

        function onexitlabel() {
          var fragment = this.stack[this.stack.length - 1];
          var value = this.resume();

          this.stack[this.stack.length - 1].label = value;

          // Assume a reference.
          setData('inReference', true);

          if (this.stack[this.stack.length - 1].type === 'link') {
            this.stack[this.stack.length - 1].children = fragment.children;
          } else {
            this.stack[this.stack.length - 1].alt = value;
          }
        }

        function onexitresourcedestinationstring() {
          var data = this.resume();
          this.stack[this.stack.length - 1].url = data;
        }

        function onexitresourcetitlestring() {
          var data = this.resume();
          this.stack[this.stack.length - 1].title = data;
        }

        function onexitresource() {
          setData('inReference');
        }

        function onenterreference() {
          setData('referenceType', 'collapsed');
        }

        function onexitreferencestring(token) {
          var label = this.resume();
          this.stack[this.stack.length - 1].label = label;
          this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
            this.sliceSerialize(token)
          ).toLowerCase();
          setData('referenceType', 'full');
        }

        function onexitcharacterreferencemarker(token) {
          setData('characterReferenceType', token.type);
        }

        function onexitcharacterreferencevalue(token) {
          var data = this.sliceSerialize(token);
          var type = getData('characterReferenceType');
          var value;
          var tail;

          if (type) {
            value = safeFromInt(
              data,
              type === 'characterReferenceMarkerNumeric' ? 10 : 16
            );

            setData('characterReferenceType');
          } else {
            value = decode(data);
          }

          tail = this.stack.pop();
          tail.value += value;
          tail.position.end = point(token.end);
        }

        function onexitautolinkprotocol(token) {
          onexitdata.call(this, token);
          this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
        }

        function onexitautolinkemail(token) {
          onexitdata.call(this, token);
          this.stack[this.stack.length - 1].url =
            'mailto:' + this.sliceSerialize(token);
        }

        //
        // Creaters.
        //

        function blockQuote() {
          return { type: 'blockquote', children: [] };
        }

        function codeFlow() {
          return { type: 'code', lang: null, meta: null, value: '' };
        }

        function codeText() {
          return { type: 'inlineCode', value: '' };
        }

        function definition() {
          return {
            type: 'definition',
            identifier: '',
            label: null,
            title: null,
            url: '',
          };
        }

        function emphasis() {
          return { type: 'emphasis', children: [] };
        }

        function heading() {
          return { type: 'heading', depth: undefined, children: [] };
        }

        function hardBreak() {
          return { type: 'break' };
        }

        function html() {
          return { type: 'html', value: '' };
        }

        function image() {
          return { type: 'image', title: null, url: '', alt: null };
        }

        function link() {
          return { type: 'link', title: null, url: '', children: [] };
        }

        function list(token) {
          return {
            type: 'list',
            ordered: token.type === 'listOrdered',
            start: null,
            spread: token._spread,
            children: [],
          };
        }

        function listItem(token) {
          return {
            type: 'listItem',
            spread: token._spread,
            checked: null,
            children: [],
          };
        }

        function paragraph() {
          return { type: 'paragraph', children: [] };
        }

        function strong() {
          return { type: 'strong', children: [] };
        }

        function text() {
          return { type: 'text', value: '' };
        }

        function thematicBreak() {
          return { type: 'thematicBreak' };
        }
      }

      function configure(config, extensions) {
        var index = -1;

        while (++index < extensions.length) {
          extension(config, extensions[index]);
        }

        return config;
      }

      function extension(config, extension) {
        var key;
        var left;

        for (key in extension) {
          left = own.call(config, key) ? config[key] : (config[key] = {});

          if (key === 'canContainEols') {
            config[key] = [].concat(left, extension[key]);
          } else {
            Object.assign(left, extension[key]);
          }
        }
      }

      /***/
    },

    /***/ 3068: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = __nccwpck_require__(6869);

      /***/
    },

    /***/ 219: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = __nccwpck_require__(3683);

      /***/
    },

    /***/ 9363: /***/ (module) => {
      module.exports = configure;

      function configure(base, extension) {
        var index = -1;
        var key;

        // First do subextensions.
        if (extension.extensions) {
          while (++index < extension.extensions.length) {
            configure(base, extension.extensions[index]);
          }
        }

        for (key in extension) {
          if (key === 'extensions') {
            // Empty.
          } else if (key === 'unsafe' || key === 'join') {
            base[key] = base[key].concat(extension[key] || []);
          } else if (key === 'handlers') {
            base[key] = Object.assign(base[key], extension[key] || {});
          } else {
            base.options[key] = extension[key];
          }
        }

        return base;
      }

      /***/
    },

    /***/ 3920: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = blockquote;

      var flow = __nccwpck_require__(7530);
      var indentLines = __nccwpck_require__(6887);

      function blockquote(node, _, context) {
        var exit = context.enter('blockquote');
        var value = indentLines(flow(node, context), map);
        exit();
        return value;
      }

      function map(line, index, blank) {
        return '>' + (blank ? '' : ' ') + line;
      }

      /***/
    },

    /***/ 229: /***/ (module) => {
      module.exports = hardBreak;

      function hardBreak() {
        return '\\\n';
      }

      /***/
    },

    /***/ 5268: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = code;

      var repeat = __nccwpck_require__(6976);
      var streak = __nccwpck_require__(4232);
      var formatCodeAsIndented = __nccwpck_require__(8446);
      var checkFence = __nccwpck_require__(158);
      var indentLines = __nccwpck_require__(6887);
      var safe = __nccwpck_require__(3906);

      function code(node, _, context) {
        var marker = checkFence(context);
        var raw = node.value || '';
        var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
        var value;
        var sequence;
        var exit;
        var subexit;

        if (formatCodeAsIndented(node, context)) {
          exit = context.enter('codeIndented');
          value = indentLines(raw, map);
        } else {
          sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3));
          exit = context.enter('codeFenced');
          value = sequence;

          if (node.lang) {
            subexit = context.enter('codeFencedLang' + suffix);
            value += safe(context, node.lang, {
              before: '`',
              after: ' ',
              encode: ['`'],
            });
            subexit();
          }

          if (node.lang && node.meta) {
            subexit = context.enter('codeFencedMeta' + suffix);
            value +=
              ' ' +
              safe(context, node.meta, {
                before: ' ',
                after: '\n',
                encode: ['`'],
              });
            subexit();
          }

          value += '\n';

          if (raw) {
            value += raw + '\n';
          }

          value += sequence;
        }

        exit();
        return value;
      }

      function map(line, _, blank) {
        return (blank ? '' : '    ') + line;
      }

      /***/
    },

    /***/ 7385: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = definition;

      var association = __nccwpck_require__(9211);
      var checkQuote = __nccwpck_require__(3366);
      var safe = __nccwpck_require__(3906);

      function definition(node, _, context) {
        var marker = checkQuote(context);
        var suffix = marker === '"' ? 'Quote' : 'Apostrophe';
        var exit = context.enter('definition');
        var subexit = context.enter('label');
        var value =
          '[' +
          safe(context, association(node), { before: '[', after: ']' }) +
          ']: ';

        subexit();

        if (
          // If there’s no url, or…
          !node.url ||
          // If there’s whitespace, enclosed is prettier.
          /[ \t\r\n]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value +=
            '<' + safe(context, node.url, { before: '<', after: '>' }) + '>';
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += safe(context, node.url, { before: ' ', after: ' ' });
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value +=
            ' ' +
            marker +
            safe(context, node.title, { before: marker, after: marker }) +
            marker;
          subexit();
        }

        exit();

        return value;
      }

      /***/
    },

    /***/ 8909: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = emphasis;
      emphasis.peek = emphasisPeek;

      var checkEmphasis = __nccwpck_require__(6452);
      var phrasing = __nccwpck_require__(7489);

      // To do: there are cases where emphasis cannot “form” depending on the
      // previous or next character of sequences.
      // There’s no way around that though, except for injecting zero-width stuff.
      // Do we need to safeguard against that?
      function emphasis(node, _, context) {
        var marker = checkEmphasis(context);
        var exit = context.enter('emphasis');
        var value = phrasing(node, context, { before: marker, after: marker });
        exit();
        return marker + value + marker;
      }

      function emphasisPeek(node, _, context) {
        return context.options.emphasis || '*';
      }

      /***/
    },

    /***/ 2568: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = heading;

      var repeat = __nccwpck_require__(6976);
      var formatHeadingAsSetext = __nccwpck_require__(4954);
      var phrasing = __nccwpck_require__(7489);

      function heading(node, _, context) {
        var rank = Math.max(Math.min(6, node.depth || 1), 1);
        var exit;
        var subexit;
        var value;
        var sequence;

        if (formatHeadingAsSetext(node, context)) {
          exit = context.enter('headingSetext');
          subexit = context.enter('phrasing');
          value = phrasing(node, context, { before: '\n', after: '\n' });
          subexit();
          exit();

          return (
            value +
            '\n' +
            repeat(
              rank === 1 ? '=' : '-',
              // The whole size…
              value.length -
                // Minus the position of the character after the last EOL (or
                // 0 if there is none)…
                (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
            )
          );
        }

        sequence = repeat('#', rank);
        exit = context.enter('headingAtx');
        subexit = context.enter('phrasing');
        value = phrasing(node, context, { before: '# ', after: '\n' });
        value = value ? sequence + ' ' + value : sequence;
        if (context.options.closeAtx) {
          value += ' ' + sequence;
        }

        subexit();
        exit();

        return value;
      }

      /***/
    },

    /***/ 5538: /***/ (module) => {
      module.exports = html;

      function html(node) {
        return node.value || '';
      }

      /***/
    },

    /***/ 3885: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = imageReference;
      imageReference.peek = imageReferencePeek;

      var association = __nccwpck_require__(9211);
      var safe = __nccwpck_require__(3906);

      function imageReference(node, _, context) {
        var type = node.referenceType;
        var exit = context.enter('imageReference');
        var subexit = context.enter('label');
        var alt = safe(context, node.alt, { before: '[', after: ']' });
        var value = '![' + alt + ']';
        var reference;
        var stack;

        subexit();
        // Hide the fact that we’re in phrasing, because escapes don’t work.
        stack = context.stack;
        context.stack = [];
        subexit = context.enter('reference');
        reference = safe(context, association(node), {
          before: '[',
          after: ']',
        });
        subexit();
        context.stack = stack;
        exit();

        if (type === 'full' || !alt || alt !== reference) {
          value += '[' + reference + ']';
        } else if (type !== 'shortcut') {
          value += '[]';
        }

        return value;
      }

      function imageReferencePeek() {
        return '!';
      }

      /***/
    },

    /***/ 1591: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = image;
      image.peek = imagePeek;

      var checkQuote = __nccwpck_require__(3366);
      var safe = __nccwpck_require__(3906);

      function image(node, _, context) {
        var quote = checkQuote(context);
        var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
        var exit = context.enter('image');
        var subexit = context.enter('label');
        var value =
          '![' + safe(context, node.alt, { before: '[', after: ']' }) + '](';

        subexit();

        if (
          // If there’s no url but there is a title…
          (!node.url && node.title) ||
          // Or if there’s markdown whitespace or an eol, enclose.
          /[ \t\r\n]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value +=
            '<' + safe(context, node.url, { before: '<', after: '>' }) + '>';
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += safe(context, node.url, {
            before: '(',
            after: node.title ? ' ' : ')',
          });
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value +=
            ' ' +
            quote +
            safe(context, node.title, { before: quote, after: quote }) +
            quote;
          subexit();
        }

        value += ')';
        exit();

        return value;
      }

      function imagePeek() {
        return '!';
      }

      /***/
    },

    /***/ 3769: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      exports.blockquote = __nccwpck_require__(3920);
      exports['break'] = __nccwpck_require__(229);
      exports.code = __nccwpck_require__(5268);
      exports.definition = __nccwpck_require__(7385);
      exports.emphasis = __nccwpck_require__(8909);
      exports.hardBreak = __nccwpck_require__(229);
      exports.heading = __nccwpck_require__(2568);
      exports.html = __nccwpck_require__(5538);
      exports.image = __nccwpck_require__(1591);
      exports.imageReference = __nccwpck_require__(3885);
      exports.inlineCode = __nccwpck_require__(5645);
      exports.link = __nccwpck_require__(7938);
      exports.linkReference = __nccwpck_require__(9556);
      exports.list = __nccwpck_require__(9323);
      exports.listItem = __nccwpck_require__(7016);
      exports.paragraph = __nccwpck_require__(5197);
      exports.root = __nccwpck_require__(54);
      exports.strong = __nccwpck_require__(2150);
      exports.text = __nccwpck_require__(2124);
      exports.thematicBreak = __nccwpck_require__(3960);

      /***/
    },

    /***/ 5645: /***/ (module) => {
      module.exports = inlineCode;
      inlineCode.peek = inlineCodePeek;

      function inlineCode(node) {
        var value = node.value || '';
        var sequence = '`';
        var pad = '';

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
          (/[ \r\n`]/.test(value.charAt(0)) ||
            /[ \r\n`]/.test(value.charAt(value.length - 1)))
        ) {
          pad = ' ';
        }

        return sequence + pad + value + pad + sequence;
      }

      function inlineCodePeek() {
        return '`';
      }

      /***/
    },

    /***/ 9556: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = linkReference;
      linkReference.peek = linkReferencePeek;

      var association = __nccwpck_require__(9211);
      var phrasing = __nccwpck_require__(7489);
      var safe = __nccwpck_require__(3906);

      function linkReference(node, _, context) {
        var type = node.referenceType;
        var exit = context.enter('linkReference');
        var subexit = context.enter('label');
        var text = phrasing(node, context, { before: '[', after: ']' });
        var value = '[' + text + ']';
        var reference;
        var stack;

        subexit();
        // Hide the fact that we’re in phrasing, because escapes don’t work.
        stack = context.stack;
        context.stack = [];
        subexit = context.enter('reference');
        reference = safe(context, association(node), {
          before: '[',
          after: ']',
        });
        subexit();
        context.stack = stack;
        exit();

        if (type === 'full' || !text || text !== reference) {
          value += '[' + reference + ']';
        } else if (type !== 'shortcut') {
          value += '[]';
        }

        return value;
      }

      function linkReferencePeek() {
        return '[';
      }

      /***/
    },

    /***/ 7938: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = link;
      link.peek = linkPeek;

      var checkQuote = __nccwpck_require__(3366);
      var formatLinkAsAutolink = __nccwpck_require__(5358);
      var phrasing = __nccwpck_require__(7489);
      var safe = __nccwpck_require__(3906);

      function link(node, _, context) {
        var quote = checkQuote(context);
        var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
        var exit;
        var subexit;
        var value;
        var stack;

        if (formatLinkAsAutolink(node, context)) {
          // Hide the fact that we’re in phrasing, because escapes don’t work.
          stack = context.stack;
          context.stack = [];
          exit = context.enter('autolink');
          value =
            '<' + phrasing(node, context, { before: '<', after: '>' }) + '>';
          exit();
          context.stack = stack;
          return value;
        }

        exit = context.enter('link');
        subexit = context.enter('label');
        value =
          '[' + phrasing(node, context, { before: '[', after: ']' }) + '](';
        subexit();

        if (
          // If there’s no url but there is a title…
          (!node.url && node.title) ||
          // Or if there’s markdown whitespace or an eol, enclose.
          /[ \t\r\n]/.test(node.url)
        ) {
          subexit = context.enter('destinationLiteral');
          value +=
            '<' + safe(context, node.url, { before: '<', after: '>' }) + '>';
        } else {
          // No whitespace, raw is prettier.
          subexit = context.enter('destinationRaw');
          value += safe(context, node.url, {
            before: '(',
            after: node.title ? ' ' : ')',
          });
        }

        subexit();

        if (node.title) {
          subexit = context.enter('title' + suffix);
          value +=
            ' ' +
            quote +
            safe(context, node.title, { before: quote, after: quote }) +
            quote;
          subexit();
        }

        value += ')';

        exit();
        return value;
      }

      function linkPeek(node, _, context) {
        return formatLinkAsAutolink(node, context) ? '<' : '[';
      }

      /***/
    },

    /***/ 7016: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = listItem;

      var repeat = __nccwpck_require__(6976);
      var checkBullet = __nccwpck_require__(8599);
      var checkListItemIndent = __nccwpck_require__(9009);
      var flow = __nccwpck_require__(7530);
      var indentLines = __nccwpck_require__(6887);

      function listItem(node, parent, context) {
        var bullet = checkBullet(context);
        var listItemIndent = checkListItemIndent(context);
        var size;
        var value;
        var exit;

        if (parent && parent.ordered) {
          bullet =
            (parent.start > -1 ? parent.start : 1) +
            (context.options.incrementListMarker === false
              ? 0
              : parent.children.indexOf(node)) +
            '.';
        }

        size = bullet.length + 1;

        if (
          listItemIndent === 'tab' ||
          (listItemIndent === 'mixed' &&
            ((parent && parent.spread) || node.spread))
        ) {
          size = Math.ceil(size / 4) * 4;
        }

        exit = context.enter('listItem');
        value = indentLines(flow(node, context), map);
        exit();

        return value;

        function map(line, index, blank) {
          if (index) {
            return (blank ? '' : repeat(' ', size)) + line;
          }

          return (
            (blank ? bullet : bullet + repeat(' ', size - bullet.length)) + line
          );
        }
      }

      /***/
    },

    /***/ 9323: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = list;

      var flow = __nccwpck_require__(7530);

      function list(node, _, context) {
        var exit = context.enter('list');
        var value = flow(node, context);
        exit();
        return value;
      }

      /***/
    },

    /***/ 5197: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = paragraph;

      var phrasing = __nccwpck_require__(7489);

      function paragraph(node, _, context) {
        var exit = context.enter('paragraph');
        var subexit = context.enter('phrasing');
        var value = phrasing(node, context, { before: '\n', after: '\n' });
        subexit();
        exit();
        return value;
      }

      /***/
    },

    /***/ 54: /***/ (module, __unused_webpack_exports, __nccwpck_require__) => {
      module.exports = root;

      var flow = __nccwpck_require__(7530);

      function root(node, _, context) {
        return flow(node, context);
      }

      /***/
    },

    /***/ 2150: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = strong;
      strong.peek = strongPeek;

      var checkStrong = __nccwpck_require__(3534);
      var phrasing = __nccwpck_require__(7489);

      // To do: there are cases where emphasis cannot “form” depending on the
      // previous or next character of sequences.
      // There’s no way around that though, except for injecting zero-width stuff.
      // Do we need to safeguard against that?
      function strong(node, _, context) {
        var marker = checkStrong(context);
        var exit = context.enter('strong');
        var value = phrasing(node, context, { before: marker, after: marker });
        exit();
        return marker + marker + value + marker + marker;
      }

      function strongPeek(node, _, context) {
        return context.options.strong || '*';
      }

      /***/
    },

    /***/ 2124: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = text;

      var safe = __nccwpck_require__(3906);

      function text(node, parent, context, safeOptions) {
        return safe(context, node.value, safeOptions);
      }

      /***/
    },

    /***/ 3960: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = thematicBreak;

      var repeat = __nccwpck_require__(6976);
      var checkRepeat = __nccwpck_require__(3680);
      var checkRule = __nccwpck_require__(7253);

      function thematicBreak(node, parent, context) {
        var value = repeat(
          checkRule(context) + (context.options.ruleSpaces ? ' ' : ''),
          checkRepeat(context)
        );

        return context.options.ruleSpaces ? value.slice(0, -1) : value;
      }

      /***/
    },

    /***/ 3683: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = toMarkdown;

      var zwitch = __nccwpck_require__(1067);
      var configure = __nccwpck_require__(9363);
      var defaultHandlers = __nccwpck_require__(3769);
      var defaultJoin = __nccwpck_require__(3701);
      var defaultUnsafe = __nccwpck_require__(6566);

      function toMarkdown(tree, options) {
        var settings = options || {};
        var context = {
          enter: enter,
          stack: [],
          unsafe: [],
          join: [],
          handlers: {},
          options: {},
        };
        var result;

        configure(context, {
          unsafe: defaultUnsafe,
          join: defaultJoin,
          handlers: defaultHandlers,
        });
        configure(context, settings);

        if (context.options.tightDefinitions) {
          context.join = [joinDefinition].concat(context.join);
        }

        context.handle = zwitch('type', {
          invalid: invalid,
          unknown: unknown,
          handlers: context.handlers,
        });

        result = context.handle(tree, null, context, {
          before: '\n',
          after: '\n',
        });

        if (
          result &&
          result.charCodeAt(result.length - 1) !== 10 &&
          result.charCodeAt(result.length - 1) !== 13
        ) {
          result += '\n';
        }

        return result;

        function enter(name) {
          context.stack.push(name);
          return exit;

          function exit() {
            context.stack.pop();
          }
        }
      }

      function invalid(value) {
        throw new Error('Cannot handle value `' + value + '`, expected node');
      }

      function unknown(node) {
        throw new Error('Cannot handle unknown node `' + node.type + '`');
      }

      function joinDefinition(left, right) {
        // No blank line between adjacent definitions.
        if (left.type === 'definition' && left.type === right.type) {
          return 0;
        }
      }

      /***/
    },

    /***/ 3701: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = [joinDefaults];

      var formatCodeAsIndented = __nccwpck_require__(8446);
      var formatHeadingAsSetext = __nccwpck_require__(4954);

      function joinDefaults(left, right, parent, context) {
        if (
          // Two lists with the same marker.
          (right.type === 'list' &&
            right.type === left.type &&
            Boolean(left.ordered) === Boolean(right.ordered)) ||
          // Indented code after list or another indented code.
          (right.type === 'code' &&
            formatCodeAsIndented(right, context) &&
            (left.type === 'list' ||
              (left.type === right.type &&
                formatCodeAsIndented(left, context))))
        ) {
          return false;
        }

        // Join children of a list or an item.
        // In which case, `parent` has a `spread` field.
        if (typeof parent.spread === 'boolean') {
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
      }

      /***/
    },

    /***/ 6566: /***/ (module) => {
      module.exports = [
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
        {
          character: ' ',
          inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde'],
        },
        // An exclamation mark can start an image, if it is followed by a link or
        // a link reference.
        { character: '!', after: '\\[', inConstruct: 'phrasing' },
        // A quote can break out of a title.
        { character: '"', inConstruct: 'titleQuote' },
        // A number sign could start an ATX heading if it starts a line.
        { atBreak: true, character: '#' },
        // Dollar sign and percentage are not used in markdown.
        // An ampersand could start a character reference.
        { character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing' },
        // An apostrophe can break out of a title.
        { character: "'", inConstruct: 'titleApostrophe' },
        // A left paren could break out of a destination raw.
        { character: '(', inConstruct: 'destinationRaw' },
        { before: '\\]', character: '(', inConstruct: 'phrasing' },
        // A right paren could start a list item or break out of a destination
        // raw.
        { atBreak: true, before: '\\d+', character: ')' },
        { character: ')', inConstruct: 'destinationRaw' },
        // An asterisk can start thematic breaks, list items, emphasis, strong.
        { atBreak: true, character: '*' },
        { character: '*', inConstruct: 'phrasing' },
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
        { character: '<', after: '[!/?A-Za-z]', inConstruct: 'phrasing' },
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
          inConstruct: ['phrasing', 'label', 'reference'],
        },
        // A backslash can start an escape (when followed by punctuation) or a
        // hard break (when followed by an eol).
        { character: '\\', after: '[!-/:-@[-`{-~]' },
        { character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing' },
        // A right bracket can exit labels.
        {
          character: ']',
          inConstruct: ['label', 'reference'],
        },
        // Caret is not used in markdown for constructs.
        // An underscore can start emphasis, strong, or a thematic break.
        { atBreak: true, character: '_' },
        { before: '[^A-Za-z]', character: '_', inConstruct: 'phrasing' },
        { character: '_', after: '[^A-Za-z]', inConstruct: 'phrasing' },
        // A grave accent can start code (fenced or text), or it can break out of
        // a grave accent code fence.
        { atBreak: true, character: '`' },
        {
          character: '`',
          inConstruct: [
            'codeFencedLangGraveAccent',
            'codeFencedMetaGraveAccent',
            'phrasing',
          ],
        },
        // Left brace, vertical bar, right brace are not used in markdown for
        // constructs.
        // A tilde can start code (fenced).
        { atBreak: true, character: '~' },
      ];

      /***/
    },

    /***/ 9211: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = association;

      var decode = __nccwpck_require__(3485);

      var characterEscape = /\\([!-/:-@[-`{-~])/g;
      var characterReference = /&(#(\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;

      // The `label` of an association is the string value: character escapes and
      // references work, and casing is intact.
      // The `identifier` is used to match one association to another: controversially,
      // character escapes and references don’t work in this matching: `&copy;` does
      // not match `©`, and `\+` does not match `+`.
      // But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
      // matches `a b`.
      // So, we do prefer the label when figuring out how we’re going to serialize:
      // it has whitespace, casing, and we can ignore most useless character escapes
      // and all character references.
      function association(node) {
        if (node.label || !node.identifier) {
          return node.label || '';
        }

        return node.identifier
          .replace(characterEscape, '$1')
          .replace(characterReference, decodeIfPossible);
      }

      function decodeIfPossible($0, $1) {
        return decode($1) || $0;
      }

      /***/
    },

    /***/ 8599: /***/ (module) => {
      module.exports = checkBullet;

      function checkBullet(context) {
        var marker = context.options.bullet || '*';

        if (marker !== '*' && marker !== '+' && marker !== '-') {
          throw new Error(
            'Cannot serialize items with `' +
              marker +
              '` for `options.bullet`, expected `*`, `+`, or `-`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 6452: /***/ (module) => {
      module.exports = checkEmphasis;

      function checkEmphasis(context) {
        var marker = context.options.emphasis || '*';

        if (marker !== '*' && marker !== '_') {
          throw new Error(
            'Cannot serialize emphasis with `' +
              marker +
              '` for `options.emphasis`, expected `*`, or `_`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 158: /***/ (module) => {
      module.exports = checkFence;

      function checkFence(context) {
        var marker = context.options.fence || '`';

        if (marker !== '`' && marker !== '~') {
          throw new Error(
            'Cannot serialize code with `' +
              marker +
              '` for `options.fence`, expected `` ` `` or `~`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 9009: /***/ (module) => {
      module.exports = checkListItemIndent;

      function checkListItemIndent(context) {
        var style = context.options.listItemIndent || 'tab';

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
      }

      /***/
    },

    /***/ 3366: /***/ (module) => {
      module.exports = checkQuote;

      function checkQuote(context) {
        var marker = context.options.quote || '"';

        if (marker !== '"' && marker !== "'") {
          throw new Error(
            'Cannot serialize title with `' +
              marker +
              '` for `options.quote`, expected `"`, or `\'`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 3680: /***/ (module) => {
      module.exports = checkRule;

      function checkRule(context) {
        var repetition = context.options.ruleRepetition || 3;

        if (repetition < 3) {
          throw new Error(
            'Cannot serialize rules with repetition `' +
              repetition +
              '` for `options.ruleRepetition`, expected `3` or more'
          );
        }

        return repetition;
      }

      /***/
    },

    /***/ 7253: /***/ (module) => {
      module.exports = checkRule;

      function checkRule(context) {
        var marker = context.options.rule || '*';

        if (marker !== '*' && marker !== '-' && marker !== '_') {
          throw new Error(
            'Cannot serialize rules with `' +
              marker +
              '` for `options.rule`, expected `*`, `-`, or `_`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 3534: /***/ (module) => {
      module.exports = checkStrong;

      function checkStrong(context) {
        var marker = context.options.strong || '*';

        if (marker !== '*' && marker !== '_') {
          throw new Error(
            'Cannot serialize strong with `' +
              marker +
              '` for `options.strong`, expected `*`, or `_`'
          );
        }

        return marker;
      }

      /***/
    },

    /***/ 7530: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = flow;

      var repeat = __nccwpck_require__(6976);

      function flow(parent, context) {
        var children = parent.children || [];
        var results = [];
        var index = -1;
        var child;

        while (++index < children.length) {
          child = children[index];

          results.push(
            context.handle(child, parent, context, {
              before: '\n',
              after: '\n',
            })
          );

          if (index + 1 < children.length) {
            results.push(between(child, children[index + 1]));
          }
        }

        return results.join('');

        function between(left, right) {
          var index = -1;
          var result;

          while (++index < context.join.length) {
            result = context.join[index](left, right, parent, context);

            if (result === true || result === 1) {
              break;
            }

            if (typeof result === 'number') {
              return repeat('\n', 1 + Number(result));
            }

            if (result === false) {
              return '\n\n<!---->\n\n';
            }
          }

          return '\n\n';
        }
      }

      /***/
    },

    /***/ 7489: /***/ (module) => {
      module.exports = phrasing;

      function phrasing(parent, context, safeOptions) {
        var children = parent.children || [];
        var results = [];
        var index = -1;
        var before = safeOptions.before;
        var after;
        var handle;
        var child;

        while (++index < children.length) {
          child = children[index];

          if (index + 1 < children.length) {
            handle = context.handle.handlers[children[index + 1].type];
            if (handle && handle.peek) handle = handle.peek;
            after = handle
              ? handle(children[index + 1], parent, context, {
                  before: '',
                  after: '',
                }).charAt(0)
              : '';
          } else {
            after = safeOptions.after;
          }

          results.push(
            context.handle(child, parent, context, {
              before: before,
              after: after,
            })
          );
          before = results[results.length - 1].slice(-1);
        }

        return results.join('');
      }

      /***/
    },

    /***/ 8446: /***/ (module) => {
      module.exports = formatCodeAsIndented;

      function formatCodeAsIndented(node, context) {
        return (
          !context.options.fences &&
          node.value &&
          // If there’s no info…
          !node.lang &&
          // And there’s a non-whitespace character…
          /[^ \r\n]/.test(node.value) &&
          // And the value doesn’t start or end in a blank…
          !/^[\t ]*[\r\n]|[\r\n][\t ]*$/.test(node.value)
        );
      }

      /***/
    },

    /***/ 4954: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = formatHeadingAsSetext;

      var toString = __nccwpck_require__(5789);

      function formatHeadingAsSetext(node, context) {
        return (
          context.options.setext &&
          (!node.depth || node.depth < 3) &&
          toString(node)
        );
      }

      /***/
    },

    /***/ 5358: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = formatLinkAsAutolink;

      var toString = __nccwpck_require__(5789);

      function formatLinkAsAutolink(node, context) {
        var raw = toString(node);

        return (
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
          // references don’t work) or angle brackets…
          !/[\0- <>\u007F]/.test(node.url)
        );
      }

      /***/
    },

    /***/ 6887: /***/ (module) => {
      module.exports = indentLines;

      var eol = /\r?\n|\r/g;

      function indentLines(value, map) {
        var result = [];
        var start = 0;
        var line = 0;
        var match;

        while ((match = eol.exec(value))) {
          one(value.slice(start, match.index));
          result.push(match[0]);
          start = match.index + match[0].length;
          line++;
        }

        one(value.slice(start));

        return result.join('');

        function one(value) {
          result.push(map(value, line, !value));
        }
      }

      /***/
    },

    /***/ 3906: /***/ (module) => {
      module.exports = safe;

      function safe(context, input, config) {
        var value =
          (config.before || '') + (input || '') + (config.after || '');
        var positions = [];
        var result = [];
        var infos = {};
        var index = -1;
        var before;
        var after;
        var position;
        var pattern;
        var expression;
        var match;
        var start;
        var end;

        while (++index < context.unsafe.length) {
          pattern = context.unsafe[index];

          if (
            !inScope(context.stack, pattern.inConstruct, true) ||
            inScope(context.stack, pattern.notInConstruct)
          ) {
            continue;
          }

          expression =
            pattern._compiled || (pattern._compiled = toExpression(pattern));

          while ((match = expression.exec(value))) {
            before = 'before' in pattern || pattern.atBreak;
            after = 'after' in pattern;
            position = match.index + (before ? match[1].length : 0);

            if (positions.indexOf(position) === -1) {
              positions.push(position);
              infos[position] = { before: before, after: after };
            } else {
              if (infos[position].before && !before) {
                infos[position].before = false;
              }

              if (infos[position].after && !after) {
                infos[position].after = false;
              }
            }
          }
        }

        positions.sort(numerical);

        start = config.before ? config.before.length : 0;
        end = value.length - (config.after ? config.after.length : 0);
        index = -1;

        while (++index < positions.length) {
          position = positions[index];

          if (
            // Character before or after matched:
            position < start ||
            position >= end
          ) {
            continue;
          }

          // If this character is supposed to be escaped because it has a condition on
          // the next character, and the next character is definitly being escaped,
          // then skip this escape.
          if (
            position + 1 < end &&
            positions[index + 1] === position + 1 &&
            infos[position].after &&
            !infos[position + 1].before &&
            !infos[position + 1].after
          ) {
            continue;
          }

          if (start !== position) {
            result.push(value.slice(start, position));
          }

          start = position;

          if (
            /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
            (!config.encode ||
              config.encode.indexOf(value.charAt(position)) === -1)
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

        result.push(value.slice(start, end));

        return result.join('');
      }

      function inScope(stack, list, none) {
        var index;

        if (!list) {
          return none;
        }

        if (typeof list === 'string') {
          list = [list];
        }

        index = -1;

        while (++index < list.length) {
          if (stack.indexOf(list[index]) !== -1) {
            return true;
          }
        }

        return false;
      }

      function toExpression(pattern) {
        var before = pattern.before ? '(?:' + pattern.before + ')' : '';
        var after = pattern.after ? '(?:' + pattern.after + ')' : '';

        if (pattern.atBreak) {
          before = '[\\r\\n][\\t ]*' + before;
        }

        return new RegExp(
          (before ? '(' + before + ')' : '') +
            (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
            pattern.character +
            (after || ''),
          'g'
        );
      }

      function numerical(a, b) {
        return a - b;
      }

      /***/
    },

    /***/ 5789: /***/ (module) => {
      'use strict';

      module.exports = toString;

      // Get the text content of a node.
      // Prefer the node’s plain-text fields, otherwise serialize its children,
      // and if the given value is an array, serialize the nodes in it.
      function toString(node) {
        return (
          (node &&
            (node.value ||
              node.alt ||
              node.title ||
              ('children' in node && all(node.children)) ||
              ('length' in node && all(node)))) ||
          ''
        );
      }

      function all(values) {
        var result = [];
        var index = -1;

        while (++index < values.length) {
          result[index] = toString(values[index]);
        }

        return result.join('');
      }

      /***/
    },

    /***/ 6184: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = __nccwpck_require__(3616);

      /***/
    },

    /***/ 1254: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var extend = __nccwpck_require__(8171);

      module.exports = contents;

      // Transform a list of heading objects to a markdown list.
      function contents(map, tight, prefix, ordered) {
        var table = {
          type: 'list',
          ordered: ordered,
          spread: false,
          children: [],
        };
        var minDepth = Infinity;
        var index = -1;

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
          insert(map[index], table, tight, prefix, ordered);
        }

        return table;
      }

      // Insert an entry into `parent`.
      function insert(entry, parent, tight, prefix, ordered) {
        var siblings = parent.children;
        var tail = siblings[siblings.length - 1];
        var index = -1;
        var item;

        if (entry.depth === 1) {
          siblings.push({
            type: 'listItem',
            spread: false,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'link',
                    title: null,
                    url: '#' + (prefix || '') + entry.id,
                    children: all(entry.children),
                  },
                ],
              },
            ],
          });
        } else if (tail && tail.type === 'listItem') {
          insert(entry, siblings[siblings.length - 1], tight, prefix, ordered);
        } else if (tail && tail.type === 'list') {
          entry.depth--;
          insert(entry, tail, tight, prefix, ordered);
        } else if (parent.type === 'list') {
          item = { type: 'listItem', spread: false, children: [] };
          siblings.push(item);
          insert(entry, item, tight, prefix, ordered);
        } else {
          item = {
            type: 'list',
            ordered: ordered,
            spread: false,
            children: [],
          };
          siblings.push(item);
          entry.depth--;
          insert(entry, item, tight, prefix, ordered);
        }

        if (parent.type === 'list' && !tight) {
          parent.spread = false;

          while (++index < siblings.length) {
            if (siblings[index].children.length > 1) {
              parent.spread = true;
              break;
            }
          }
        } else {
          parent.spread = !tight;
        }
      }

      function all(children) {
        var result = [];
        var index = -1;

        if (children) {
          while (++index < children.length) {
            result = result.concat(one(children[index]));
          }
        }

        return result;
      }

      function one(node) {
        var copy;

        if (
          node.type === 'link' ||
          node.type === 'linkReference' ||
          node.type === 'footnote' ||
          node.type === 'footnoteReference'
        ) {
          return all(node.children);
        }

        copy = extend({}, node);

        delete copy.children;
        delete copy.position;

        copy = extend(true, {}, copy);

        if (node.children) {
          copy.children = all(node.children);
        }

        return copy;
      }

      /***/
    },

    /***/ 3616: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = toc;

      var search = __nccwpck_require__(6138);
      var contents = __nccwpck_require__(1254);
      var toExpression = __nccwpck_require__(2874);

      // Get a TOC representation of `node`.
      function toc(node, options) {
        var settings = options || {};
        var heading = settings.heading ? toExpression(settings.heading) : null;
        var result = search(node, heading, settings);

        result.map = result.map.length
          ? contents(
              result.map,
              settings.tight,
              settings.prefix,
              settings.ordered || false
            )
          : null;

        // No given heading.
        if (!heading) {
          result.endIndex = result.index = null;
        }

        return result;
      }

      /***/
    },

    /***/ 6138: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = search;

      var toString = __nccwpck_require__(5789);
      var visit = __nccwpck_require__(199);
      var convert = __nccwpck_require__(4070);
      var slugs = __nccwpck_require__(237)();
      var toExpression = __nccwpck_require__(2874);

      // Search a node for a location.
      function search(root, expression, settings) {
        var skip = settings.skip && toExpression(settings.skip);
        var parents = convert(settings.parents || root);
        var map = [];
        var index;
        var endIndex;
        var opening;

        slugs.reset();

        // Visit all headings in `root`.  We `slug` all headings (to account for
        // duplicates), but only create a TOC from top-level headings.
        visit(root, 'heading', onheading);

        return {
          index: index || -1,
          endIndex: index ? endIndex || root.children.length : -1,
          map: map,
        };

        function onheading(node, position, parent) {
          var value = toString(node);
          /* istanbul ignore next - to do: remove this when `remark-attr` is up to
           * date w/ micromark. */
          var id =
            node.data && node.data.hProperties && node.data.hProperties.id;
          var slug = slugs.slug(id || value);

          if (!parents(parent)) {
            return;
          }

          // Our opening heading.
          if (expression && !index && expression.test(value)) {
            index = position + 1;
            opening = node;
            return;
          }

          // Our closing heading.
          if (opening && !endIndex && node.depth <= opening.depth) {
            endIndex = position;
          }

          // A non-empty heading after the closing (if we were looking for one).
          if (
            value &&
            (endIndex || !expression) &&
            (!settings.maxDepth || node.depth <= settings.maxDepth) &&
            (!skip || !skip.test(value))
          ) {
            map.push({ depth: node.depth, children: node.children, id: slug });
          }
        }
      }

      /***/
    },

    /***/ 2874: /***/ (module) => {
      'use strict';

      module.exports = toExpression;

      // Transform a string into an applicable expression.
      function toExpression(value) {
        return new RegExp('^(' + value + ')$', 'i');
      }

      /***/
    },

    /***/ 3847: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiAlpha = regexCheck(/[A-Za-z]/);

      module.exports = asciiAlpha;

      /***/
    },

    /***/ 598: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);

      module.exports = asciiAlphanumeric;

      /***/
    },

    /***/ 245: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);

      module.exports = asciiAtext;

      /***/
    },

    /***/ 1336: /***/ (module) => {
      'use strict';

      // Note: EOF is seen as ASCII control here, because `null < 32 == true`.
      function asciiControl(code) {
        return (
          // Special whitespace codes (which have negative values), C0 and Control
          // character DEL
          code < 32 || code === 127
        );
      }

      module.exports = asciiControl;

      /***/
    },

    /***/ 6996: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiDigit = regexCheck(/\d/);

      module.exports = asciiDigit;

      /***/
    },

    /***/ 6526: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);

      module.exports = asciiHexDigit;

      /***/
    },

    /***/ 7909: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);

      module.exports = asciiPunctuation;

      /***/
    },

    /***/ 9180: /***/ (module) => {
      'use strict';

      function markdownLineEndingOrSpace(code) {
        return code < 0 || code === 32;
      }

      module.exports = markdownLineEndingOrSpace;

      /***/
    },

    /***/ 7506: /***/ (module) => {
      'use strict';

      function markdownLineEnding(code) {
        return code < -2;
      }

      module.exports = markdownLineEnding;

      /***/
    },

    /***/ 5989: /***/ (module) => {
      'use strict';

      function markdownSpace(code) {
        return code === -2 || code === -1 || code === 32;
      }

      module.exports = markdownSpace;

      /***/
    },

    /***/ 9372: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);
      var unicodePunctuationRegex = __nccwpck_require__(9994);

      // In fact adds to the bundle size.

      var unicodePunctuation = regexCheck(unicodePunctuationRegex);

      module.exports = unicodePunctuation;

      /***/
    },

    /***/ 9968: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var regexCheck = __nccwpck_require__(1028);

      var unicodeWhitespace = regexCheck(/\s/);

      module.exports = unicodeWhitespace;

      /***/
    },

    /***/ 3512: /***/ (module) => {
      'use strict';

      var assign = Object.assign;

      module.exports = assign;

      /***/
    },

    /***/ 3531: /***/ (module) => {
      'use strict';

      var fromCharCode = String.fromCharCode;

      module.exports = fromCharCode;

      /***/
    },

    /***/ 3500: /***/ (module) => {
      'use strict';

      var own = {}.hasOwnProperty;

      module.exports = own;

      /***/
    },

    /***/ 5159: /***/ (module) => {
      'use strict';

      // This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
      var basics = [
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

      module.exports = basics;

      /***/
    },

    /***/ 4677: /***/ (module) => {
      'use strict';

      // This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
      var raws = ['pre', 'script', 'style', 'textarea'];

      module.exports = raws;

      /***/
    },

    /***/ 2366: /***/ (module) => {
      'use strict';

      var splice = [].splice;

      module.exports = splice;

      /***/
    },

    /***/ 9994: /***/ (module) => {
      'use strict';

      // This module is generated by `script/`.
      //
      // CommonMark handles attention (emphasis, strong) markers based on what comes
      // before or after them.
      // One such difference is if those characters are Unicode punctuation.
      // This script is generated from the Unicode data.
      var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

      module.exports = unicodePunctuation;

      /***/
    },

    /***/ 289: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      var text$1 = __nccwpck_require__(7492);
      var attention = __nccwpck_require__(2116);
      var autolink = __nccwpck_require__(6681);
      var blockQuote = __nccwpck_require__(9025);
      var characterEscape = __nccwpck_require__(7128);
      var characterReference = __nccwpck_require__(9500);
      var codeFenced = __nccwpck_require__(3268);
      var codeIndented = __nccwpck_require__(907);
      var codeText = __nccwpck_require__(7033);
      var definition = __nccwpck_require__(1193);
      var hardBreakEscape = __nccwpck_require__(7608);
      var headingAtx = __nccwpck_require__(4558);
      var htmlFlow = __nccwpck_require__(6791);
      var htmlText = __nccwpck_require__(7743);
      var labelEnd = __nccwpck_require__(9797);
      var labelStartImage = __nccwpck_require__(7860);
      var labelStartLink = __nccwpck_require__(5908);
      var lineEnding = __nccwpck_require__(5183);
      var thematicBreak = __nccwpck_require__(5590);
      var list = __nccwpck_require__(3107);
      var setextUnderline = __nccwpck_require__(1196);

      var document = {
        42: list,
        // Asterisk
        43: list,
        // Plus sign
        45: list,
        // Dash
        48: list,
        // 0
        49: list,
        // 1
        50: list,
        // 2
        51: list,
        // 3
        52: list,
        // 4
        53: list,
        // 5
        54: list,
        // 6
        55: list,
        // 7
        56: list,
        // 8
        57: list,
        // 9
        62: blockQuote, // Greater than
      };
      var contentInitial = {
        91: definition, // Left square bracket
      };
      var flowInitial = {
        '-2': codeIndented,
        // Horizontal tab
        '-1': codeIndented,
        // Virtual space
        32: codeIndented, // Space
      };
      var flow = {
        35: headingAtx,
        // Number sign
        42: thematicBreak,
        // Asterisk
        45: [setextUnderline, thematicBreak],
        // Dash
        60: htmlFlow,
        // Less than
        61: setextUnderline,
        // Equals to
        95: thematicBreak,
        // Underscore
        96: codeFenced,
        // Grave accent
        126: codeFenced, // Tilde
      };
      var string = {
        38: characterReference,
        // Ampersand
        92: characterEscape, // Backslash
      };
      var text = {
        '-5': lineEnding,
        // Carriage return
        '-4': lineEnding,
        // Line feed
        '-3': lineEnding,
        // Carriage return + line feed
        33: labelStartImage,
        // Exclamation mark
        38: characterReference,
        // Ampersand
        42: attention,
        // Asterisk
        60: [autolink, htmlText],
        // Less than
        91: labelStartLink,
        // Left square bracket
        92: [hardBreakEscape, characterEscape],
        // Backslash
        93: labelEnd,
        // Right square bracket
        95: attention,
        // Underscore
        96: codeText, // Grave accent
      };
      var insideSpan = {
        null: [attention, text$1.resolver],
      };
      var disable = {
        null: [],
      };

      exports.contentInitial = contentInitial;
      exports.disable = disable;
      exports.document = document;
      exports.flow = flow;
      exports.flowInitial = flowInitial;
      exports.insideSpan = insideSpan;
      exports.string = string;
      exports.text = text;

      /***/
    },

    /***/ 5834: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);

      var tokenize = initializeContent;

      function initializeContent(effects) {
        var contentStart = effects.attempt(
          this.parser.constructs.contentInitial,
          afterContentStartConstruct,
          paragraphInitial
        );
        var previous;
        return contentStart;

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

        function paragraphInitial(code) {
          effects.enter('paragraph');
          return lineStart(code);
        }

        function lineStart(code) {
          var token = effects.enter('chunkText', {
            contentType: 'text',
            previous: previous,
          });

          if (previous) {
            previous.next = token;
          }

          previous = token;
          return data(code);
        }

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
      }

      exports.tokenize = tokenize;

      /***/
    },

    /***/ 9517: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var partialBlankLine = __nccwpck_require__(2244);

      var tokenize = initializeDocument;
      var containerConstruct = {
        tokenize: tokenizeContainer,
      };
      var lazyFlowConstruct = {
        tokenize: tokenizeLazyFlow,
      };

      function initializeDocument(effects) {
        var self = this;
        var stack = [];
        var continued = 0;
        var inspectConstruct = {
          tokenize: tokenizeInspect,
          partial: true,
        };
        var inspectResult;
        var childFlow;
        var childToken;
        return start;

        function start(code) {
          if (continued < stack.length) {
            self.containerState = stack[continued][1];
            return effects.attempt(
              stack[continued][0].continuation,
              documentContinue,
              documentContinued
            )(code);
          }

          return documentContinued(code);
        }

        function documentContinue(code) {
          continued++;
          return start(code);
        }

        function documentContinued(code) {
          // If we’re in a concrete construct (such as when expecting another line of
          // HTML, or we resulted in lazy content), we can immediately start flow.
          if (inspectResult && inspectResult.flowContinue) {
            return flowStart(code);
          }

          self.interrupt =
            childFlow &&
            childFlow.currentConstruct &&
            childFlow.currentConstruct.interruptible;
          self.containerState = {};
          return effects.attempt(
            containerConstruct,
            containerContinue,
            flowStart
          )(code);
        }

        function containerContinue(code) {
          stack.push([self.currentConstruct, self.containerState]);
          self.containerState = undefined;
          return documentContinued(code);
        }

        function flowStart(code) {
          if (code === null) {
            exitContainers(0, true);
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

        function flowContinue(code) {
          if (code === null) {
            continueFlow(effects.exit('chunkFlow'));
            return flowStart(code);
          }

          if (markdownLineEnding(code)) {
            effects.consume(code);
            continueFlow(effects.exit('chunkFlow'));
            return effects.check(inspectConstruct, documentAfterPeek);
          }

          effects.consume(code);
          return flowContinue;
        }

        function documentAfterPeek(code) {
          exitContainers(
            inspectResult.continued,
            inspectResult && inspectResult.flowEnd
          );
          continued = 0;
          return start(code);
        }

        function continueFlow(token) {
          if (childToken) childToken.next = token;
          childToken = token;
          childFlow.lazy = inspectResult && inspectResult.lazy;
          childFlow.defineSkip(token.start);
          childFlow.write(self.sliceStream(token));
        }

        function exitContainers(size, end) {
          var index = stack.length; // Close the flow.

          if (childFlow && end) {
            childFlow.write([null]);
            childToken = childFlow = undefined;
          } // Exit open containers.

          while (index-- > size) {
            self.containerState = stack[index][1];
            stack[index][0].exit.call(self, effects);
          }

          stack.length = size;
        }

        function tokenizeInspect(effects, ok) {
          var subcontinued = 0;
          inspectResult = {};
          return inspectStart;

          function inspectStart(code) {
            if (subcontinued < stack.length) {
              self.containerState = stack[subcontinued][1];
              return effects.attempt(
                stack[subcontinued][0].continuation,
                inspectContinue,
                inspectLess
              )(code);
            } // If we’re continued but in a concrete flow, we can’t have more
            // containers.

            if (
              childFlow.currentConstruct &&
              childFlow.currentConstruct.concrete
            ) {
              inspectResult.flowContinue = true;
              return inspectDone(code);
            }

            self.interrupt =
              childFlow.currentConstruct &&
              childFlow.currentConstruct.interruptible;
            self.containerState = {};
            return effects.attempt(
              containerConstruct,
              inspectFlowEnd,
              inspectDone
            )(code);
          }

          function inspectContinue(code) {
            subcontinued++;
            return self.containerState._closeFlow
              ? inspectFlowEnd(code)
              : inspectStart(code);
          }

          function inspectLess(code) {
            if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
              // Maybe another container?
              self.containerState = {};
              return effects.attempt(
                containerConstruct,
                inspectFlowEnd, // Maybe flow, or a blank line?
                effects.attempt(
                  lazyFlowConstruct,
                  inspectFlowEnd,
                  effects.check(partialBlankLine, inspectFlowEnd, inspectLazy)
                )
              )(code);
            } // Otherwise we’re interrupting.

            return inspectFlowEnd(code);
          }

          function inspectLazy(code) {
            // Act as if all containers are continued.
            subcontinued = stack.length;
            inspectResult.lazy = true;
            inspectResult.flowContinue = true;
            return inspectDone(code);
          } // We’re done with flow if we have more containers, or an interruption.

          function inspectFlowEnd(code) {
            inspectResult.flowEnd = true;
            return inspectDone(code);
          }

          function inspectDone(code) {
            inspectResult.continued = subcontinued;
            self.interrupt = self.containerState = undefined;
            return ok(code);
          }
        }
      }

      function tokenizeContainer(effects, ok, nok) {
        return factorySpace(
          effects,
          effects.attempt(this.parser.constructs.document, ok, nok),
          'linePrefix',
          this.parser.constructs.disable.null.indexOf('codeIndented') > -1
            ? undefined
            : 4
        );
      }

      function tokenizeLazyFlow(effects, ok, nok) {
        return factorySpace(
          effects,
          effects.lazy(this.parser.constructs.flow, ok, nok),
          'linePrefix',
          this.parser.constructs.disable.null.indexOf('codeIndented') > -1
            ? undefined
            : 4
        );
      }

      exports.tokenize = tokenize;

      /***/
    },

    /***/ 9670: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      var factorySpace = __nccwpck_require__(8200);
      var partialBlankLine = __nccwpck_require__(2244);
      var content = __nccwpck_require__(1259);

      var tokenize = initializeFlow;

      function initializeFlow(effects) {
        var self = this;
        var initial = effects.attempt(
          // Try to parse a blank line.
          partialBlankLine,
          atBlankEnding, // Try to parse initial flow (essentially, only code).
          effects.attempt(
            this.parser.constructs.flowInitial,
            afterConstruct,
            factorySpace(
              effects,
              effects.attempt(
                this.parser.constructs.flow,
                afterConstruct,
                effects.attempt(content, afterConstruct)
              ),
              'linePrefix'
            )
          )
        );
        return initial;

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
      }

      exports.tokenize = tokenize;

      /***/
    },

    /***/ 7492: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      var assign = __nccwpck_require__(3512);
      var shallow = __nccwpck_require__(1479);

      var text = initializeFactory('text');
      var string = initializeFactory('string');
      var resolver = {
        resolveAll: createResolver(),
      };

      function initializeFactory(field) {
        return {
          tokenize: initializeText,
          resolveAll: createResolver(
            field === 'text' ? resolveAllLineSuffixes : undefined
          ),
        };

        function initializeText(effects) {
          var self = this;
          var constructs = this.parser.constructs[field];
          var text = effects.attempt(constructs, start, notText);
          return start;

          function start(code) {
            return atBreak(code) ? text(code) : notText(code);
          }

          function notText(code) {
            if (code === null) {
              effects.consume(code);
              return;
            }

            effects.enter('data');
            effects.consume(code);
            return data;
          }

          function data(code) {
            if (atBreak(code)) {
              effects.exit('data');
              return text(code);
            } // Data.

            effects.consume(code);
            return data;
          }

          function atBreak(code) {
            var list = constructs[code];
            var index = -1;

            if (code === null) {
              return true;
            }

            if (list) {
              while (++index < list.length) {
                if (
                  !list[index].previous ||
                  list[index].previous.call(self, self.previous)
                ) {
                  return true;
                }
              }
            }
          }
        }
      }

      function createResolver(extraResolver) {
        return resolveAllText;

        function resolveAllText(events, context) {
          var index = -1;
          var enter; // A rather boring computation (to merge adjacent `data` events) which
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
      } // A rather ugly set of instructions which again looks at chunks in the input
      // stream.
      // The reason to do this here is that it is *much* faster to parse in reverse.
      // And that we can’t hook into `null` to split the line suffix before an EOF.
      // To do: figure out if we can make this into a clean utility, or even in core.
      // As it will be useful for GFMs literal autolink extension (and maybe even
      // tables?)

      function resolveAllLineSuffixes(events, context) {
        var eventIndex = -1;
        var chunks;
        var data;
        var chunk;
        var index;
        var bufferIndex;
        var size;
        var tabs;
        var token;

        while (++eventIndex <= events.length) {
          if (
            (eventIndex === events.length ||
              events[eventIndex][1].type === 'lineEnding') &&
            events[eventIndex - 1][1].type === 'data'
          ) {
            data = events[eventIndex - 1][1];
            chunks = context.sliceStream(data);
            index = chunks.length;
            bufferIndex = -1;
            size = 0;
            tabs = undefined;

            while (index--) {
              chunk = chunks[index];

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
              } else if (chunk === -1);
              else {
                // Replacement character, exit.
                index++;
                break;
              }
            }

            if (size) {
              token = {
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
                end: shallow(data.end),
              };
              data.end = shallow(token.start);

              if (data.start.offset === data.end.offset) {
                assign(data, token);
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
      }

      exports.resolver = resolver;
      exports.string = string;
      exports.text = text;

      /***/
    },

    /***/ 488: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var miniflat = __nccwpck_require__(9042);
      var content = __nccwpck_require__(5834);
      var document = __nccwpck_require__(9517);
      var flow = __nccwpck_require__(9670);
      var text = __nccwpck_require__(7492);
      var combineExtensions = __nccwpck_require__(8602);
      var createTokenizer = __nccwpck_require__(4845);
      var constructs = __nccwpck_require__(289);

      function parse(options) {
        var settings = options || {};
        var parser = {
          defined: [],
          constructs: combineExtensions(
            [constructs].concat(miniflat(settings.extensions))
          ),
          content: create(content),
          document: create(document),
          flow: create(flow),
          string: create(text.string),
          text: create(text.text),
        };
        return parser;

        function create(initializer) {
          return creator;

          function creator(from) {
            return createTokenizer(parser, initializer, from);
          }
        }
      }

      module.exports = parse;

      /***/
    },

    /***/ 6948: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var subtokenize = __nccwpck_require__(14);

      function postprocess(events) {
        while (!subtokenize(events)) {
          // Empty
        }

        return events;
      }

      module.exports = postprocess;

      /***/
    },

    /***/ 5603: /***/ (module) => {
      'use strict';

      var search = /[\0\t\n\r]/g;

      function preprocess() {
        var start = true;
        var column = 1;
        var buffer = '';
        var atCarriageReturn;
        return preprocessor;

        function preprocessor(value, encoding, end) {
          var chunks = [];
          var match;
          var next;
          var startPosition;
          var endPosition;
          var code;
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
            endPosition = match ? match.index : value.length;
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

              if (code === 0) {
                chunks.push(65533);
                column++;
              } else if (code === 9) {
                next = Math.ceil(column / 4) * 4;
                chunks.push(-2);

                while (column++ < next) chunks.push(-1);
              } else if (code === 10) {
                chunks.push(-4);
                column = 1;
              } // Must be carriage return.
              else {
                atCarriageReturn = true;
                column = 1;
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
      }

      module.exports = preprocess;

      /***/
    },

    /***/ 2116: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var chunkedSplice = __nccwpck_require__(778);
      var chunkedPush = __nccwpck_require__(4455);
      var shallow = __nccwpck_require__(1479);
      var resolveAll = __nccwpck_require__(2004);
      var classifyCharacter = __nccwpck_require__(1324);
      var movePoint = __nccwpck_require__(6985);

      var attention = {
        name: 'attention',
        tokenize: tokenizeAttention,
        resolveAll: resolveAllAttention,
      };

      function resolveAllAttention(events, context) {
        var index = -1;
        var open;
        var group;
        var text;
        var openingSequence;
        var closingSequence;
        var use;
        var nextEvents;
        var offset; // Walk through all events.
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
                openingSequence = {
                  type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                  start: movePoint(shallow(events[open][1].end), -use),
                  end: shallow(events[open][1].end),
                };
                closingSequence = {
                  type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                  start: shallow(events[index][1].start),
                  end: movePoint(shallow(events[index][1].start), use),
                };
                text = {
                  type: use > 1 ? 'strongText' : 'emphasisText',
                  start: shallow(events[open][1].end),
                  end: shallow(events[index][1].start),
                };
                group = {
                  type: use > 1 ? 'strong' : 'emphasis',
                  start: shallow(openingSequence.start),
                  end: shallow(closingSequence.end),
                };
                events[open][1].end = shallow(openingSequence.start);
                events[index][1].start = shallow(closingSequence.end);
                nextEvents = []; // If there are more markers in the opening, add them before.

                if (events[open][1].end.offset - events[open][1].start.offset) {
                  nextEvents = chunkedPush(nextEvents, [
                    ['enter', events[open][1], context],
                    ['exit', events[open][1], context],
                  ]);
                } // Opening.

                nextEvents = chunkedPush(nextEvents, [
                  ['enter', group, context],
                  ['enter', openingSequence, context],
                  ['exit', openingSequence, context],
                  ['enter', text, context],
                ]); // Between.

                nextEvents = chunkedPush(
                  nextEvents,
                  resolveAll(
                    context.parser.constructs.insideSpan.null,
                    events.slice(open + 1, index),
                    context
                  )
                ); // Closing.

                nextEvents = chunkedPush(nextEvents, [
                  ['exit', text, context],
                  ['enter', closingSequence, context],
                  ['exit', closingSequence, context],
                  ['exit', group, context],
                ]); // If there are more markers in the closing, add them after.

                if (
                  events[index][1].end.offset - events[index][1].start.offset
                ) {
                  offset = 2;
                  nextEvents = chunkedPush(nextEvents, [
                    ['enter', events[index][1], context],
                    ['exit', events[index][1], context],
                  ]);
                } else {
                  offset = 0;
                }

                chunkedSplice(events, open - 1, index - open + 3, nextEvents);
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

      function tokenizeAttention(effects, ok) {
        var before = classifyCharacter(this.previous);
        var marker;
        return start;

        function start(code) {
          effects.enter('attentionSequence');
          marker = code;
          return sequence(code);
        }

        function sequence(code) {
          var token;
          var after;
          var open;
          var close;

          if (code === marker) {
            effects.consume(code);
            return sequence;
          }

          token = effects.exit('attentionSequence');
          after = classifyCharacter(code);
          open = !after || (after === 2 && before);
          close = !before || (before === 2 && after);
          token._open = marker === 42 ? open : open && (before || !close);
          token._close = marker === 42 ? close : close && (after || !open);
          return ok(code);
        }
      }

      module.exports = attention;

      /***/
    },

    /***/ 6681: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var asciiAlphanumeric = __nccwpck_require__(598);
      var asciiAlpha = __nccwpck_require__(3847);
      var asciiAtext = __nccwpck_require__(245);
      var asciiControl = __nccwpck_require__(1336);

      var autolink = {
        name: 'autolink',
        tokenize: tokenizeAutolink,
      };

      function tokenizeAutolink(effects, ok, nok) {
        var size = 1;
        return start;

        function start(code) {
          effects.enter('autolink');
          effects.enter('autolinkMarker');
          effects.consume(code);
          effects.exit('autolinkMarker');
          effects.enter('autolinkProtocol');
          return open;
        }

        function open(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            return schemeOrEmailAtext;
          }

          return asciiAtext(code) ? emailAtext(code) : nok(code);
        }

        function schemeOrEmailAtext(code) {
          return code === 43 ||
            code === 45 ||
            code === 46 ||
            asciiAlphanumeric(code)
            ? schemeInsideOrEmailAtext(code)
            : emailAtext(code);
        }

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

        function urlInside(code) {
          if (code === 62) {
            effects.exit('autolinkProtocol');
            return end(code);
          }

          if (code === 32 || code === 60 || asciiControl(code)) {
            return nok(code);
          }

          effects.consume(code);
          return urlInside;
        }

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

        function emailAtSignOrDot(code) {
          return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
        }

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

        function emailValue(code) {
          if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
            effects.consume(code);
            return code === 45 ? emailValue : emailLabel;
          }

          return nok(code);
        }

        function end(code) {
          effects.enter('autolinkMarker');
          effects.consume(code);
          effects.exit('autolinkMarker');
          effects.exit('autolink');
          return ok;
        }
      }

      module.exports = autolink;

      /***/
    },

    /***/ 9025: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);

      var blockQuote = {
        name: 'blockQuote',
        tokenize: tokenizeBlockQuoteStart,
        continuation: {
          tokenize: tokenizeBlockQuoteContinuation,
        },
        exit: exit,
      };

      function tokenizeBlockQuoteStart(effects, ok, nok) {
        var self = this;
        return start;

        function start(code) {
          if (code === 62) {
            if (!self.containerState.open) {
              effects.enter('blockQuote', {
                _container: true,
              });
              self.containerState.open = true;
            }

            effects.enter('blockQuotePrefix');
            effects.enter('blockQuoteMarker');
            effects.consume(code);
            effects.exit('blockQuoteMarker');
            return after;
          }

          return nok(code);
        }

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

      function tokenizeBlockQuoteContinuation(effects, ok, nok) {
        return factorySpace(
          effects,
          effects.attempt(blockQuote, ok, nok),
          'linePrefix',
          this.parser.constructs.disable.null.indexOf('codeIndented') > -1
            ? undefined
            : 4
        );
      }

      function exit(effects) {
        effects.exit('blockQuote');
      }

      module.exports = blockQuote;

      /***/
    },

    /***/ 7128: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var asciiPunctuation = __nccwpck_require__(7909);

      var characterEscape = {
        name: 'characterEscape',
        tokenize: tokenizeCharacterEscape,
      };

      function tokenizeCharacterEscape(effects, ok, nok) {
        return start;

        function start(code) {
          effects.enter('characterEscape');
          effects.enter('escapeMarker');
          effects.consume(code);
          effects.exit('escapeMarker');
          return open;
        }

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
      }

      module.exports = characterEscape;

      /***/
    },

    /***/ 9500: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var decodeEntity = __nccwpck_require__(3485);
      var asciiAlphanumeric = __nccwpck_require__(598);
      var asciiDigit = __nccwpck_require__(6996);
      var asciiHexDigit = __nccwpck_require__(6526);

      function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e
          ? e
          : { default: e };
      }

      var decodeEntity__default = /*#__PURE__*/ _interopDefaultLegacy(
        decodeEntity
      );

      var characterReference = {
        name: 'characterReference',
        tokenize: tokenizeCharacterReference,
      };

      function tokenizeCharacterReference(effects, ok, nok) {
        var self = this;
        var size = 0;
        var max;
        var test;
        return start;

        function start(code) {
          effects.enter('characterReference');
          effects.enter('characterReferenceMarker');
          effects.consume(code);
          effects.exit('characterReferenceMarker');
          return open;
        }

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

        function value(code) {
          var token;

          if (code === 59 && size) {
            token = effects.exit('characterReferenceValue');

            if (
              test === asciiAlphanumeric &&
              !decodeEntity__default['default'](self.sliceSerialize(token))
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
      }

      module.exports = characterReference;

      /***/
    },

    /***/ 3268: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var prefixSize = __nccwpck_require__(3722);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);

      var codeFenced = {
        name: 'codeFenced',
        tokenize: tokenizeCodeFenced,
        concrete: true,
      };

      function tokenizeCodeFenced(effects, ok, nok) {
        var self = this;
        var closingFenceConstruct = {
          tokenize: tokenizeClosingFence,
          partial: true,
        };
        var initialPrefix = prefixSize(this.events, 'linePrefix');
        var sizeOpen = 0;
        var marker;
        return start;

        function start(code) {
          effects.enter('codeFenced');
          effects.enter('codeFencedFence');
          effects.enter('codeFencedFenceSequence');
          marker = code;
          return sequenceOpen(code);
        }

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

        function openAfter(code) {
          effects.exit('codeFencedFence');
          return self.interrupt ? ok(code) : content(code);
        }

        function content(code) {
          if (code === null) {
            return after(code);
          }

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return effects.attempt(
              closingFenceConstruct,
              after,
              initialPrefix
                ? factorySpace(
                    effects,
                    content,
                    'linePrefix',
                    initialPrefix + 1
                  )
                : content
            );
          }

          effects.enter('codeFlowValue');
          return contentContinue(code);
        }

        function contentContinue(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('codeFlowValue');
            return content(code);
          }

          effects.consume(code);
          return contentContinue;
        }

        function after(code) {
          effects.exit('codeFenced');
          return ok(code);
        }

        function tokenizeClosingFence(effects, ok, nok) {
          var size = 0;
          return factorySpace(
            effects,
            closingSequenceStart,
            'linePrefix',
            this.parser.constructs.disable.null.indexOf('codeIndented') > -1
              ? undefined
              : 4
          );

          function closingSequenceStart(code) {
            effects.enter('codeFencedFence');
            effects.enter('codeFencedFenceSequence');
            return closingSequence(code);
          }

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

          function closingSequenceEnd(code) {
            if (code === null || markdownLineEnding(code)) {
              effects.exit('codeFencedFence');
              return ok(code);
            }

            return nok(code);
          }
        }
      }

      module.exports = codeFenced;

      /***/
    },

    /***/ 907: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var chunkedSplice = __nccwpck_require__(778);
      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var prefixSize = __nccwpck_require__(3722);

      var codeIndented = {
        name: 'codeIndented',
        tokenize: tokenizeCodeIndented,
        resolve: resolveCodeIndented,
      };
      var indentedContentConstruct = {
        tokenize: tokenizeIndentedContent,
        partial: true,
      };

      function resolveCodeIndented(events, context) {
        var code = {
          type: 'codeIndented',
          start: events[0][1].start,
          end: events[events.length - 1][1].end,
        };
        chunkedSplice(events, 0, 0, [['enter', code, context]]);
        chunkedSplice(events, events.length, 0, [['exit', code, context]]);
        return events;
      }

      function tokenizeCodeIndented(effects, ok, nok) {
        return effects.attempt(indentedContentConstruct, afterPrefix, nok);

        function afterPrefix(code) {
          if (code === null) {
            return ok(code);
          }

          if (markdownLineEnding(code)) {
            return effects.attempt(
              indentedContentConstruct,
              afterPrefix,
              ok
            )(code);
          }

          effects.enter('codeFlowValue');
          return content(code);
        }

        function content(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('codeFlowValue');
            return afterPrefix(code);
          }

          effects.consume(code);
          return content;
        }
      }

      function tokenizeIndentedContent(effects, ok, nok) {
        var self = this;
        return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1);

        function afterPrefix(code) {
          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1);
          }

          return prefixSize(self.events, 'linePrefix') < 4
            ? nok(code)
            : ok(code);
        }
      }

      module.exports = codeIndented;

      /***/
    },

    /***/ 7033: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);

      var codeText = {
        name: 'codeText',
        tokenize: tokenizeCodeText,
        resolve: resolveCodeText,
        previous: previous,
      };

      function resolveCodeText(events) {
        var tailExitIndex = events.length - 4;
        var headEnterIndex = 3;
        var index;
        var enter; // If we start and end with an EOL or a space.

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
              events[tailExitIndex][1].type = events[headEnterIndex][1].type =
                'codeTextPadding';
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

      function previous(code) {
        // If there is a previous code, there will always be a tail.
        return (
          code !== 96 ||
          this.events[this.events.length - 1][1].type === 'characterEscape'
        );
      }

      function tokenizeCodeText(effects, ok, nok) {
        var sizeOpen = 0;
        var size;
        var token;
        return start;

        function start(code) {
          effects.enter('codeText');
          effects.enter('codeTextSequence');
          return openingSequence(code);
        }

        function openingSequence(code) {
          if (code === 96) {
            effects.consume(code);
            sizeOpen++;
            return openingSequence;
          }

          effects.exit('codeTextSequence');
          return gap(code);
        }

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
      }

      module.exports = codeText;

      /***/
    },

    /***/ 1259: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var prefixSize = __nccwpck_require__(3722);
      var subtokenize = __nccwpck_require__(14);

      // No name because it must not be turned off.
      var content = {
        tokenize: tokenizeContent,
        resolve: resolveContent,
        interruptible: true,
        lazy: true,
      };
      var continuationConstruct = {
        tokenize: tokenizeContinuation,
        partial: true,
      }; // Content is transparent: it’s parsed right now. That way, definitions are also
      // parsed right now: before text in paragraphs (specifically, media) are parsed.

      function resolveContent(events) {
        subtokenize(events);
        return events;
      }

      function tokenizeContent(effects, ok) {
        var previous;
        return start;

        function start(code) {
          effects.enter('content');
          previous = effects.enter('chunkContent', {
            contentType: 'content',
          });
          return data(code);
        }

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

        function contentEnd(code) {
          effects.exit('chunkContent');
          effects.exit('content');
          return ok(code);
        }

        function contentContinue(code) {
          effects.consume(code);
          effects.exit('chunkContent');
          previous = previous.next = effects.enter('chunkContent', {
            contentType: 'content',
            previous: previous,
          });
          return data;
        }
      }

      function tokenizeContinuation(effects, ok, nok) {
        var self = this;
        return startLookahead;

        function startLookahead(code) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, prefixed, 'linePrefix');
        }

        function prefixed(code) {
          if (code === null || markdownLineEnding(code)) {
            return nok(code);
          }

          if (
            self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
            prefixSize(self.events, 'linePrefix') < 4
          ) {
            return effects.interrupt(
              self.parser.constructs.flow,
              nok,
              ok
            )(code);
          }

          return ok(code);
        }
      }

      module.exports = content;

      /***/
    },

    /***/ 1193: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var normalizeIdentifier = __nccwpck_require__(712);
      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var factoryDestination = __nccwpck_require__(9851);
      var factoryLabel = __nccwpck_require__(349);
      var factoryWhitespace = __nccwpck_require__(3168);
      var factoryTitle = __nccwpck_require__(9469);

      var definition = {
        name: 'definition',
        tokenize: tokenizeDefinition,
      };
      var titleConstruct = {
        tokenize: tokenizeTitle,
        partial: true,
      };

      function tokenizeDefinition(effects, ok, nok) {
        var self = this;
        var identifier;
        return start;

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

        function after(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('definition');

            if (self.parser.defined.indexOf(identifier) < 0) {
              self.parser.defined.push(identifier);
            }

            return ok(code);
          }

          return nok(code);
        }
      }

      function tokenizeTitle(effects, ok, nok) {
        return start;

        function start(code) {
          return markdownLineEndingOrSpace(code)
            ? factoryWhitespace(effects, before)(code)
            : nok(code);
        }

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

        function after(code) {
          return code === null || markdownLineEnding(code)
            ? ok(code)
            : nok(code);
        }
      }

      module.exports = definition;

      /***/
    },

    /***/ 9851: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var asciiControl = __nccwpck_require__(1336);

      // eslint-disable-next-line max-params
      function destinationFactory(
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
        var limit = max || Infinity;
        var balance = 0;
        return start;

        function start(code) {
          if (code === 60) {
            effects.enter(type);
            effects.enter(literalType);
            effects.enter(literalMarkerType);
            effects.consume(code);
            effects.exit(literalMarkerType);
            return destinationEnclosedBefore;
          }

          if (asciiControl(code)) {
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

        function destinationEnclosedEscape(code) {
          if (code === 60 || code === 62 || code === 92) {
            effects.consume(code);
            return destinationEnclosed;
          }

          return destinationEnclosed(code);
        }

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

        function destinationRawEscape(code) {
          if (code === 40 || code === 41 || code === 92) {
            effects.consume(code);
            return destinationRaw;
          }

          return destinationRaw(code);
        }
      }

      module.exports = destinationFactory;

      /***/
    },

    /***/ 349: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);

      // eslint-disable-next-line max-params
      function labelFactory(effects, ok, nok, type, markerType, stringType) {
        var self = this;
        var size = 0;
        var data;
        return start;

        function start(code) {
          effects.enter(type);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.enter(stringType);
          return atBreak;
        }

        function atBreak(code) {
          if (
            code === null ||
            code === 91 ||
            (code === 93 && !data) ||
            /* c8 ignore next */
            (code === 94 &&
              /* c8 ignore next */
              !size &&
              /* c8 ignore next */
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

        function labelEscape(code) {
          if (code === 91 || code === 92 || code === 93) {
            effects.consume(code);
            size++;
            return label;
          }

          return label(code);
        }
      }

      module.exports = labelFactory;

      /***/
    },

    /***/ 8200: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownSpace = __nccwpck_require__(5989);

      function spaceFactory(effects, ok, type, max) {
        var limit = max ? max - 1 : Infinity;
        var size = 0;
        return start;

        function start(code) {
          if (markdownSpace(code)) {
            effects.enter(type);
            return prefix(code);
          }

          return ok(code);
        }

        function prefix(code) {
          if (markdownSpace(code) && size++ < limit) {
            effects.consume(code);
            return prefix;
          }

          effects.exit(type);
          return ok(code);
        }
      }

      module.exports = spaceFactory;

      /***/
    },

    /***/ 9469: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);

      function titleFactory(effects, ok, nok, type, markerType, stringType) {
        var marker;
        return start;

        function start(code) {
          effects.enter(type);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          marker = code === 40 ? 41 : code;
          return atFirstTitleBreak;
        }

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

        function title(code) {
          if (code === marker || code === null || markdownLineEnding(code)) {
            effects.exit('chunkString');
            return atTitleBreak(code);
          }

          effects.consume(code);
          return code === 92 ? titleEscape : title;
        }

        function titleEscape(code) {
          if (code === marker || code === 92) {
            effects.consume(code);
            return title;
          }

          return title(code);
        }
      }

      module.exports = titleFactory;

      /***/
    },

    /***/ 3168: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);

      function whitespaceFactory(effects, ok) {
        var seen;
        return start;

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
      }

      module.exports = whitespaceFactory;

      /***/
    },

    /***/ 7608: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);

      var hardBreakEscape = {
        name: 'hardBreakEscape',
        tokenize: tokenizeHardBreakEscape,
      };

      function tokenizeHardBreakEscape(effects, ok, nok) {
        return start;

        function start(code) {
          effects.enter('hardBreakEscape');
          effects.enter('escapeMarker');
          effects.consume(code);
          return open;
        }

        function open(code) {
          if (markdownLineEnding(code)) {
            effects.exit('escapeMarker');
            effects.exit('hardBreakEscape');
            return ok(code);
          }

          return nok(code);
        }
      }

      module.exports = hardBreakEscape;

      /***/
    },

    /***/ 4558: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var chunkedSplice = __nccwpck_require__(778);
      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);

      var headingAtx = {
        name: 'headingAtx',
        tokenize: tokenizeHeadingAtx,
        resolve: resolveHeadingAtx,
      };

      function resolveHeadingAtx(events, context) {
        var contentEnd = events.length - 2;
        var contentStart = 3;
        var content;
        var text; // Prefix whitespace, part of the opening.

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
            contentType: 'text',
          };
          chunkedSplice(events, contentStart, contentEnd - contentStart + 1, [
            ['enter', content, context],
            ['enter', text, context],
            ['exit', text, context],
            ['exit', content, context],
          ]);
        }

        return events;
      }

      function tokenizeHeadingAtx(effects, ok, nok) {
        var self = this;
        var size = 0;
        return start;

        function start(code) {
          effects.enter('atxHeading');
          effects.enter('atxHeadingSequence');
          return fenceOpenInside(code);
        }

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

        function sequence(code) {
          if (code === 35) {
            effects.consume(code);
            return sequence;
          }

          effects.exit('atxHeadingSequence');
          return headingBreak(code);
        }

        function data(code) {
          if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
            effects.exit('atxHeadingText');
            return headingBreak(code);
          }

          effects.consume(code);
          return data;
        }
      }

      module.exports = headingAtx;

      /***/
    },

    /***/ 6791: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var fromCharCode = __nccwpck_require__(3531);
      var asciiAlphanumeric = __nccwpck_require__(598);
      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);
      var partialBlankLine = __nccwpck_require__(2244);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var asciiAlpha = __nccwpck_require__(3847);
      var htmlBlockNames = __nccwpck_require__(5159);
      var htmlRawNames = __nccwpck_require__(4677);

      var htmlFlow = {
        name: 'htmlFlow',
        tokenize: tokenizeHtmlFlow,
        resolveTo: resolveToHtmlFlow,
        concrete: true,
      };
      var nextBlankConstruct = {
        tokenize: tokenizeNextBlank,
        partial: true,
      };

      function resolveToHtmlFlow(events) {
        var index = events.length;

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

      function tokenizeHtmlFlow(effects, ok, nok) {
        var self = this;
        var kind;
        var startTag;
        var buffer;
        var index;
        var marker;
        return start;

        function start(code) {
          effects.enter('htmlFlow');
          effects.enter('htmlFlowData');
          effects.consume(code);
          return open;
        }

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
            buffer = fromCharCode(code);
            startTag = true;
            return tagName;
          }

          return nok(code);
        }

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

        function commentOpenInside(code) {
          if (code === 45) {
            effects.consume(code);
            return self.interrupt ? ok : continuationDeclarationInside;
          }

          return nok(code);
        }

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

        function tagCloseStart(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            buffer = fromCharCode(code);
            return tagName;
          }

          return nok(code);
        }

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
              htmlRawNames.indexOf(buffer.toLowerCase()) > -1
            ) {
              kind = 1;
              return self.interrupt ? ok(code) : continuation(code);
            }

            if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
              kind = 6;

              if (code === 47) {
                effects.consume(code);
                return basicSelfClosing;
              }

              return self.interrupt ? ok(code) : continuation(code);
            }

            kind = 7; // Do not support complete HTML when interrupting.

            return self.interrupt
              ? nok(code)
              : startTag
              ? completeAttributeNameBefore(code)
              : completeClosingTagAfter(code);
          }

          if (code === 45 || asciiAlphanumeric(code)) {
            effects.consume(code);
            buffer += fromCharCode(code);
            return tagName;
          }

          return nok(code);
        }

        function basicSelfClosing(code) {
          if (code === 62) {
            effects.consume(code);
            return self.interrupt ? ok : continuation;
          }

          return nok(code);
        }

        function completeClosingTagAfter(code) {
          if (markdownSpace(code)) {
            effects.consume(code);
            return completeClosingTagAfter;
          }

          return completeEnd(code);
        }

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

          marker = undefined;
          return completeAttributeValueUnquoted(code);
        }

        function completeAttributeValueQuoted(code) {
          if (code === marker) {
            effects.consume(code);
            return completeAttributeValueQuotedAfter;
          }

          if (code === null || markdownLineEnding(code)) {
            return nok(code);
          }

          effects.consume(code);
          return completeAttributeValueQuoted;
        }

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

        function completeAttributeValueQuotedAfter(code) {
          if (code === 47 || code === 62 || markdownSpace(code)) {
            return completeAttributeNameBefore(code);
          }

          return nok(code);
        }

        function completeEnd(code) {
          if (code === 62) {
            effects.consume(code);
            return completeAfter;
          }

          return nok(code);
        }

        function completeAfter(code) {
          if (markdownSpace(code)) {
            effects.consume(code);
            return completeAfter;
          }

          return code === null || markdownLineEnding(code)
            ? continuation(code)
            : nok(code);
        }

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

        function continuationAtLineEnding(code) {
          effects.exit('htmlFlowData');
          return htmlContinueStart(code);
        }

        function htmlContinueStart(code) {
          if (code === null) {
            return done(code);
          }

          if (markdownLineEnding(code)) {
            effects.enter('lineEnding');
            effects.consume(code);
            effects.exit('lineEnding');
            return htmlContinueStart;
          }

          effects.enter('htmlFlowData');
          return continuation(code);
        }

        function continuationCommentInside(code) {
          if (code === 45) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          return continuation(code);
        }

        function continuationRawTagOpen(code) {
          if (code === 47) {
            effects.consume(code);
            buffer = '';
            return continuationRawEndTag;
          }

          return continuation(code);
        }

        function continuationRawEndTag(code) {
          if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
            effects.consume(code);
            return continuationClose;
          }

          if (asciiAlpha(code) && buffer.length < 8) {
            effects.consume(code);
            buffer += fromCharCode(code);
            return continuationRawEndTag;
          }

          return continuation(code);
        }

        function continuationCharacterDataInside(code) {
          if (code === 93) {
            effects.consume(code);
            return continuationDeclarationInside;
          }

          return continuation(code);
        }

        function continuationDeclarationInside(code) {
          if (code === 62) {
            effects.consume(code);
            return continuationClose;
          }

          return continuation(code);
        }

        function continuationClose(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('htmlFlowData');
            return done(code);
          }

          effects.consume(code);
          return continuationClose;
        }

        function done(code) {
          effects.exit('htmlFlow');
          return ok(code);
        }
      }

      function tokenizeNextBlank(effects, ok, nok) {
        return start;

        function start(code) {
          effects.exit('htmlFlowData');
          effects.enter('lineEndingBlank');
          effects.consume(code);
          effects.exit('lineEndingBlank');
          return effects.attempt(partialBlankLine, ok, nok);
        }
      }

      module.exports = htmlFlow;

      /***/
    },

    /***/ 7743: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var asciiAlphanumeric = __nccwpck_require__(598);
      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var asciiAlpha = __nccwpck_require__(3847);

      var htmlText = {
        name: 'htmlText',
        tokenize: tokenizeHtmlText,
      };

      function tokenizeHtmlText(effects, ok, nok) {
        var self = this;
        var marker;
        var buffer;
        var index;
        var returnState;
        return start;

        function start(code) {
          effects.enter('htmlText');
          effects.enter('htmlTextData');
          effects.consume(code);
          return open;
        }

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

        function commentOpen(code) {
          if (code === 45) {
            effects.consume(code);
            return commentStart;
          }

          return nok(code);
        }

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

        function commentStartDash(code) {
          if (code === null || code === 62) {
            return nok(code);
          }

          return comment(code);
        }

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

        function commentClose(code) {
          if (code === 45) {
            effects.consume(code);
            return end;
          }

          return comment(code);
        }

        function cdataOpen(code) {
          if (code === buffer.charCodeAt(index++)) {
            effects.consume(code);
            return index === buffer.length ? cdata : cdataOpen;
          }

          return nok(code);
        }

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

        function cdataClose(code) {
          if (code === 93) {
            effects.consume(code);
            return cdataEnd;
          }

          return cdata(code);
        }

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

        function instructionClose(code) {
          return code === 62 ? end(code) : instruction(code);
        }

        function tagCloseStart(code) {
          if (asciiAlpha(code)) {
            effects.consume(code);
            return tagClose;
          }

          return nok(code);
        }

        function tagClose(code) {
          if (code === 45 || asciiAlphanumeric(code)) {
            effects.consume(code);
            return tagClose;
          }

          return tagCloseBetween(code);
        }

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

        function tagOpenAttributeValueQuotedAfter(code) {
          if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
            return tagOpenBetween(code);
          }

          return nok(code);
        }

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

        function atLineEnding(code) {
          effects.exit('htmlTextData');
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(
            effects,
            afterPrefix,
            'linePrefix',
            self.parser.constructs.disable.null.indexOf('codeIndented') > -1
              ? undefined
              : 4
          );
        }

        function afterPrefix(code) {
          effects.enter('htmlTextData');
          return returnState(code);
        }

        function end(code) {
          if (code === 62) {
            effects.consume(code);
            effects.exit('htmlTextData');
            effects.exit('htmlText');
            return ok;
          }

          return nok(code);
        }
      }

      module.exports = htmlText;

      /***/
    },

    /***/ 9797: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var chunkedSplice = __nccwpck_require__(778);
      var chunkedPush = __nccwpck_require__(4455);
      var normalizeIdentifier = __nccwpck_require__(712);
      var shallow = __nccwpck_require__(1479);
      var resolveAll = __nccwpck_require__(2004);
      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var factoryDestination = __nccwpck_require__(9851);
      var factoryLabel = __nccwpck_require__(349);
      var factoryWhitespace = __nccwpck_require__(3168);
      var factoryTitle = __nccwpck_require__(9469);

      var labelEnd = {
        name: 'labelEnd',
        tokenize: tokenizeLabelEnd,
        resolveTo: resolveToLabelEnd,
        resolveAll: resolveAllLabelEnd,
      };
      var resourceConstruct = {
        tokenize: tokenizeResource,
      };
      var fullReferenceConstruct = {
        tokenize: tokenizeFullReference,
      };
      var collapsedReferenceConstruct = {
        tokenize: tokenizeCollapsedReference,
      };

      function resolveAllLabelEnd(events) {
        var index = -1;
        var token;

        while (++index < events.length) {
          token = events[index][1];

          if (
            !token._used &&
            (token.type === 'labelImage' ||
              token.type === 'labelLink' ||
              token.type === 'labelEnd')
          ) {
            // Remove the marker.
            events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
            token.type = 'data';
            index++;
          }
        }

        return events;
      }

      function resolveToLabelEnd(events, context) {
        var index = events.length;
        var offset = 0;
        var group;
        var label;
        var text;
        var token;
        var open;
        var close;
        var media; // Find an opening.

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

        group = {
          type: events[open][1].type === 'labelLink' ? 'link' : 'image',
          start: shallow(events[open][1].start),
          end: shallow(events[events.length - 1][1].end),
        };
        label = {
          type: 'label',
          start: shallow(events[open][1].start),
          end: shallow(events[close][1].end),
        };
        text = {
          type: 'labelText',
          start: shallow(events[open + offset + 2][1].end),
          end: shallow(events[close - 2][1].start),
        };
        media = [
          ['enter', group, context],
          ['enter', label, context],
        ]; // Opening marker.

        media = chunkedPush(media, events.slice(open + 1, open + offset + 3)); // Text open.

        media = chunkedPush(media, [['enter', text, context]]); // Between.

        media = chunkedPush(
          media,
          resolveAll(
            context.parser.constructs.insideSpan.null,
            events.slice(open + offset + 4, close - 3),
            context
          )
        ); // Text close, marker close, label close.

        media = chunkedPush(media, [
          ['exit', text, context],
          events[close - 2],
          events[close - 1],
          ['exit', label, context],
        ]); // Reference, resource, or so.

        media = chunkedPush(media, events.slice(close + 1)); // Media close.

        media = chunkedPush(media, [['exit', group, context]]);
        chunkedSplice(events, open, events.length, media);
        return events;
      }

      function tokenizeLabelEnd(effects, ok, nok) {
        var self = this;
        var index = self.events.length;
        var labelStart;
        var defined; // Find an opening.

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

        function start(code) {
          if (!labelStart) {
            return nok(code);
          } // It’s a balanced bracket, but contains a link.

          if (labelStart._inactive) return balanced(code);
          defined =
            self.parser.defined.indexOf(
              normalizeIdentifier(
                self.sliceSerialize({
                  start: labelStart.end,
                  end: self.now(),
                })
              )
            ) > -1;
          effects.enter('labelEnd');
          effects.enter('labelMarker');
          effects.consume(code);
          effects.exit('labelMarker');
          effects.exit('labelEnd');
          return afterLabelEnd;
        }

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

        function balanced(code) {
          labelStart._balanced = true;
          return nok(code);
        }
      }

      function tokenizeResource(effects, ok, nok) {
        return start;

        function start(code) {
          effects.enter('resource');
          effects.enter('resourceMarker');
          effects.consume(code);
          effects.exit('resourceMarker');
          return factoryWhitespace(effects, open);
        }

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
            3
          )(code);
        }

        function destinationAfter(code) {
          return markdownLineEndingOrSpace(code)
            ? factoryWhitespace(effects, between)(code)
            : end(code);
        }

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

      function tokenizeFullReference(effects, ok, nok) {
        var self = this;
        return start;

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

        function afterLabel(code) {
          return self.parser.defined.indexOf(
            normalizeIdentifier(
              self
                .sliceSerialize(self.events[self.events.length - 1][1])
                .slice(1, -1)
            )
          ) < 0
            ? nok(code)
            : ok(code);
        }
      }

      function tokenizeCollapsedReference(effects, ok, nok) {
        return start;

        function start(code) {
          effects.enter('reference');
          effects.enter('referenceMarker');
          effects.consume(code);
          effects.exit('referenceMarker');
          return open;
        }

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
      }

      module.exports = labelEnd;

      /***/
    },

    /***/ 7860: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var labelEnd = __nccwpck_require__(9797);

      var labelStartImage = {
        name: 'labelStartImage',
        tokenize: tokenizeLabelStartImage,
        resolveAll: labelEnd.resolveAll,
      };

      function tokenizeLabelStartImage(effects, ok, nok) {
        var self = this;
        return start;

        function start(code) {
          effects.enter('labelImage');
          effects.enter('labelImageMarker');
          effects.consume(code);
          effects.exit('labelImageMarker');
          return open;
        }

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

        function after(code) {
          /* c8 ignore next */
          return code === 94 &&
            /* c8 ignore next */
            '_hiddenFootnoteSupport' in self.parser.constructs
            ? /* c8 ignore next */
              nok(code)
            : ok(code);
        }
      }

      module.exports = labelStartImage;

      /***/
    },

    /***/ 5908: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var labelEnd = __nccwpck_require__(9797);

      var labelStartLink = {
        name: 'labelStartLink',
        tokenize: tokenizeLabelStartLink,
        resolveAll: labelEnd.resolveAll,
      };

      function tokenizeLabelStartLink(effects, ok, nok) {
        var self = this;
        return start;

        function start(code) {
          effects.enter('labelLink');
          effects.enter('labelMarker');
          effects.consume(code);
          effects.exit('labelMarker');
          effects.exit('labelLink');
          return after;
        }

        function after(code) {
          /* c8 ignore next */
          return code === 94 &&
            /* c8 ignore next */
            '_hiddenFootnoteSupport' in self.parser.constructs
            ? /* c8 ignore next */
              nok(code)
            : ok(code);
        }
      }

      module.exports = labelStartLink;

      /***/
    },

    /***/ 5183: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var factorySpace = __nccwpck_require__(8200);

      var lineEnding = {
        name: 'lineEnding',
        tokenize: tokenizeLineEnding,
      };

      function tokenizeLineEnding(effects, ok) {
        return start;

        function start(code) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, ok, 'linePrefix');
        }
      }

      module.exports = lineEnding;

      /***/
    },

    /***/ 3107: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);
      var partialBlankLine = __nccwpck_require__(2244);
      var sizeChunks = __nccwpck_require__(5041);
      var prefixSize = __nccwpck_require__(3722);
      var asciiDigit = __nccwpck_require__(6996);
      var thematicBreak = __nccwpck_require__(5590);

      var list = {
        name: 'list',
        tokenize: tokenizeListStart,
        continuation: {
          tokenize: tokenizeListContinuation,
        },
        exit: tokenizeListEnd,
      };
      var listItemPrefixWhitespaceConstruct = {
        tokenize: tokenizeListItemPrefixWhitespace,
        partial: true,
      };
      var indentConstruct = {
        tokenize: tokenizeIndent,
        partial: true,
      };

      function tokenizeListStart(effects, ok, nok) {
        var self = this;
        var initialSize = prefixSize(self.events, 'linePrefix');
        var size = 0;
        return start;

        function start(code) {
          var kind =
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

        function atMarker(code) {
          effects.enter('listItemMarker');
          effects.consume(code);
          effects.exit('listItemMarker');
          self.containerState.marker = self.containerState.marker || code;
          return effects.check(
            partialBlankLine, // Can’t be empty when interrupting.
            self.interrupt ? nok : onBlank,
            effects.attempt(
              listItemPrefixWhitespaceConstruct,
              endOfPrefix,
              otherPrefix
            )
          );
        }

        function onBlank(code) {
          self.containerState.initialBlankLine = true;
          initialSize++;
          return endOfPrefix(code);
        }

        function otherPrefix(code) {
          if (markdownSpace(code)) {
            effects.enter('listItemPrefixWhitespace');
            effects.consume(code);
            effects.exit('listItemPrefixWhitespace');
            return endOfPrefix;
          }

          return nok(code);
        }

        function endOfPrefix(code) {
          self.containerState.size =
            initialSize +
            sizeChunks(self.sliceStream(effects.exit('listItemPrefix')));
          return ok(code);
        }
      }

      function tokenizeListContinuation(effects, ok, nok) {
        var self = this;
        self.containerState._closeFlow = undefined;
        return effects.check(partialBlankLine, onBlank, notBlank);

        function onBlank(code) {
          self.containerState.furtherBlankLines =
            self.containerState.furtherBlankLines ||
            self.containerState.initialBlankLine;
          return ok(code);
        }

        function notBlank(code) {
          if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
            self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
            return notInCurrentItem(code);
          }

          self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
          return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
        }

        function notInCurrentItem(code) {
          // While we do continue, we signal that the flow should be closed.
          self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

          self.interrupt = undefined;
          return factorySpace(
            effects,
            effects.attempt(list, ok, nok),
            'linePrefix',
            self.parser.constructs.disable.null.indexOf('codeIndented') > -1
              ? undefined
              : 4
          )(code);
        }
      }

      function tokenizeIndent(effects, ok, nok) {
        var self = this;
        return factorySpace(
          effects,
          afterPrefix,
          'listItemIndent',
          self.containerState.size + 1
        );

        function afterPrefix(code) {
          return prefixSize(self.events, 'listItemIndent') ===
            self.containerState.size
            ? ok(code)
            : nok(code);
        }
      }

      function tokenizeListEnd(effects) {
        effects.exit(this.containerState.type);
      }

      function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
        var self = this;
        return factorySpace(
          effects,
          afterPrefix,
          'listItemPrefixWhitespace',
          self.parser.constructs.disable.null.indexOf('codeIndented') > -1
            ? undefined
            : 4 + 1
        );

        function afterPrefix(code) {
          return markdownSpace(code) ||
            !prefixSize(self.events, 'listItemPrefixWhitespace')
            ? nok(code)
            : ok(code);
        }
      }

      module.exports = list;

      /***/
    },

    /***/ 2244: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);

      var partialBlankLine = {
        tokenize: tokenizePartialBlankLine,
        partial: true,
      };

      function tokenizePartialBlankLine(effects, ok, nok) {
        return factorySpace(effects, afterWhitespace, 'linePrefix');

        function afterWhitespace(code) {
          return code === null || markdownLineEnding(code)
            ? ok(code)
            : nok(code);
        }
      }

      module.exports = partialBlankLine;

      /***/
    },

    /***/ 1196: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var factorySpace = __nccwpck_require__(8200);
      var shallow = __nccwpck_require__(1479);

      var setextUnderline = {
        name: 'setextUnderline',
        tokenize: tokenizeSetextUnderline,
        resolveTo: resolveToSetextUnderline,
      };

      function resolveToSetextUnderline(events, context) {
        var index = events.length;
        var content;
        var text;
        var definition;
        var heading; // Find the opening of the content.
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

        heading = {
          type: 'setextHeading',
          start: shallow(events[text][1].start),
          end: shallow(events[events.length - 1][1].end),
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
          events[content][1].end = shallow(events[definition][1].end);
        } else {
          events[content][1] = heading;
        } // Add the heading exit at the end.

        events.push(['exit', heading, context]);
        return events;
      }

      function tokenizeSetextUnderline(effects, ok, nok) {
        var self = this;
        var index = self.events.length;
        var marker;
        var paragraph; // Find an opening.

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

        function start(code) {
          if (!self.lazy && (self.interrupt || paragraph)) {
            effects.enter('setextHeadingLine');
            effects.enter('setextHeadingLineSequence');
            marker = code;
            return closingSequence(code);
          }

          return nok(code);
        }

        function closingSequence(code) {
          if (code === marker) {
            effects.consume(code);
            return closingSequence;
          }

          effects.exit('setextHeadingLineSequence');
          return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code);
        }

        function closingSequenceEnd(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('setextHeadingLine');
            return ok(code);
          }

          return nok(code);
        }
      }

      module.exports = setextUnderline;

      /***/
    },

    /***/ 5590: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEnding = __nccwpck_require__(7506);
      var markdownSpace = __nccwpck_require__(5989);
      var factorySpace = __nccwpck_require__(8200);

      var thematicBreak = {
        name: 'thematicBreak',
        tokenize: tokenizeThematicBreak,
      };

      function tokenizeThematicBreak(effects, ok, nok) {
        var size = 0;
        var marker;
        return start;

        function start(code) {
          effects.enter('thematicBreak');
          marker = code;
          return atBreak(code);
        }

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

        function sequence(code) {
          if (code === marker) {
            effects.consume(code);
            size++;
            return sequence;
          }

          effects.exit('thematicBreakSequence');
          return atBreak(code);
        }
      }

      module.exports = thematicBreak;

      /***/
    },

    /***/ 4455: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var chunkedSplice = __nccwpck_require__(778);

      function chunkedPush(list, items) {
        if (list.length) {
          chunkedSplice(list, list.length, 0, items);
          return list;
        }

        return items;
      }

      module.exports = chunkedPush;

      /***/
    },

    /***/ 778: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var splice = __nccwpck_require__(2366);

      // causes a stack overflow in V8 when trying to insert 100k items for instance.

      function chunkedSplice(list, start, remove, items) {
        var end = list.length;
        var chunkStart = 0;
        var parameters; // Make start between zero and `end` (included).

        if (start < 0) {
          start = -start > end ? 0 : end + start;
        } else {
          start = start > end ? end : start;
        }

        remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

        if (items.length < 10000) {
          parameters = Array.from(items);
          parameters.unshift(start, remove);
          splice.apply(list, parameters);
        } else {
          // Delete `remove` items starting from `start`
          if (remove) splice.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

          while (chunkStart < items.length) {
            parameters = items.slice(chunkStart, chunkStart + 10000);
            parameters.unshift(start, 0);
            splice.apply(list, parameters);
            chunkStart += 10000;
            start += 10000;
          }
        }
      }

      module.exports = chunkedSplice;

      /***/
    },

    /***/ 1324: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var markdownLineEndingOrSpace = __nccwpck_require__(9180);
      var unicodePunctuation = __nccwpck_require__(9372);
      var unicodeWhitespace = __nccwpck_require__(9968);

      // Classify whether a character is unicode whitespace, unicode punctuation, or
      // anything else.
      // Used for attention (emphasis, strong), whose sequences can open or close
      // based on the class of surrounding characters.
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
      }

      module.exports = classifyCharacter;

      /***/
    },

    /***/ 8602: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var hasOwnProperty = __nccwpck_require__(3500);
      var chunkedSplice = __nccwpck_require__(778);
      var miniflat = __nccwpck_require__(9042);

      function combineExtensions(extensions) {
        var all = {};
        var index = -1;

        while (++index < extensions.length) {
          extension(all, extensions[index]);
        }

        return all;
      }

      function extension(all, extension) {
        var hook;
        var left;
        var right;
        var code;

        for (hook in extension) {
          left = hasOwnProperty.call(all, hook) ? all[hook] : (all[hook] = {});
          right = extension[hook];

          for (code in right) {
            left[code] = constructs(
              miniflat(right[code]),
              hasOwnProperty.call(left, code) ? left[code] : []
            );
          }
        }
      }

      function constructs(list, existing) {
        var index = -1;
        var before = [];

        while (++index < list.length) {
          (list[index].add === 'after' ? existing : before).push(list[index]);
        }

        chunkedSplice(existing, 0, 0, before);
        return existing;
      }

      module.exports = combineExtensions;

      /***/
    },

    /***/ 4845: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var assign = __nccwpck_require__(3512);
      var chunkedSplice = __nccwpck_require__(778);
      var chunkedPush = __nccwpck_require__(4455);
      var miniflat = __nccwpck_require__(9042);
      var markdownLineEnding = __nccwpck_require__(7506);
      var shallow = __nccwpck_require__(1479);
      var resolveAll = __nccwpck_require__(2004);
      var serializeChunks = __nccwpck_require__(4363);
      var sliceChunks = __nccwpck_require__(7271);

      // Create a tokenizer.
      // Tokenizers deal with one type of data (e.g., containers, flow, text).
      // The parser is the object dealing with it all.
      // `initialize` works like other constructs, except that only its `tokenize`
      // function is used, in which case it doesn’t receive an `ok` or `nok`.
      // `from` can be given to set the point before the first character, although
      // when further lines are indented, they must be set with `defineSkip`.
      function createTokenizer(parser, initialize, from) {
        var point = from
          ? shallow(from)
          : {
              line: 1,
              column: 1,
              offset: 0,
            };
        var columnStart = {};
        var resolveAllConstructs = [];
        var chunks = [];
        var stack = [];

        var effects = {
          consume: consume,
          enter: enter,
          exit: exit,
          attempt: constructFactory(onsuccessfulconstruct),
          check: constructFactory(onsuccessfulcheck),
          interrupt: constructFactory(onsuccessfulcheck, {
            interrupt: true,
          }),
          lazy: constructFactory(onsuccessfulcheck, {
            lazy: true,
          }),
        }; // State and tools for resolving and serializing.

        var context = {
          previous: null,
          events: [],
          parser: parser,
          sliceStream: sliceStream,
          sliceSerialize: sliceSerialize,
          now: now,
          defineSkip: skip,
          write: write,
        }; // The state function.

        var state = initialize.tokenize.call(context, effects); // Track which character we expect to be consumed, to catch bugs.

        if (initialize.resolveAll) {
          resolveAllConstructs.push(initialize);
        } // Store where we are in the input stream.

        point._index = 0;
        point._bufferIndex = -1;
        return context;

        function write(slice) {
          chunks = chunkedPush(chunks, slice);
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

        function sliceSerialize(token) {
          return serializeChunks(sliceStream(token));
        }

        function sliceStream(token) {
          return sliceChunks(chunks, token);
        }

        function now() {
          return shallow(point);
        }

        function skip(value) {
          columnStart[value.line] = value.column;
          accountForPotentialSkip();
        } //
        // State management.
        //
        // Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
        // `consume`).
        // Here is where we walk through the chunks, which either include strings of
        // several characters, or numerical character codes.
        // The reason to do this in a loop instead of a call is so the stack can
        // drain.

        function main() {
          var chunkIndex;
          var chunk;

          while (point._index < chunks.length) {
            chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

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
        } // Deal with one code.

        function go(code) {
          state = state(code);
        } // Move a character forward.

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

            if (point._bufferIndex === chunks[point._index].length) {
              point._bufferIndex = -1;
              point._index++;
            }
          } // Expose the previous character.

          context.previous = code; // Mark as consumed.
        } // Start a token.

        function enter(type, fields) {
          var token = fields || {};
          token.type = type;
          token.start = now();
          context.events.push(['enter', token, context]);
          stack.push(token);
          return token;
        } // Stop a token.

        function exit(type) {
          var token = stack.pop();
          token.end = now();
          context.events.push(['exit', token, context]);
          return token;
        } // Use results.

        function onsuccessfulconstruct(construct, info) {
          addResult(construct, info.from);
        } // Discard results.

        function onsuccessfulcheck(construct, info) {
          info.restore();
        } // Factory to attempt/check/interrupt.

        function constructFactory(onreturn, fields) {
          return hook; // Handle either an object mapping codes to constructs, a list of
          // constructs, or a single construct.

          function hook(constructs, returnState, bogusState) {
            var listOfConstructs;
            var constructIndex;
            var currentConstruct;
            var info;
            return constructs.tokenize || 'length' in constructs
              ? handleListOfConstructs(miniflat(constructs))
              : handleMapOfConstructs;

            function handleMapOfConstructs(code) {
              if (code in constructs || null in constructs) {
                return handleListOfConstructs(
                  constructs.null
                    ? /* c8 ignore next */
                      miniflat(constructs[code]).concat(
                        miniflat(constructs.null)
                      )
                    : constructs[code]
                )(code);
              }

              return bogusState(code);
            }

            function handleListOfConstructs(list) {
              listOfConstructs = list;
              constructIndex = 0;
              return handleConstruct(list[constructIndex]);
            }

            function handleConstruct(construct) {
              return start;

              function start(code) {
                // To do: not nede to store if there is no bogus state, probably?
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
                  context.parser.constructs.disable.null.indexOf(
                    construct.name
                  ) > -1
                ) {
                  return nok();
                }

                return construct.tokenize.call(
                  fields ? assign({}, context, fields) : context,
                  effects,
                  ok,
                  nok
                )(code);
              }
            }

            function ok(code) {
              onreturn(currentConstruct, info);
              return returnState;
            }

            function nok(code) {
              info.restore();

              if (++constructIndex < listOfConstructs.length) {
                return handleConstruct(listOfConstructs[constructIndex]);
              }

              return bogusState;
            }
          }
        }

        function addResult(construct, from) {
          if (
            construct.resolveAll &&
            resolveAllConstructs.indexOf(construct) < 0
          ) {
            resolveAllConstructs.push(construct);
          }

          if (construct.resolve) {
            chunkedSplice(
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

        function store() {
          var startPoint = now();
          var startPrevious = context.previous;
          var startCurrentConstruct = context.currentConstruct;
          var startEventsIndex = context.events.length;
          var startStack = Array.from(stack);
          return {
            restore: restore,
            from: startEventsIndex,
          };

          function restore() {
            point = startPoint;
            context.previous = startPrevious;
            context.currentConstruct = startCurrentConstruct;
            context.events.length = startEventsIndex;
            stack = startStack;
            accountForPotentialSkip();
          }
        }

        function accountForPotentialSkip() {
          if (point.line in columnStart && point.column < 2) {
            point.column = columnStart[point.line];
            point.offset += columnStart[point.line] - 1;
          }
        }
      }

      module.exports = createTokenizer;

      /***/
    },

    /***/ 9042: /***/ (module) => {
      'use strict';

      function miniflat(value) {
        return value === null || value === undefined
          ? []
          : 'length' in value
          ? value
          : [value];
      }

      module.exports = miniflat;

      /***/
    },

    /***/ 6985: /***/ (module) => {
      'use strict';

      // chunks (replacement characters, tabs, or line endings).

      function movePoint(point, offset) {
        point.column += offset;
        point.offset += offset;
        point._bufferIndex += offset;
        return point;
      }

      module.exports = movePoint;

      /***/
    },

    /***/ 712: /***/ (module) => {
      'use strict';

      function normalizeIdentifier(value) {
        return (
          value // Collapse Markdown whitespace.
            .replace(/[\t\n\r ]+/g, ' ') // Trim.
            .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
            // counterpart is uppercased will result in a different uppercase
            // character.
            // Hence, to get that form, we perform both lower- and uppercase.
            // Upper case makes sure keys will not interact with default prototypal
            // methods: no object method is uppercase.
            .toLowerCase()
            .toUpperCase()
        );
      }

      module.exports = normalizeIdentifier;

      /***/
    },

    /***/ 3722: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var sizeChunks = __nccwpck_require__(5041);

      function prefixSize(events, type) {
        var tail = events[events.length - 1];
        if (!tail || tail[1].type !== type) return 0;
        return sizeChunks(tail[2].sliceStream(tail[1]));
      }

      module.exports = prefixSize;

      /***/
    },

    /***/ 1028: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var fromCharCode = __nccwpck_require__(3531);

      function regexCheck(regex) {
        return check;

        function check(code) {
          return regex.test(fromCharCode(code));
        }
      }

      module.exports = regexCheck;

      /***/
    },

    /***/ 2004: /***/ (module) => {
      'use strict';

      function resolveAll(constructs, events, context) {
        var called = [];
        var index = -1;
        var resolve;

        while (++index < constructs.length) {
          resolve = constructs[index].resolveAll;

          if (resolve && called.indexOf(resolve) < 0) {
            events = resolve(events, context);
            called.push(resolve);
          }
        }

        return events;
      }

      module.exports = resolveAll;

      /***/
    },

    /***/ 6214: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var fromCharCode = __nccwpck_require__(3531);

      function safeFromInt(value, base) {
        var code = parseInt(value, base);

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

        return fromCharCode(code);
      }

      module.exports = safeFromInt;

      /***/
    },

    /***/ 4363: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var fromCharCode = __nccwpck_require__(3531);

      function serializeChunks(chunks) {
        var index = -1;
        var result = [];
        var chunk;
        var value;
        var atTab;

        while (++index < chunks.length) {
          chunk = chunks[index];

          if (typeof chunk === 'string') {
            value = chunk;
          } else if (chunk === -5) {
            value = '\r';
          } else if (chunk === -4) {
            value = '\n';
          } else if (chunk === -3) {
            value = '\r' + '\n';
          } else if (chunk === -2) {
            value = '\t';
          } else if (chunk === -1) {
            if (atTab) continue;
            value = ' ';
          } else {
            // Currently only replacement character.
            value = fromCharCode(chunk);
          }

          atTab = chunk === -2;
          result.push(value);
        }

        return result.join('');
      }

      module.exports = serializeChunks;

      /***/
    },

    /***/ 1479: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var assign = __nccwpck_require__(3512);

      function shallow(object) {
        return assign({}, object);
      }

      module.exports = shallow;

      /***/
    },

    /***/ 5041: /***/ (module) => {
      'use strict';

      // Counts tabs based on their expanded size, and CR+LF as one character.

      function sizeChunks(chunks) {
        var index = -1;
        var size = 0;

        while (++index < chunks.length) {
          size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
        }

        return size;
      }

      module.exports = sizeChunks;

      /***/
    },

    /***/ 7271: /***/ (module) => {
      'use strict';

      function sliceChunks(chunks, token) {
        var startIndex = token.start._index;
        var startBufferIndex = token.start._bufferIndex;
        var endIndex = token.end._index;
        var endBufferIndex = token.end._bufferIndex;
        var view;

        if (startIndex === endIndex) {
          view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
        } else {
          view = chunks.slice(startIndex, endIndex);

          if (startBufferIndex > -1) {
            view[0] = view[0].slice(startBufferIndex);
          }

          if (endBufferIndex > 0) {
            view.push(chunks[endIndex].slice(0, endBufferIndex));
          }
        }

        return view;
      }

      module.exports = sliceChunks;

      /***/
    },

    /***/ 14: /***/ (module, __unused_webpack_exports, __nccwpck_require__) => {
      'use strict';

      var assign = __nccwpck_require__(3512);
      var chunkedSplice = __nccwpck_require__(778);
      var shallow = __nccwpck_require__(1479);

      function subtokenize(events) {
        var jumps = {};
        var index = -1;
        var event;
        var lineIndex;
        var otherIndex;
        var otherEvent;
        var parameters;
        var subevents;
        var more;

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
                  subevents[otherIndex][1].isInFirstContentOfListItem = true;
                  otherIndex++;
                }
              }
            }
          } // Enter.

          if (event[0] === 'enter') {
            if (event[1].contentType) {
              assign(jumps, subcontent(events, index));
              index = jumps[index];
              more = true;
            }
          } // Exit.
          else if (event[1]._container || event[1]._movePreviousLineEndings) {
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
              event[1].end = shallow(events[lineIndex][1].start); // Switch container exit w/ line endings.

              parameters = events.slice(lineIndex, index);
              parameters.unshift(event);
              chunkedSplice(
                events,
                lineIndex,
                index - lineIndex + 1,
                parameters
              );
            }
          }
        }

        return !more;
      }

      function subcontent(events, eventIndex) {
        var token = events[eventIndex][1];
        var context = events[eventIndex][2];
        var startPosition = eventIndex - 1;
        var startPositions = [];
        var tokenizer =
          token._tokenizer || context.parser[token.contentType](token.start);
        var childEvents = tokenizer.events;
        var jumps = [];
        var gaps = {};
        var stream;
        var previous;
        var index;
        var entered;
        var end;
        var adjust; // Loop forward through the linked tokens to pass them in order to the
        // subtokenizer.

        while (token) {
          // Find the position of the event for this token.
          while (events[++startPosition][1] !== token) {
            // Empty.
          }

          startPositions.push(startPosition);

          if (!token._tokenizer) {
            stream = context.sliceStream(token);

            if (!token.next) {
              stream.push(null);
            }

            if (previous) {
              tokenizer.defineSkip(token.start);
            }

            if (token.isInFirstContentOfListItem) {
              tokenizer._gfmTasklistFirstContentOfListItem = true;
            }

            tokenizer.write(stream);

            if (token.isInFirstContentOfListItem) {
              tokenizer._gfmTasklistFirstContentOfListItem = undefined;
            }
          } // Unravel the next token.

          previous = token;
          token = token.next;
        } // Now, loop back through all events (and linked tokens), to figure out which
        // parts belong where.

        token = previous;
        index = childEvents.length;

        while (index--) {
          // Make sure we’ve at least seen something (final eol is part of the last
          // token).
          if (childEvents[index][0] === 'enter') {
            entered = true;
          } else if (
            // Find a void token that includes a break.
            entered &&
            childEvents[index][1].type === childEvents[index - 1][1].type &&
            childEvents[index][1].start.line !== childEvents[index][1].end.line
          ) {
            add(childEvents.slice(index + 1, end));
            // Help GC.
            token._tokenizer = token.next = undefined;
            token = token.previous;
            end = index + 1;
          }
        }

        // Help GC.
        tokenizer.events = token._tokenizer = token.next = undefined; // Do head:

        add(childEvents.slice(0, end));
        index = -1;
        adjust = 0;

        while (++index < jumps.length) {
          gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
          adjust += jumps[index][1] - jumps[index][0] - 1;
        }

        return gaps;

        function add(slice) {
          var start = startPositions.pop();
          jumps.unshift([start, start + slice.length - 1]);
          chunkedSplice(events, start, 2, slice);
        }
      }

      module.exports = subtokenize;

      /***/
    },

    /***/ 3485: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var characterEntities = __nccwpck_require__(2661);

      module.exports = decodeEntity;

      var own = {}.hasOwnProperty;

      function decodeEntity(characters) {
        return own.call(characterEntities, characters)
          ? characterEntities[characters]
          : false;
      }

      /***/
    },

    /***/ 4859: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = parse;

      var fromMarkdown = __nccwpck_require__(3068);

      function parse(options) {
        var self = this;

        this.Parser = parse;

        function parse(doc) {
          return fromMarkdown(
            doc,
            Object.assign({}, self.data('settings'), options, {
              // Note: these options are not in the readme.
              // The goal is for them to be set by plugins on `data` instead of being
              // passed by users.
              extensions: self.data('micromarkExtensions') || [],
              mdastExtensions: self.data('fromMarkdownExtensions') || [],
            })
          );
        }
      }

      /***/
    },

    /***/ 7114: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = stringify;

      var toMarkdown = __nccwpck_require__(219);

      function stringify(options) {
        var self = this;

        this.Compiler = compile;

        function compile(tree) {
          return toMarkdown(
            tree,
            Object.assign({}, self.data('settings'), options, {
              // Note: this option is not in the readme.
              // The goal is for it to be set by plugins on `data` instead of being
              // passed by users.
              extensions: self.data('toMarkdownExtensions') || [],
            })
          );
        }
      }

      /***/
    },

    /***/ 5096: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var util = __nccwpck_require__(6184);

      module.exports = toc;

      var defaultHeading = 'toc|table[ -]of[ -]contents?';

      function toc(options) {
        var settings = options || {};
        var heading = settings.heading || defaultHeading;
        var depth = settings.maxDepth || 6;
        var tight = settings.tight;
        var skip = settings.skip;

        return transformer;

        function transformer(node) {
          var result = util(node, {
            heading: heading,
            maxDepth: depth,
            tight: tight,
            skip: skip,
          });

          if (result.index === null || result.index === -1 || !result.map) {
            return;
          }

          node.children = [].concat(
            node.children.slice(0, result.index),
            result.map,
            node.children.slice(result.endIndex)
          );
        }
      }

      /***/
    },

    /***/ 2081: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var unified = __nccwpck_require__(5075);
      var parse = __nccwpck_require__(4859);
      var stringify = __nccwpck_require__(7114);

      module.exports = unified().use(parse).use(stringify).freeze();

      /***/
    },

    /***/ 6976: /***/ (module) => {
      'use strict';
      /*!
       * repeat-string <https://github.com/jonschlinkert/repeat-string>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT License.
       */

      /**
       * Results cache
       */

      var res = '';
      var cache;

      /**
       * Expose `repeat`
       */

      module.exports = repeat;

      /**
       * Repeat the given `string` the specified `number`
       * of times.
       *
       * **Example:**
       *
       * ```js
       * var repeat = require('repeat-string');
       * repeat('A', 5);
       * //=> AAAAA
       * ```
       *
       * @param {String} `string` The string to repeat
       * @param {Number} `number` The number of times to repeat the string
       * @return {String} Repeated string
       * @api public
       */

      function repeat(str, num) {
        if (typeof str !== 'string') {
          throw new TypeError('expected a string');
        }

        // cover common, quick use cases
        if (num === 1) return str;
        if (num === 2) return str + str;

        var max = str.length * num;
        if (cache !== str || typeof cache === 'undefined') {
          cache = str;
          res = '';
        } else if (res.length >= max) {
          return res.substr(0, max);
        }

        while (max > res.length && num > 1) {
          if (num & 1) {
            res += str;
          }

          num >>= 1;
          str += str;
        }

        res += str;
        res = res.substr(0, max);
        return res;
      }

      /***/
    },

    /***/ 3604: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var wrap = __nccwpck_require__(3458);

      module.exports = trough;

      trough.wrap = wrap;

      var slice = [].slice;

      // Create new middleware.
      function trough() {
        var fns = [];
        var middleware = {};

        middleware.run = run;
        middleware.use = use;

        return middleware;

        // Run `fns`.  Last argument must be a completion handler.
        function run() {
          var index = -1;
          var input = slice.call(arguments, 0, -1);
          var done = arguments[arguments.length - 1];

          if (typeof done !== 'function') {
            throw new Error('Expected function as last argument, not ' + done);
          }

          next.apply(null, [null].concat(input));

          // Run the next `fn`, if any.
          function next(err) {
            var fn = fns[++index];
            var params = slice.call(arguments, 0);
            var values = params.slice(1);
            var length = input.length;
            var pos = -1;

            if (err) {
              done(err);
              return;
            }

            // Copy non-nully input into values.
            while (++pos < length) {
              if (values[pos] === null || values[pos] === undefined) {
                values[pos] = input[pos];
              }
            }

            input = values;

            // Next or done.
            if (fn) {
              wrap(fn, next).apply(null, input);
            } else {
              done.apply(null, [null].concat(input));
            }
          }
        }

        // Add `fn` to the list.
        function use(fn) {
          if (typeof fn !== 'function') {
            throw new Error('Expected `fn` to be a function, not ' + fn);
          }

          fns.push(fn);

          return middleware;
        }
      }

      /***/
    },

    /***/ 3458: /***/ (module) => {
      'use strict';

      var slice = [].slice;

      module.exports = wrap;

      // Wrap `fn`.
      // Can be sync or async; return a promise, receive a completion handler, return
      // new values and errors.
      function wrap(fn, callback) {
        var invoked;

        return wrapped;

        function wrapped() {
          var params = slice.call(arguments, 0);
          var callback = fn.length > params.length;
          var result;

          if (callback) {
            params.push(done);
          }

          try {
            result = fn.apply(null, params);
          } catch (error) {
            // Well, this is quite the pickle.
            // `fn` received a callback and invoked it (thus continuing the pipeline),
            // but later also threw an error.
            // We’re not about to restart the pipeline again, so the only thing left
            // to do is to throw the thing instead.
            if (callback && invoked) {
              throw error;
            }

            return done(error);
          }

          if (!callback) {
            if (result && typeof result.then === 'function') {
              result.then(then, done);
            } else if (result instanceof Error) {
              done(result);
            } else {
              then(result);
            }
          }
        }

        // Invoke `next`, only once.
        function done() {
          if (!invoked) {
            invoked = true;

            callback.apply(null, arguments);
          }
        }

        // Invoke `done` with one value.
        // Tracks if an error is passed, too.
        function then(value) {
          done(null, value);
        }
      }

      /***/
    },

    /***/ 5075: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var bail = __nccwpck_require__(7240);
      var buffer = __nccwpck_require__(8810);
      var extend = __nccwpck_require__(8171);
      var plain = __nccwpck_require__(4118);
      var trough = __nccwpck_require__(3604);
      var vfile = __nccwpck_require__(4860);

      // Expose a frozen processor.
      module.exports = unified().freeze();

      var slice = [].slice;
      var own = {}.hasOwnProperty;

      // Process pipeline.
      var pipeline = trough()
        .use(pipelineParse)
        .use(pipelineRun)
        .use(pipelineStringify);

      function pipelineParse(p, ctx) {
        ctx.tree = p.parse(ctx.file);
      }

      function pipelineRun(p, ctx, next) {
        p.run(ctx.tree, ctx.file, done);

        function done(err, tree, file) {
          if (err) {
            next(err);
          } else {
            ctx.tree = tree;
            ctx.file = file;
            next();
          }
        }
      }

      function pipelineStringify(p, ctx) {
        var result = p.stringify(ctx.tree, ctx.file);
        var file = ctx.file;

        if (result === undefined || result === null) {
          // Empty.
        } else if (typeof result === 'string' || buffer(result)) {
          file.contents = result;
        } else {
          file.result = result;
        }
      }

      // Function to create the first processor.
      function unified() {
        var attachers = [];
        var transformers = trough();
        var namespace = {};
        var frozen = false;
        var freezeIndex = -1;

        // Data management.
        processor.data = data;

        // Lock.
        processor.freeze = freeze;

        // Plugins.
        processor.attachers = attachers;
        processor.use = use;

        // API.
        processor.parse = parse;
        processor.stringify = stringify;
        processor.run = run;
        processor.runSync = runSync;
        processor.process = process;
        processor.processSync = processSync;

        // Expose.
        return processor;

        // Create a new processor based on the processor in the current scope.
        function processor() {
          var destination = unified();
          var length = attachers.length;
          var index = -1;

          while (++index < length) {
            destination.use.apply(null, attachers[index]);
          }

          destination.data(extend(true, {}, namespace));

          return destination;
        }

        // Freeze: used to signal a processor that has finished configuration.
        //
        // For example, take unified itself: it’s frozen.
        // Plugins should not be added to it.
        // Rather, it should be extended, by invoking it, before modifying it.
        //
        // In essence, always invoke this when exporting a processor.
        function freeze() {
          var values;
          var plugin;
          var options;
          var transformer;

          if (frozen) {
            return processor;
          }

          while (++freezeIndex < attachers.length) {
            values = attachers[freezeIndex];
            plugin = values[0];
            options = values[1];
            transformer = null;

            if (options === false) {
              continue;
            }

            if (options === true) {
              values[1] = undefined;
            }

            transformer = plugin.apply(processor, values.slice(1));

            if (typeof transformer === 'function') {
              transformers.use(transformer);
            }
          }

          frozen = true;
          freezeIndex = Infinity;

          return processor;
        }

        // Data management.
        // Getter / setter for processor-specific informtion.
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

        // Plugin management.
        //
        // Pass it:
        // *   an attacher and options,
        // *   a preset,
        // *   a list of presets, attachers, and arguments (list of attachers and
        //     options).
        function use(value) {
          var settings;

          assertUnfrozen('use', frozen);

          if (value === null || value === undefined) {
            // Empty.
          } else if (typeof value === 'function') {
            addPlugin.apply(null, arguments);
          } else if (typeof value === 'object') {
            if ('length' in value) {
              addList(value);
            } else {
              addPreset(value);
            }
          } else {
            throw new Error('Expected usable value, not `' + value + '`');
          }

          if (settings) {
            namespace.settings = extend(namespace.settings || {}, settings);
          }

          return processor;

          function addPreset(result) {
            addList(result.plugins);

            if (result.settings) {
              settings = extend(settings || {}, result.settings);
            }
          }

          function add(value) {
            if (typeof value === 'function') {
              addPlugin(value);
            } else if (typeof value === 'object') {
              if ('length' in value) {
                addPlugin.apply(null, value);
              } else {
                addPreset(value);
              }
            } else {
              throw new Error('Expected usable value, not `' + value + '`');
            }
          }

          function addList(plugins) {
            var length;
            var index;

            if (plugins === null || plugins === undefined) {
              // Empty.
            } else if (typeof plugins === 'object' && 'length' in plugins) {
              length = plugins.length;
              index = -1;

              while (++index < length) {
                add(plugins[index]);
              }
            } else {
              throw new Error(
                'Expected a list of plugins, not `' + plugins + '`'
              );
            }
          }

          function addPlugin(plugin, value) {
            var entry = find(plugin);

            if (entry) {
              if (plain(entry[1]) && plain(value)) {
                value = extend(entry[1], value);
              }

              entry[1] = value;
            } else {
              attachers.push(slice.call(arguments));
            }
          }
        }

        function find(plugin) {
          var length = attachers.length;
          var index = -1;
          var entry;

          while (++index < length) {
            entry = attachers[index];

            if (entry[0] === plugin) {
              return entry;
            }
          }
        }

        // Parse a file (in string or vfile representation) into a unist node using
        // the `Parser` on the processor.
        function parse(doc) {
          var file = vfile(doc);
          var Parser;

          freeze();
          Parser = processor.Parser;
          assertParser('parse', Parser);

          if (newable(Parser, 'parse')) {
            return new Parser(String(file), file).parse();
          }

          return Parser(String(file), file); // eslint-disable-line new-cap
        }

        // Run transforms on a unist node representation of a file (in string or
        // vfile representation), async.
        function run(node, file, cb) {
          assertNode(node);
          freeze();

          if (!cb && typeof file === 'function') {
            cb = file;
            file = null;
          }

          if (!cb) {
            return new Promise(executor);
          }

          executor(null, cb);

          function executor(resolve, reject) {
            transformers.run(node, vfile(file), done);

            function done(err, tree, file) {
              tree = tree || node;
              if (err) {
                reject(err);
              } else if (resolve) {
                resolve(tree);
              } else {
                cb(null, tree, file);
              }
            }
          }
        }

        // Run transforms on a unist node representation of a file (in string or
        // vfile representation), sync.
        function runSync(node, file) {
          var complete = false;
          var result;

          run(node, file, done);

          assertDone('runSync', 'run', complete);

          return result;

          function done(err, tree) {
            complete = true;
            bail(err);
            result = tree;
          }
        }

        // Stringify a unist node representation of a file (in string or vfile
        // representation) into a string using the `Compiler` on the processor.
        function stringify(node, doc) {
          var file = vfile(doc);
          var Compiler;

          freeze();
          Compiler = processor.Compiler;
          assertCompiler('stringify', Compiler);
          assertNode(node);

          if (newable(Compiler, 'compile')) {
            return new Compiler(node, file).compile();
          }

          return Compiler(node, file); // eslint-disable-line new-cap
        }

        // Parse a file (in string or vfile representation) into a unist node using
        // the `Parser` on the processor, then run transforms on that node, and
        // compile the resulting node using the `Compiler` on the processor, and
        // store that result on the vfile.
        function process(doc, cb) {
          freeze();
          assertParser('process', processor.Parser);
          assertCompiler('process', processor.Compiler);

          if (!cb) {
            return new Promise(executor);
          }

          executor(null, cb);

          function executor(resolve, reject) {
            var file = vfile(doc);

            pipeline.run(processor, { file: file }, done);

            function done(err) {
              if (err) {
                reject(err);
              } else if (resolve) {
                resolve(file);
              } else {
                cb(null, file);
              }
            }
          }
        }

        // Process the given document (in string or vfile representation), sync.
        function processSync(doc) {
          var complete = false;
          var file;

          freeze();
          assertParser('processSync', processor.Parser);
          assertCompiler('processSync', processor.Compiler);
          file = vfile(doc);

          process(file, done);

          assertDone('processSync', 'process', complete);

          return file;

          function done(err) {
            complete = true;
            bail(err);
          }
        }
      }

      // Check if `value` is a constructor.
      function newable(value, name) {
        return (
          typeof value === 'function' &&
          value.prototype &&
          // A function with keys in its prototype is probably a constructor.
          // Classes’ prototype methods are not enumerable, so we check if some value
          // exists in the prototype.
          (keys(value.prototype) || name in value.prototype)
        );
      }

      // Check if `value` is an object with keys.
      function keys(value) {
        var key;
        for (key in value) {
          return true;
        }

        return false;
      }

      // Assert a parser is available.
      function assertParser(name, Parser) {
        if (typeof Parser !== 'function') {
          throw new Error('Cannot `' + name + '` without `Parser`');
        }
      }

      // Assert a compiler is available.
      function assertCompiler(name, Compiler) {
        if (typeof Compiler !== 'function') {
          throw new Error('Cannot `' + name + '` without `Compiler`');
        }
      }

      // Assert the processor is not frozen.
      function assertUnfrozen(name, frozen) {
        if (frozen) {
          throw new Error(
            'Cannot invoke `' +
              name +
              '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
          );
        }
      }

      // Assert `node` is a unist node.
      function assertNode(node) {
        if (!node || typeof node.type !== 'string') {
          throw new Error('Expected node, got `' + node + '`');
        }
      }

      // Assert that `complete` is `true`.
      function assertDone(name, asyncName, complete) {
        if (!complete) {
          throw new Error(
            '`' + name + '` finished async. Use `' + asyncName + '` instead'
          );
        }
      }

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

    /***/ 4118: /***/ (module) => {
      'use strict';

      module.exports = (value) => {
        if (Object.prototype.toString.call(value) !== '[object Object]') {
          return false;
        }

        const prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
      };

      /***/
    },

    /***/ 4070: /***/ (module) => {
      'use strict';

      module.exports = convert;

      function convert(test) {
        if (test == null) {
          return ok;
        }

        if (typeof test === 'string') {
          return typeFactory(test);
        }

        if (typeof test === 'object') {
          return 'length' in test ? anyFactory(test) : allFactory(test);
        }

        if (typeof test === 'function') {
          return test;
        }

        throw new Error('Expected function, string, or object as test');
      }

      // Utility assert each property in `test` is represented in `node`, and each
      // values are strictly equal.
      function allFactory(test) {
        return all;

        function all(node) {
          var key;

          for (key in test) {
            if (node[key] !== test[key]) return false;
          }

          return true;
        }
      }

      function anyFactory(tests) {
        var checks = [];
        var index = -1;

        while (++index < tests.length) {
          checks[index] = convert(tests[index]);
        }

        return any;

        function any() {
          var index = -1;

          while (++index < checks.length) {
            if (checks[index].apply(this, arguments)) {
              return true;
            }
          }

          return false;
        }
      }

      // Utility to convert a string into a function which checks a given node’s type
      // for said string.
      function typeFactory(test) {
        return type;

        function type(node) {
          return Boolean(node && node.type === test);
        }
      }

      // Utility to return true.
      function ok() {
        return true;
      }

      /***/
    },

    /***/ 1957: /***/ (module) => {
      'use strict';

      var own = {}.hasOwnProperty;

      module.exports = stringify;

      function stringify(value) {
        // Nothing.
        if (!value || typeof value !== 'object') {
          return '';
        }

        // Node.
        if (own.call(value, 'position') || own.call(value, 'type')) {
          return position(value.position);
        }

        // Position.
        if (own.call(value, 'start') || own.call(value, 'end')) {
          return position(value);
        }

        // Point.
        if (own.call(value, 'line') || own.call(value, 'column')) {
          return point(value);
        }

        // ?
        return '';
      }

      function point(point) {
        if (!point || typeof point !== 'object') {
          point = {};
        }

        return index(point.line) + ':' + index(point.column);
      }

      function position(pos) {
        if (!pos || typeof pos !== 'object') {
          pos = {};
        }

        return point(pos.start) + '-' + point(pos.end);
      }

      function index(value) {
        return value && typeof value === 'number' ? value : 1;
      }

      /***/
    },

    /***/ 9906: /***/ (module) => {
      module.exports = color;
      function color(d) {
        return '\u001B[33m' + d + '\u001B[39m';
      }

      /***/
    },

    /***/ 3246: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = visitParents;

      var convert = __nccwpck_require__(4070);
      var color = __nccwpck_require__(9906);

      var CONTINUE = true;
      var SKIP = 'skip';
      var EXIT = false;

      visitParents.CONTINUE = CONTINUE;
      visitParents.SKIP = SKIP;
      visitParents.EXIT = EXIT;

      function visitParents(tree, test, visitor, reverse) {
        var step;
        var is;

        if (typeof test === 'function' && typeof visitor !== 'function') {
          reverse = visitor;
          visitor = test;
          test = null;
        }

        is = convert(test);
        step = reverse ? -1 : 1;

        factory(tree, null, [])();

        function factory(node, index, parents) {
          var value = typeof node === 'object' && node !== null ? node : {};
          var name;

          if (typeof value.type === 'string') {
            name =
              typeof value.tagName === 'string'
                ? value.tagName
                : typeof value.name === 'string'
                ? value.name
                : undefined;

            visit.displayName =
              'node (' +
              color(value.type + (name ? '<' + name + '>' : '')) +
              ')';
          }

          return visit;

          function visit() {
            var grandparents = parents.concat(node);
            var result = [];
            var subresult;
            var offset;

            if (!test || is(node, index, parents[parents.length - 1] || null)) {
              result = toResult(visitor(node, parents));

              if (result[0] === EXIT) {
                return result;
              }
            }

            if (node.children && result[0] !== SKIP) {
              offset = (reverse ? node.children.length : -1) + step;

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

      function toResult(value) {
        if (value !== null && typeof value === 'object' && 'length' in value) {
          return value;
        }

        if (typeof value === 'number') {
          return [CONTINUE, value];
        }

        return [value];
      }

      /***/
    },

    /***/ 199: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = visit;

      var visitParents = __nccwpck_require__(3246);

      var CONTINUE = visitParents.CONTINUE;
      var SKIP = visitParents.SKIP;
      var EXIT = visitParents.EXIT;

      visit.CONTINUE = CONTINUE;
      visit.SKIP = SKIP;
      visit.EXIT = EXIT;

      function visit(tree, test, visitor, reverse) {
        if (typeof test === 'function' && typeof visitor !== 'function') {
          reverse = visitor;
          visitor = test;
          test = null;
        }

        visitParents(tree, test, overload, reverse);

        function overload(node, parents) {
          var parent = parents[parents.length - 1];
          var index = parent ? parent.children.indexOf(node) : null;
          return visitor(node, index, parent);
        }
      }

      /***/
    },

    /***/ 4108: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var stringify = __nccwpck_require__(1957);

      module.exports = VMessage;

      // Inherit from `Error#`.
      function VMessagePrototype() {}
      VMessagePrototype.prototype = Error.prototype;
      VMessage.prototype = new VMessagePrototype();

      // Message properties.
      var proto = VMessage.prototype;

      proto.file = '';
      proto.name = '';
      proto.reason = '';
      proto.message = '';
      proto.stack = '';
      proto.fatal = null;
      proto.column = null;
      proto.line = null;

      // Construct a new VMessage.
      //
      // Note: We cannot invoke `Error` on the created context, as that adds readonly
      // `line` and `column` attributes on Safari 9, thus throwing and failing the
      // data.
      function VMessage(reason, position, origin) {
        var parts;
        var range;
        var location;

        if (typeof position === 'string') {
          origin = position;
          position = null;
        }

        parts = parseOrigin(origin);
        range = stringify(position) || '1:1';

        location = {
          start: { line: null, column: null },
          end: { line: null, column: null },
        };

        // Node.
        if (position && position.position) {
          position = position.position;
        }

        if (position) {
          // Position.
          if (position.start) {
            location = position;
            position = position.start;
          } else {
            // Point.
            location.start = position;
          }
        }

        if (reason.stack) {
          this.stack = reason.stack;
          reason = reason.message;
        }

        this.message = reason;
        this.name = range;
        this.reason = reason;
        this.line = position ? position.line : null;
        this.column = position ? position.column : null;
        this.location = location;
        this.source = parts[0];
        this.ruleId = parts[1];
      }

      function parseOrigin(origin) {
        var result = [null, null];
        var index;

        if (typeof origin === 'string') {
          index = origin.indexOf(':');

          if (index === -1) {
            result[1] = origin;
          } else {
            result[0] = origin.slice(0, index);
            result[1] = origin.slice(index + 1);
          }
        }

        return result;
      }

      /***/
    },

    /***/ 4860: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = __nccwpck_require__(77);

      /***/
    },

    /***/ 9523: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var p = __nccwpck_require__(9239);
      var proc = __nccwpck_require__(6070);
      var buffer = __nccwpck_require__(2157);

      module.exports = VFile;

      var own = {}.hasOwnProperty;

      // Order of setting (least specific to most), we need this because otherwise
      // `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
      // stem can be set.
      var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

      VFile.prototype.toString = toString;

      // Access full path (`~/index.min.js`).
      Object.defineProperty(VFile.prototype, 'path', {
        get: getPath,
        set: setPath,
      });

      // Access parent path (`~`).
      Object.defineProperty(VFile.prototype, 'dirname', {
        get: getDirname,
        set: setDirname,
      });

      // Access basename (`index.min.js`).
      Object.defineProperty(VFile.prototype, 'basename', {
        get: getBasename,
        set: setBasename,
      });

      // Access extname (`.js`).
      Object.defineProperty(VFile.prototype, 'extname', {
        get: getExtname,
        set: setExtname,
      });

      // Access stem (`index.min`).
      Object.defineProperty(VFile.prototype, 'stem', {
        get: getStem,
        set: setStem,
      });

      // Construct a new file.
      function VFile(options) {
        var prop;
        var index;

        if (!options) {
          options = {};
        } else if (typeof options === 'string' || buffer(options)) {
          options = { contents: options };
        } else if ('message' in options && 'messages' in options) {
          return options;
        }

        if (!(this instanceof VFile)) {
          return new VFile(options);
        }

        this.data = {};
        this.messages = [];
        this.history = [];
        this.cwd = proc.cwd();

        // Set path related properties in the correct order.
        index = -1;

        while (++index < order.length) {
          prop = order[index];

          if (own.call(options, prop)) {
            this[prop] = options[prop];
          }
        }

        // Set non-path related properties.
        for (prop in options) {
          if (order.indexOf(prop) < 0) {
            this[prop] = options[prop];
          }
        }
      }

      function getPath() {
        return this.history[this.history.length - 1];
      }

      function setPath(path) {
        assertNonEmpty(path, 'path');

        if (this.path !== path) {
          this.history.push(path);
        }
      }

      function getDirname() {
        return typeof this.path === 'string' ? p.dirname(this.path) : undefined;
      }

      function setDirname(dirname) {
        assertPath(this.path, 'dirname');
        this.path = p.join(dirname || '', this.basename);
      }

      function getBasename() {
        return typeof this.path === 'string'
          ? p.basename(this.path)
          : undefined;
      }

      function setBasename(basename) {
        assertNonEmpty(basename, 'basename');
        assertPart(basename, 'basename');
        this.path = p.join(this.dirname || '', basename);
      }

      function getExtname() {
        return typeof this.path === 'string' ? p.extname(this.path) : undefined;
      }

      function setExtname(extname) {
        assertPart(extname, 'extname');
        assertPath(this.path, 'extname');

        if (extname) {
          if (extname.charCodeAt(0) !== 46 /* `.` */) {
            throw new Error('`extname` must start with `.`');
          }

          if (extname.indexOf('.', 1) > -1) {
            throw new Error('`extname` cannot contain multiple dots');
          }
        }

        this.path = p.join(this.dirname, this.stem + (extname || ''));
      }

      function getStem() {
        return typeof this.path === 'string'
          ? p.basename(this.path, this.extname)
          : undefined;
      }

      function setStem(stem) {
        assertNonEmpty(stem, 'stem');
        assertPart(stem, 'stem');
        this.path = p.join(this.dirname || '', stem + (this.extname || ''));
      }

      // Get the value of the file.
      function toString(encoding) {
        return (this.contents || '').toString(encoding);
      }

      // Assert that `part` is not a path (i.e., does not contain `p.sep`).
      function assertPart(part, name) {
        if (part && part.indexOf(p.sep) > -1) {
          throw new Error(
            '`' + name + '` cannot be a path: did not expect `' + p.sep + '`'
          );
        }
      }

      // Assert that `part` is not empty.
      function assertNonEmpty(part, name) {
        if (!part) {
          throw new Error('`' + name + '` cannot be empty');
        }
      }

      // Assert `path` exists.
      function assertPath(path, name) {
        if (!path) {
          throw new Error(
            'Setting `' + name + '` requires `path` to be set too'
          );
        }
      }

      /***/
    },

    /***/ 77: /***/ (module, __unused_webpack_exports, __nccwpck_require__) => {
      'use strict';

      var VMessage = __nccwpck_require__(4108);
      var VFile = __nccwpck_require__(9523);

      module.exports = VFile;

      VFile.prototype.message = message;
      VFile.prototype.info = info;
      VFile.prototype.fail = fail;

      // Create a message with `reason` at `position`.
      // When an error is passed in as `reason`, copies the stack.
      function message(reason, position, origin) {
        var message = new VMessage(reason, position, origin);

        if (this.path) {
          message.name = this.path + ':' + message.name;
          message.file = this.path;
        }

        message.fatal = false;

        this.messages.push(message);

        return message;
      }

      // Fail: creates a vmessage, associates it with the file, and throws it.
      function fail() {
        var message = this.message.apply(this, arguments);

        message.fatal = true;

        throw message;
      }

      // Info: creates a vmessage, associates it with the file, and marks the fatality
      // as null.
      function info() {
        var message = this.message.apply(this, arguments);

        message.fatal = null;

        return message;
      }

      /***/
    },

    /***/ 9239: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      module.exports = __nccwpck_require__(1017);

      /***/
    },

    /***/ 6070: /***/ (module) => {
      'use strict';

      module.exports = process;

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

    /***/ 1067: /***/ (module) => {
      'use strict';

      module.exports = factory;

      var noop = Function.prototype;
      var own = {}.hasOwnProperty;

      // Handle values based on a property.
      function factory(key, options) {
        var settings = options || {};

        function one(value) {
          var fn = one.invalid;
          var handlers = one.handlers;

          if (value && own.call(value, key)) {
            fn = own.call(handlers, value[key])
              ? handlers[value[key]]
              : one.unknown;
          }

          return (fn || noop).apply(this, arguments);
        }

        one.handlers = settings.handlers || {};
        one.invalid = settings.invalid;
        one.unknown = settings.unknown;

        return one;
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
      Object.defineProperty(exports, '__esModule', { value: true });
      const core = __importStar(__nccwpck_require__(2186));
      const exec = __importStar(__nccwpck_require__(1514));
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
      exports.pushNewFiles = exports.MARKDOWN_FILENAME = exports.generateMd = exports.renderer = exports.API_STARRED_URL = exports.REPO_USERNAME = void 0;
      const fs_1 = __importDefault(__nccwpck_require__(7147));
      const ejs_1 = __importDefault(__nccwpck_require__(8431));
      const core = __importStar(__nccwpck_require__(2186));
      const remark_1 = __importDefault(__nccwpck_require__(2081));
      const remark_toc_1 = __importDefault(__nccwpck_require__(5096));
      const git_1 = __importDefault(__nccwpck_require__(6350));
      exports.REPO_USERNAME =
        (_a = process.env.GITHUB_REPOSITORY) === null || _a === void 0
          ? void 0
          : _a.split('/')[0];
      exports.API_STARRED_URL = `${process.env.GITHUB_API_URL}/users/${exports.REPO_USERNAME}/starred`;
      const fsp = fs_1.default.promises;
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
          (0, remark_1.default)()
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
      function pushNewFiles(files = []) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!files.length) return;
          yield git_1.default.pull();
          yield Promise.all(
            files.map(({ filename, data }) => fsp.writeFile(filename, data))
          );
          yield git_1.default.add(files.map(({ filename }) => filename));
          yield git_1.default.commit(
            `chore(updates): updated entries in files`
          );
          yield git_1.default.push();
        });
      }
      exports.pushNewFiles = pushNewFiles;

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
      const core = __importStar(__nccwpck_require__(2186));
      const promises_1 = __nccwpck_require__(3292);
      const gh_star_fetch_1 = __importDefault(__nccwpck_require__(1696));
      const helpers_1 = __nccwpck_require__(3015);
      const template_1 = __importDefault(__nccwpck_require__(3932));
      function main() {
        return __awaiter(this, void 0, void 0, function* () {
          // set default template
          let template = template_1.default;
          // get template if found in the repo
          const customTemplatePath = core.getInput('template-path');
          console.log(
            `check if customTemplatePath: ${customTemplatePath} exists`
          );
          try {
            const dir = yield (0, promises_1.readdir)('./');
            template = yield (0, promises_1.readFile)(
              customTemplatePath,
              'utf8'
            );
          } catch (_a) {
            console.log("Couldn't find template file, using default");
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
          yield (0, helpers_1.pushNewFiles)([
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

    /***/ 3932: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports[
        'default'
      ] = `# <%= username %> Awesome List [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

> :star: generated with [simonecorsi/mawesome](https://github.com/simonecorsi/mawesome)

## Table of Contents

<% for(let [language, repositories] of stars) { %>
## <%= language %>

<% for(let repo of repositories) { %>- [<%= repo.full_name %>](<%= repo.html_url %>) - <%= repo.description %>
<% } %>  

<% } %>
`;

      /***/
    },

    /***/ 1696: /***/ (module) => {
      module.exports = eval('require')('gh-star-fetch');

      /***/
    },

    /***/ 9491: /***/ (module) => {
      'use strict';
      module.exports = require('assert');

      /***/
    },

    /***/ 8493: /***/ (module) => {
      'use strict';
      module.exports = require('child_process');

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

    /***/ 3837: /***/ (module) => {
      'use strict';
      module.exports = require('util');

      /***/
    },

    /***/ 2661: /***/ (module) => {
      'use strict';
      module.exports = JSON.parse(
        '{"AEli":"Æ","AElig":"Æ","AM":"&","AMP":"&","Aacut":"Á","Aacute":"Á","Abreve":"Ă","Acir":"Â","Acirc":"Â","Acy":"А","Afr":"𝔄","Agrav":"À","Agrave":"À","Alpha":"Α","Amacr":"Ā","And":"⩓","Aogon":"Ą","Aopf":"𝔸","ApplyFunction":"⁡","Arin":"Å","Aring":"Å","Ascr":"𝒜","Assign":"≔","Atild":"Ã","Atilde":"Ã","Aum":"Ä","Auml":"Ä","Backslash":"∖","Barv":"⫧","Barwed":"⌆","Bcy":"Б","Because":"∵","Bernoullis":"ℬ","Beta":"Β","Bfr":"𝔅","Bopf":"𝔹","Breve":"˘","Bscr":"ℬ","Bumpeq":"≎","CHcy":"Ч","COP":"©","COPY":"©","Cacute":"Ć","Cap":"⋒","CapitalDifferentialD":"ⅅ","Cayleys":"ℭ","Ccaron":"Č","Ccedi":"Ç","Ccedil":"Ç","Ccirc":"Ĉ","Cconint":"∰","Cdot":"Ċ","Cedilla":"¸","CenterDot":"·","Cfr":"ℭ","Chi":"Χ","CircleDot":"⊙","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","Colon":"∷","Colone":"⩴","Congruent":"≡","Conint":"∯","ContourIntegral":"∮","Copf":"ℂ","Coproduct":"∐","CounterClockwiseContourIntegral":"∳","Cross":"⨯","Cscr":"𝒞","Cup":"⋓","CupCap":"≍","DD":"ⅅ","DDotrahd":"⤑","DJcy":"Ђ","DScy":"Ѕ","DZcy":"Џ","Dagger":"‡","Darr":"↡","Dashv":"⫤","Dcaron":"Ď","Dcy":"Д","Del":"∇","Delta":"Δ","Dfr":"𝔇","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","Diamond":"⋄","DifferentialD":"ⅆ","Dopf":"𝔻","Dot":"¨","DotDot":"⃜","DotEqual":"≐","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrow":"↓","DownArrowBar":"⤓","DownArrowUpArrow":"⇵","DownBreve":"̑","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVector":"↽","DownLeftVectorBar":"⥖","DownRightTeeVector":"⥟","DownRightVector":"⇁","DownRightVectorBar":"⥗","DownTee":"⊤","DownTeeArrow":"↧","Downarrow":"⇓","Dscr":"𝒟","Dstrok":"Đ","ENG":"Ŋ","ET":"Ð","ETH":"Ð","Eacut":"É","Eacute":"É","Ecaron":"Ě","Ecir":"Ê","Ecirc":"Ê","Ecy":"Э","Edot":"Ė","Efr":"𝔈","Egrav":"È","Egrave":"È","Element":"∈","Emacr":"Ē","EmptySmallSquare":"◻","EmptyVerySmallSquare":"▫","Eogon":"Ę","Eopf":"𝔼","Epsilon":"Ε","Equal":"⩵","EqualTilde":"≂","Equilibrium":"⇌","Escr":"ℰ","Esim":"⩳","Eta":"Η","Eum":"Ë","Euml":"Ë","Exists":"∃","ExponentialE":"ⅇ","Fcy":"Ф","Ffr":"𝔉","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","Fopf":"𝔽","ForAll":"∀","Fouriertrf":"ℱ","Fscr":"ℱ","GJcy":"Ѓ","G":">","GT":">","Gamma":"Γ","Gammad":"Ϝ","Gbreve":"Ğ","Gcedil":"Ģ","Gcirc":"Ĝ","Gcy":"Г","Gdot":"Ġ","Gfr":"𝔊","Gg":"⋙","Gopf":"𝔾","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","Gt":"≫","HARDcy":"Ъ","Hacek":"ˇ","Hat":"^","Hcirc":"Ĥ","Hfr":"ℌ","HilbertSpace":"ℋ","Hopf":"ℍ","HorizontalLine":"─","Hscr":"ℋ","Hstrok":"Ħ","HumpDownHump":"≎","HumpEqual":"≏","IEcy":"Е","IJlig":"Ĳ","IOcy":"Ё","Iacut":"Í","Iacute":"Í","Icir":"Î","Icirc":"Î","Icy":"И","Idot":"İ","Ifr":"ℑ","Igrav":"Ì","Igrave":"Ì","Im":"ℑ","Imacr":"Ī","ImaginaryI":"ⅈ","Implies":"⇒","Int":"∬","Integral":"∫","Intersection":"⋂","InvisibleComma":"⁣","InvisibleTimes":"⁢","Iogon":"Į","Iopf":"𝕀","Iota":"Ι","Iscr":"ℐ","Itilde":"Ĩ","Iukcy":"І","Ium":"Ï","Iuml":"Ï","Jcirc":"Ĵ","Jcy":"Й","Jfr":"𝔍","Jopf":"𝕁","Jscr":"𝒥","Jsercy":"Ј","Jukcy":"Є","KHcy":"Х","KJcy":"Ќ","Kappa":"Κ","Kcedil":"Ķ","Kcy":"К","Kfr":"𝔎","Kopf":"𝕂","Kscr":"𝒦","LJcy":"Љ","L":"<","LT":"<","Lacute":"Ĺ","Lambda":"Λ","Lang":"⟪","Laplacetrf":"ℒ","Larr":"↞","Lcaron":"Ľ","Lcedil":"Ļ","Lcy":"Л","LeftAngleBracket":"⟨","LeftArrow":"←","LeftArrowBar":"⇤","LeftArrowRightArrow":"⇆","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVector":"⇃","LeftDownVectorBar":"⥙","LeftFloor":"⌊","LeftRightArrow":"↔","LeftRightVector":"⥎","LeftTee":"⊣","LeftTeeArrow":"↤","LeftTeeVector":"⥚","LeftTriangle":"⊲","LeftTriangleBar":"⧏","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVector":"↿","LeftUpVectorBar":"⥘","LeftVector":"↼","LeftVectorBar":"⥒","Leftarrow":"⇐","Leftrightarrow":"⇔","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","LessLess":"⪡","LessSlantEqual":"⩽","LessTilde":"≲","Lfr":"𝔏","Ll":"⋘","Lleftarrow":"⇚","Lmidot":"Ŀ","LongLeftArrow":"⟵","LongLeftRightArrow":"⟷","LongRightArrow":"⟶","Longleftarrow":"⟸","Longleftrightarrow":"⟺","Longrightarrow":"⟹","Lopf":"𝕃","LowerLeftArrow":"↙","LowerRightArrow":"↘","Lscr":"ℒ","Lsh":"↰","Lstrok":"Ł","Lt":"≪","Map":"⤅","Mcy":"М","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","MinusPlus":"∓","Mopf":"𝕄","Mscr":"ℳ","Mu":"Μ","NJcy":"Њ","Nacute":"Ń","Ncaron":"Ň","Ncedil":"Ņ","Ncy":"Н","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","Nfr":"𝔑","NoBreak":"⁠","NonBreakingSpace":" ","Nopf":"ℕ","Not":"⫬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","NotLeftTriangle":"⋪","NotLeftTriangleBar":"⧏̸","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangle":"⋫","NotRightTriangleBar":"⧐̸","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","Nscr":"𝒩","Ntild":"Ñ","Ntilde":"Ñ","Nu":"Ν","OElig":"Œ","Oacut":"Ó","Oacute":"Ó","Ocir":"Ô","Ocirc":"Ô","Ocy":"О","Odblac":"Ő","Ofr":"𝔒","Ograv":"Ò","Ograve":"Ò","Omacr":"Ō","Omega":"Ω","Omicron":"Ο","Oopf":"𝕆","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","Or":"⩔","Oscr":"𝒪","Oslas":"Ø","Oslash":"Ø","Otild":"Õ","Otilde":"Õ","Otimes":"⨷","Oum":"Ö","Ouml":"Ö","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","PartialD":"∂","Pcy":"П","Pfr":"𝔓","Phi":"Φ","Pi":"Π","PlusMinus":"±","Poincareplane":"ℌ","Popf":"ℙ","Pr":"⪻","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","Prime":"″","Product":"∏","Proportion":"∷","Proportional":"∝","Pscr":"𝒫","Psi":"Ψ","QUO":"\\"","QUOT":"\\"","Qfr":"𝔔","Qopf":"ℚ","Qscr":"𝒬","RBarr":"⤐","RE":"®","REG":"®","Racute":"Ŕ","Rang":"⟫","Rarr":"↠","Rarrtl":"⤖","Rcaron":"Ř","Rcedil":"Ŗ","Rcy":"Р","Re":"ℜ","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","Rfr":"ℜ","Rho":"Ρ","RightAngleBracket":"⟩","RightArrow":"→","RightArrowBar":"⇥","RightArrowLeftArrow":"⇄","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVector":"⇂","RightDownVectorBar":"⥕","RightFloor":"⌋","RightTee":"⊢","RightTeeArrow":"↦","RightTeeVector":"⥛","RightTriangle":"⊳","RightTriangleBar":"⧐","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVector":"↾","RightUpVectorBar":"⥔","RightVector":"⇀","RightVectorBar":"⥓","Rightarrow":"⇒","Ropf":"ℝ","RoundImplies":"⥰","Rrightarrow":"⇛","Rscr":"ℛ","Rsh":"↱","RuleDelayed":"⧴","SHCHcy":"Щ","SHcy":"Ш","SOFTcy":"Ь","Sacute":"Ś","Sc":"⪼","Scaron":"Š","Scedil":"Ş","Scirc":"Ŝ","Scy":"С","Sfr":"𝔖","ShortDownArrow":"↓","ShortLeftArrow":"←","ShortRightArrow":"→","ShortUpArrow":"↑","Sigma":"Σ","SmallCircle":"∘","Sopf":"𝕊","Sqrt":"√","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","Sscr":"𝒮","Star":"⋆","Sub":"⋐","Subset":"⋐","SubsetEqual":"⊆","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","SuchThat":"∋","Sum":"∑","Sup":"⋑","Superset":"⊃","SupersetEqual":"⊇","Supset":"⋑","THOR":"Þ","THORN":"Þ","TRADE":"™","TSHcy":"Ћ","TScy":"Ц","Tab":"\\t","Tau":"Τ","Tcaron":"Ť","Tcedil":"Ţ","Tcy":"Т","Tfr":"𝔗","Therefore":"∴","Theta":"Θ","ThickSpace":"  ","ThinSpace":" ","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","Topf":"𝕋","TripleDot":"⃛","Tscr":"𝒯","Tstrok":"Ŧ","Uacut":"Ú","Uacute":"Ú","Uarr":"↟","Uarrocir":"⥉","Ubrcy":"Ў","Ubreve":"Ŭ","Ucir":"Û","Ucirc":"Û","Ucy":"У","Udblac":"Ű","Ufr":"𝔘","Ugrav":"Ù","Ugrave":"Ù","Umacr":"Ū","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","Uopf":"𝕌","UpArrow":"↑","UpArrowBar":"⤒","UpArrowDownArrow":"⇅","UpDownArrow":"↕","UpEquilibrium":"⥮","UpTee":"⊥","UpTeeArrow":"↥","Uparrow":"⇑","Updownarrow":"⇕","UpperLeftArrow":"↖","UpperRightArrow":"↗","Upsi":"ϒ","Upsilon":"Υ","Uring":"Ů","Uscr":"𝒰","Utilde":"Ũ","Uum":"Ü","Uuml":"Ü","VDash":"⊫","Vbar":"⫫","Vcy":"В","Vdash":"⊩","Vdashl":"⫦","Vee":"⋁","Verbar":"‖","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","Vopf":"𝕍","Vscr":"𝒱","Vvdash":"⊪","Wcirc":"Ŵ","Wedge":"⋀","Wfr":"𝔚","Wopf":"𝕎","Wscr":"𝒲","Xfr":"𝔛","Xi":"Ξ","Xopf":"𝕏","Xscr":"𝒳","YAcy":"Я","YIcy":"Ї","YUcy":"Ю","Yacut":"Ý","Yacute":"Ý","Ycirc":"Ŷ","Ycy":"Ы","Yfr":"𝔜","Yopf":"𝕐","Yscr":"𝒴","Yuml":"Ÿ","ZHcy":"Ж","Zacute":"Ź","Zcaron":"Ž","Zcy":"З","Zdot":"Ż","ZeroWidthSpace":"​","Zeta":"Ζ","Zfr":"ℨ","Zopf":"ℤ","Zscr":"𝒵","aacut":"á","aacute":"á","abreve":"ă","ac":"∾","acE":"∾̳","acd":"∿","acir":"â","acirc":"â","acut":"´","acute":"´","acy":"а","aeli":"æ","aelig":"æ","af":"⁡","afr":"𝔞","agrav":"à","agrave":"à","alefsym":"ℵ","aleph":"ℵ","alpha":"α","amacr":"ā","amalg":"⨿","am":"&","amp":"&","and":"∧","andand":"⩕","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsd":"∡","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","aogon":"ą","aopf":"𝕒","ap":"≈","apE":"⩰","apacir":"⩯","ape":"≊","apid":"≋","apos":"\'","approx":"≈","approxeq":"≊","arin":"å","aring":"å","ascr":"𝒶","ast":"*","asymp":"≈","asympeq":"≍","atild":"ã","atilde":"ã","aum":"ä","auml":"ä","awconint":"∳","awint":"⨑","bNot":"⫭","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","barvee":"⊽","barwed":"⌅","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","beta":"β","beth":"ℶ","between":"≬","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bnot":"⌐","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxDL":"╗","boxDR":"╔","boxDl":"╖","boxDr":"╓","boxH":"═","boxHD":"╦","boxHU":"╩","boxHd":"╤","boxHu":"╧","boxUL":"╝","boxUR":"╚","boxUl":"╜","boxUr":"╙","boxV":"║","boxVH":"╬","boxVL":"╣","boxVR":"╠","boxVh":"╫","boxVl":"╢","boxVr":"╟","boxbox":"⧉","boxdL":"╕","boxdR":"╒","boxdl":"┐","boxdr":"┌","boxh":"─","boxhD":"╥","boxhU":"╨","boxhd":"┬","boxhu":"┴","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxuL":"╛","boxuR":"╘","boxul":"┘","boxur":"└","boxv":"│","boxvH":"╪","boxvL":"╡","boxvR":"╞","boxvh":"┼","boxvl":"┤","boxvr":"├","bprime":"‵","breve":"˘","brvba":"¦","brvbar":"¦","bscr":"𝒷","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsol":"\\\\","bsolb":"⧅","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","bumpeq":"≏","cacute":"ć","cap":"∩","capand":"⩄","capbrcup":"⩉","capcap":"⩋","capcup":"⩇","capdot":"⩀","caps":"∩︀","caret":"⁁","caron":"ˇ","ccaps":"⩍","ccaron":"č","ccedi":"ç","ccedil":"ç","ccirc":"ĉ","ccups":"⩌","ccupssm":"⩐","cdot":"ċ","cedi":"¸","cedil":"¸","cemptyv":"⦲","cen":"¢","cent":"¢","centerdot":"·","cfr":"𝔠","chcy":"ч","check":"✓","checkmark":"✓","chi":"χ","cir":"○","cirE":"⧃","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledR":"®","circledS":"Ⓢ","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","clubs":"♣","clubsuit":"♣","colon":":","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","conint":"∮","copf":"𝕔","coprod":"∐","cop":"©","copy":"©","copysr":"℗","crarr":"↵","cross":"✗","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cup":"∪","cupbrcap":"⩈","cupcap":"⩆","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curre":"¤","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dArr":"⇓","dHar":"⥥","dagger":"†","daleth":"ℸ","darr":"↓","dash":"‐","dashv":"⊣","dbkarow":"⤏","dblac":"˝","dcaron":"ď","dcy":"д","dd":"ⅆ","ddagger":"‡","ddarr":"⇊","ddotseq":"⩷","de":"°","deg":"°","delta":"δ","demptyv":"⦱","dfisht":"⥿","dfr":"𝔡","dharl":"⇃","dharr":"⇂","diam":"⋄","diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","digamma":"ϝ","disin":"⋲","div":"÷","divid":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","dopf":"𝕕","dot":"˙","doteq":"≐","doteqdot":"≑","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","downarrow":"↓","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","dscr":"𝒹","dscy":"ѕ","dsol":"⧶","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","dzcy":"џ","dzigrarr":"⟿","eDDot":"⩷","eDot":"≑","eacut":"é","eacute":"é","easter":"⩮","ecaron":"ě","ecir":"ê","ecirc":"ê","ecolon":"≕","ecy":"э","edot":"ė","ee":"ⅇ","efDot":"≒","efr":"𝔢","eg":"⪚","egrav":"è","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","emacr":"ē","empty":"∅","emptyset":"∅","emptyv":"∅","emsp13":" ","emsp14":" ","emsp":" ","eng":"ŋ","ensp":" ","eogon":"ę","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","equals":"=","equest":"≟","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erDot":"≓","erarr":"⥱","escr":"ℯ","esdot":"≐","esim":"≂","eta":"η","et":"ð","eth":"ð","eum":"ë","euml":"ë","euro":"€","excl":"!","exist":"∃","expectation":"ℰ","exponentiale":"ⅇ","fallingdotseq":"≒","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","ffr":"𝔣","filig":"ﬁ","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","fopf":"𝕗","forall":"∀","fork":"⋔","forkv":"⫙","fpartint":"⨍","frac1":"¼","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac3":"¾","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","gE":"≧","gEl":"⪌","gacute":"ǵ","gamma":"γ","gammad":"ϝ","gap":"⪆","gbreve":"ğ","gcirc":"ĝ","gcy":"г","gdot":"ġ","ge":"≥","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","ges":"⩾","gescc":"⪩","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","gfr":"𝔤","gg":"≫","ggg":"⋙","gimel":"ℷ","gjcy":"ѓ","gl":"≷","glE":"⪒","gla":"⪥","glj":"⪤","gnE":"≩","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gneq":"⪈","gneqq":"≩","gnsim":"⋧","gopf":"𝕘","grave":"`","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","g":">","gt":">","gtcc":"⪧","gtcir":"⩺","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","hArr":"⇔","hairsp":" ","half":"½","hamilt":"ℋ","hardcy":"ъ","harr":"↔","harrcir":"⥈","harrw":"↭","hbar":"ℏ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","horbar":"―","hscr":"𝒽","hslash":"ℏ","hstrok":"ħ","hybull":"⁃","hyphen":"‐","iacut":"í","iacute":"í","ic":"⁣","icir":"î","icirc":"î","icy":"и","iecy":"е","iexc":"¡","iexcl":"¡","iff":"⇔","ifr":"𝔦","igrav":"ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","ijlig":"ĳ","imacr":"ī","image":"ℑ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","imof":"⊷","imped":"Ƶ","in":"∈","incare":"℅","infin":"∞","infintie":"⧝","inodot":"ı","int":"∫","intcal":"⊺","integers":"ℤ","intercal":"⊺","intlarhk":"⨗","intprod":"⨼","iocy":"ё","iogon":"į","iopf":"𝕚","iota":"ι","iprod":"⨼","iques":"¿","iquest":"¿","iscr":"𝒾","isin":"∈","isinE":"⋹","isindot":"⋵","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","itilde":"ĩ","iukcy":"і","ium":"ï","iuml":"ï","jcirc":"ĵ","jcy":"й","jfr":"𝔧","jmath":"ȷ","jopf":"𝕛","jscr":"𝒿","jsercy":"ј","jukcy":"є","kappa":"κ","kappav":"ϰ","kcedil":"ķ","kcy":"к","kfr":"𝔨","kgreen":"ĸ","khcy":"х","kjcy":"ќ","kopf":"𝕜","kscr":"𝓀","lAarr":"⇚","lArr":"⇐","lAtail":"⤛","lBarr":"⤎","lE":"≦","lEg":"⪋","lHar":"⥢","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","lambda":"λ","lang":"⟨","langd":"⦑","langle":"⟨","lap":"⪅","laqu":"«","laquo":"«","larr":"←","larrb":"⇤","larrbfs":"⤟","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","lat":"⪫","latail":"⤙","late":"⪭","lates":"⪭︀","lbarr":"⤌","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","lcaron":"ľ","lcedil":"ļ","lceil":"⌈","lcub":"{","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","leftarrow":"←","leftarrowtail":"↢","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","leftthreetimes":"⋋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","les":"⩽","lescc":"⪨","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","lessgtr":"≶","lesssim":"≲","lfisht":"⥼","lfloor":"⌊","lfr":"𝔩","lg":"≶","lgE":"⪑","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","ljcy":"љ","ll":"≪","llarr":"⇇","llcorner":"⌞","llhard":"⥫","lltri":"◺","lmidot":"ŀ","lmoust":"⎰","lmoustache":"⎰","lnE":"≨","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","longleftrightarrow":"⟷","longmapsto":"⟼","longrightarrow":"⟶","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","lstrok":"ł","l":"<","lt":"<","ltcc":"⪦","ltcir":"⩹","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltrPar":"⦖","ltri":"◃","ltrie":"⊴","ltrif":"◂","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","mDDot":"∺","mac":"¯","macr":"¯","male":"♂","malt":"✠","maltese":"✠","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","mcy":"м","mdash":"—","measuredangle":"∡","mfr":"𝔪","mho":"℧","micr":"µ","micro":"µ","mid":"∣","midast":"*","midcir":"⫰","middo":"·","middot":"·","minus":"−","minusb":"⊟","minusd":"∸","minusdu":"⨪","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","mopf":"𝕞","mp":"∓","mscr":"𝓂","mstpos":"∾","mu":"μ","multimap":"⊸","mumap":"⊸","nGg":"⋙̸","nGt":"≫⃒","nGtv":"≫̸","nLeftarrow":"⇍","nLeftrightarrow":"⇎","nLl":"⋘̸","nLt":"≪⃒","nLtv":"≪̸","nRightarrow":"⇏","nVDash":"⊯","nVdash":"⊮","nabla":"∇","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natur":"♮","natural":"♮","naturals":"ℕ","nbs":" ","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","ncaron":"ň","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","ncy":"н","ndash":"–","ne":"≠","neArr":"⇗","nearhk":"⤤","nearr":"↗","nearrow":"↗","nedot":"≐̸","nequiv":"≢","nesear":"⤨","nesim":"≂̸","nexist":"∄","nexists":"∄","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","ngsim":"≵","ngt":"≯","ngtr":"≯","nhArr":"⇎","nharr":"↮","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","njcy":"њ","nlArr":"⇍","nlE":"≦̸","nlarr":"↚","nldr":"‥","nle":"≰","nleftarrow":"↚","nleftrightarrow":"↮","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nlsim":"≴","nlt":"≮","nltri":"⋪","nltrie":"⋬","nmid":"∤","nopf":"𝕟","no":"¬","not":"¬","notin":"∉","notinE":"⋹̸","notindot":"⋵̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","npar":"∦","nparallel":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","npre":"⪯̸","nprec":"⊀","npreceq":"⪯̸","nrArr":"⇏","nrarr":"↛","nrarrc":"⤳̸","nrarrw":"↝̸","nrightarrow":"↛","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","ntild":"ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","nu":"ν","num":"#","numero":"№","numsp":" ","nvDash":"⊭","nvHarr":"⤄","nvap":"≍⃒","nvdash":"⊬","nvge":"≥⃒","nvgt":">⃒","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwArr":"⇖","nwarhk":"⤣","nwarr":"↖","nwarrow":"↖","nwnear":"⤧","oS":"Ⓢ","oacut":"ó","oacute":"ó","oast":"⊛","ocir":"ô","ocirc":"ô","ocy":"о","odash":"⊝","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","oelig":"œ","ofcir":"⦿","ofr":"𝔬","ogon":"˛","ograv":"ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","omacr":"ō","omega":"ω","omicron":"ο","omid":"⦶","ominus":"⊖","oopf":"𝕠","opar":"⦷","operp":"⦹","oplus":"⊕","or":"∨","orarr":"↻","ord":"º","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oscr":"ℴ","oslas":"ø","oslash":"ø","osol":"⊘","otild":"õ","otilde":"õ","otimes":"⊗","otimesas":"⨶","oum":"ö","ouml":"ö","ovbar":"⌽","par":"¶","para":"¶","parallel":"∥","parsim":"⫳","parsl":"⫽","part":"∂","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","pfr":"𝔭","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plus":"+","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plusdo":"∔","plusdu":"⨥","pluse":"⩲","plusm":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","pointint":"⨕","popf":"𝕡","poun":"£","pound":"£","pr":"≺","prE":"⪳","prap":"⪷","prcue":"≼","pre":"⪯","prec":"≺","precapprox":"⪷","preccurlyeq":"≼","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","precsim":"≾","prime":"′","primes":"ℙ","prnE":"⪵","prnap":"⪹","prnsim":"⋨","prod":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","propto":"∝","prsim":"≾","prurel":"⊰","pscr":"𝓅","psi":"ψ","puncsp":" ","qfr":"𝔮","qint":"⨌","qopf":"𝕢","qprime":"⁗","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quo":"\\"","quot":"\\"","rAarr":"⇛","rArr":"⇒","rAtail":"⤜","rBarr":"⤏","rHar":"⥤","race":"∽̱","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","rangd":"⦒","range":"⦥","rangle":"⟩","raqu":"»","raquo":"»","rarr":"→","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","rarrtl":"↣","rarrw":"↝","ratail":"⤚","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","rcaron":"ř","rcedil":"ŗ","rceil":"⌉","rcub":"}","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","rect":"▭","re":"®","reg":"®","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","rhard":"⇁","rharu":"⇀","rharul":"⥬","rho":"ρ","rhov":"ϱ","rightarrow":"→","rightarrowtail":"↣","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","rightthreetimes":"⋌","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoust":"⎱","rmoustache":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","roplus":"⨮","rotimes":"⨵","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","rsaquo":"›","rscr":"𝓇","rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","ruluhar":"⥨","rx":"℞","sacute":"ś","sbquo":"‚","sc":"≻","scE":"⪴","scap":"⪸","scaron":"š","sccue":"≽","sce":"⪰","scedil":"ş","scirc":"ŝ","scnE":"⪶","scnap":"⪺","scnsim":"⋩","scpolint":"⨓","scsim":"≿","scy":"с","sdot":"⋅","sdotb":"⊡","sdote":"⩦","seArr":"⇘","searhk":"⤥","searr":"↘","searrow":"↘","sec":"§","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","sfr":"𝔰","sfrown":"⌢","sharp":"♯","shchcy":"щ","shcy":"ш","shortmid":"∣","shortparallel":"∥","sh":"­","shy":"­","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","softcy":"ь","sol":"/","solb":"⧄","solbar":"⌿","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","squ":"□","square":"□","squarf":"▪","squf":"▪","srarr":"→","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","subE":"⫅","subdot":"⪽","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","subseteq":"⊆","subseteqq":"⫅","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succ":"≻","succapprox":"⪸","succcurlyeq":"≽","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","sum":"∑","sung":"♪","sup":"⊃","sup1":"¹","sup2":"²","sup3":"³","supE":"⫆","supdot":"⪾","supdsub":"⫘","supe":"⊇","supedot":"⫄","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swArr":"⇙","swarhk":"⤦","swarr":"↙","swarrow":"↙","swnwar":"⤪","szli":"ß","szlig":"ß","target":"⌖","tau":"τ","tbrk":"⎴","tcaron":"ť","tcedil":"ţ","tcy":"т","tdot":"⃛","telrec":"⌕","tfr":"𝔱","there4":"∴","therefore":"∴","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","thinsp":" ","thkap":"≈","thksim":"∼","thor":"þ","thorn":"þ","tilde":"˜","time":"×","times":"×","timesb":"⊠","timesbar":"⨱","timesd":"⨰","tint":"∭","toea":"⤨","top":"⊤","topbot":"⌶","topcir":"⫱","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","tscr":"𝓉","tscy":"ц","tshcy":"ћ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","uArr":"⇑","uHar":"⥣","uacut":"ú","uacute":"ú","uarr":"↑","ubrcy":"ў","ubreve":"ŭ","ucir":"û","ucirc":"û","ucy":"у","udarr":"⇅","udblac":"ű","udhar":"⥮","ufisht":"⥾","ufr":"𝔲","ugrav":"ù","ugrave":"ù","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","umacr":"ū","um":"¨","uml":"¨","uogon":"ų","uopf":"𝕦","uparrow":"↑","updownarrow":"↕","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","upsi":"υ","upsih":"ϒ","upsilon":"υ","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","uring":"ů","urtri":"◹","uscr":"𝓊","utdot":"⋰","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","uum":"ü","uuml":"ü","uwangle":"⦧","vArr":"⇕","vBar":"⫨","vBarv":"⫩","vDash":"⊨","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vcy":"в","vdash":"⊢","vee":"∨","veebar":"⊻","veeeq":"≚","vellip":"⋮","verbar":"|","vert":"|","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","vopf":"𝕧","vprop":"∝","vrtri":"⊳","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","vzigzag":"⦚","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","wedgeq":"≙","weierp":"℘","wfr":"𝔴","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","xfr":"𝔵","xhArr":"⟺","xharr":"⟷","xi":"ξ","xlArr":"⟸","xlarr":"⟵","xmap":"⟼","xnis":"⋻","xodot":"⨀","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrArr":"⟹","xrarr":"⟶","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","yacut":"ý","yacute":"ý","yacy":"я","ycirc":"ŷ","ycy":"ы","ye":"¥","yen":"¥","yfr":"𝔶","yicy":"ї","yopf":"𝕪","yscr":"𝓎","yucy":"ю","yum":"ÿ","yuml":"ÿ","zacute":"ź","zcaron":"ž","zcy":"з","zdot":"ż","zeetrf":"ℨ","zeta":"ζ","zfr":"𝔷","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","zscr":"𝓏","zwj":"‍","zwnj":"‌"}'
      );

      /***/
    },

    /***/ 3558: /***/ (module) => {
      'use strict';
      module.exports = { i8: '3.1.6' };

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
  } /* webpack/runtime/compat */
  /******/
  /************************************************************************/
  /******/ /******/
  /******/ if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'; // startup // Load entry module and return exports // This entry module is referenced by other modules so it can't be inlined
  /******/
  /************************************************************************/
  /******/
  /******/ /******/ /******/ /******/ var __webpack_exports__ = __nccwpck_require__(
    6144
  );
  /******/ module.exports = __webpack_exports__;
  /******/
  /******/
})();
