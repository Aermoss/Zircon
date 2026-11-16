/*
 * Copyright 2026 Yusuf Rençber
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#version 460

out vec4 outColor;

uniform sampler2DArray albedoMap;

in vec3 fragTexCoord;
in vec4 fragColor;

const vec4 GRASS_COLOR = vec4(182.0f / 255.0f, 219.0f / 255.0f, 97.0f / 255.0f, 1.0f);

void main() {
    if (fragTexCoord.z < 0.0f) {
        outColor = fragColor;
        return;
    }

    float layer = floor(fragTexCoord.z + 0.5f);
    vec4 albedo = texture(albedoMap, fragTexCoord);

    if (layer == 1.0f) {
        vec4 overlay = texture(albedoMap, vec3(fragTexCoord.xy, 0.0f));
        if (overlay.a != 0.0f) albedo = overlay * GRASS_COLOR;
    }

    if (layer == 2.0f)
        albedo = albedo * GRASS_COLOR;

    if (layer == 10.0f)
        albedo = albedo * vec4(121.0f / 255.0f, 192.0f / 255.0f, 90.0f / 255.0f, 1.0f);

    outColor = albedo * fragColor;
}
