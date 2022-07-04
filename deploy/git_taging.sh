#!/bin/bash
COMMITSHA="$1"
major_max=0;
minor_max=0;
patch_max=1;
branch_name="${BRANCH_NAME}"
$(git fetch --tags)
last_tag=$(git describe --abbrev=0 --tags)
if [[ $last_tag ]]; then
version=$(echo $last_tag | grep -o '[^-]*$')
    major=$(echo $version | cut -d. -f1)
    minor=$(echo $version | cut -d. -f2)
    patch=$(echo $version | cut -d. -f3)
if [ "$major_max" -lt "$major" ]; then
        let major_max=$major
    fi
if [ "$minor_max" -lt "$minor" ]; then
        let minor_max=$minor
    fi
if [ "$patch_max" -lt "$patch" ]; then
        let patch_max=$patch
    fi
echo 'Latest version:' $major_max'.'$minor_max'.'$patch_max
let patch_max=($patch_max+1)
fi
if [ "$major_max" -ne "${MAJOR_VERSION}" ] || [ "$minor_max" -ne "${MINOR_VERSION}" ]; then
    major_max="${MAJOR_VERSION}"
    minor_max="${MINOR_VERSION}"
    patch_max=0
fi
echo 'Switching to new version:' $major_max'.'$minor_max'.'$patch_max
echo 'Creating tag for:' $COMMITSHA
$(git tag -a $branch_name-$major_max.$minor_max.$patch_max $COMMITSHA -m "Version $major_max.$minor_max.$patch_max" )
echo 'Push tag to remote'
$(git push origin $branch_name-$major_max.$minor_max.$patch_max $branch_name)