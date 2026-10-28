#!/bin/sh
# Runs tusk against the content/posts vault. Claude Code sessions start at the
# repo root, but tusk looks for tusk.toml from the working directory, so the
# tusk plugin in .claude/skills/tusk/ runs this instead of a bare `tusk`.
exec tusk --workspace "$(dirname "$0")/../content/posts" "$@"
