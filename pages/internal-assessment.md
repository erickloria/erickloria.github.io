# Physics Internal Assessment (IA) Guide

---

## 1. Structure

1. Research Question
2. Physics Theory / Model
3. Variables
4. Methodology
5. Raw Data
6. Data Processing
7. Graphs
8. Uncertainty Analysis
9. Discussion
10. Scientific Context
11. Evaluation
12. Conclusion
13. References

---

## 2. Research Question

A strong research question identifies:
- the independent variable;
- the dependent variable;
- the physical system;
- the measurement method.

**Alignment rule:** Your research question, title, data collected, data processed, and principal graph must all address the same relationship. A reader should be able to look at the research question and the main graph and immediately see that the graph answers the question.

Before starting, ask:
1. Is this exactly the relationship I am measuring?
2. Will my main graph directly address this question?
3. Does my title describe the same investigation?

**Example — Hooke's Law:** *How does applied force affect the extension of a spring, and does the relationship follow Hooke's Law?* This matches: raw data measuring force and extension; a principal graph of Force vs. Extension.

**Example — Boyle's Law:** *How does the volume of a gas affect its pressure at constant temperature, and does it follow Boyle's Law?* This matches: raw data measuring pressure and volume; a principal graph of $P$ vs. $1/V$.

---

## 3. Variables

For each variable, the reader should be able to answer:
- What is the variable?
- How is it measured or set?
- Which instrument is used?
- What is the precision or resolution of that instrument?
- Why does this variable matter in the investigation?

| Type | Variable | Symbol | Unit |
| --- | --- | --- | --- |
| Independent | Force | $F$ | N |
| Dependent | Extension | $x$ | m |
| Controlled | Spring type | — | constant |
| Controlled | Temperature | — | constant |

**Independent variable:** Explain how you will vary it across a useful range. Example: *Force will be varied by adding known masses in fixed increments. Force is calculated using $F = mg$.*

**Dependent variable:** Explain how it will be measured. Example: *Extension is measured with a ruler fixed next to the spring (resolution: 1 mm). Extension is found by subtracting the natural length from the stretched length.*

**Controlled variables:** Do not just list them — explain why each matters and how it is kept constant. Example: *Spring type must be controlled because changing the spring changes the spring constant. The same spring is used throughout.*

A strong variables section connects directly to the method. Every variable named here should appear explicitly in the procedure.

---

## 4. Physics Theory / Model

Include only the physics directly relevant to the investigation. The goal is to introduce the model, definitions, assumptions, and relationships you will actually use in the analysis — not to write a textbook chapter.

This section should:
- identify the physical principle being tested;
- define the main quantities and symbols used;
- explain the expected relationship between variables;
- state any assumptions or idealizations in the model;
- connect the theory directly to the graph or calculation used later.

This section should NOT:
- include unrelated theory just to sound advanced;
- copy large chunks of textbook explanations;
- list equations without explaining what they mean;
- introduce formulas that never appear again in the analysis.

Cite credible sources (textbooks, scientific articles, reputable educational resources) wherever the model or equations are introduced.

**Example — Hooke's Law:**
$$F = kx$$
where $F$ = force (N), $k$ = spring constant (N/m), $x$ = extension (m). This predicts a linear relationship, so a graph of $F$ against $x$ gives a straight line whose gradient is $k$.

**Example — Boyle's Law:**
$$PV = \text{constant} \quad \Rightarrow \quad P \propto \frac{1}{V}$$
Because this relationship is inverse rather than linear, plotting $P$ against $1/V$ produces a straight line that is easier to test with linear regression.

---

## 5. Methodology

The method should be reproducible — another student should be able to follow it and obtain a comparable data set. It should also be justified: explain not only *what* you did, but *why*.

**What should be included:**
- equipment list;
- setup diagram;
- measurement devices;
- resolution of instruments;
- step-by-step procedure;
- number of trials.

**What should be explained and justified:**

Methodological choices should be justified wherever they affect the quality of the investigation. For example, students should explain:
- why a particular range of values was chosen;
- why the number of trials is sufficient;
- why a given measuring instrument is appropriate;
- why certain controls are necessary;
- why the chosen procedure reduces uncertainty or improves reliability;
- why the setup is suitable for testing the stated research question.

Also explain any important practical steps taken, such as:
- how the apparatus was aligned;
- how zero error was checked;
- how equilibrium was identified before measuring;
- how environmental conditions were kept stable.

If a decision improved the fairness, precision, or validity of the investigation, state it and explain why.

---

## 6. Raw Data

Show every measurement taken — do not display only averages.

Raw data tables should include:
- every trial or measurement taken;
- measured variables with units;
- instrument uncertainty;
- consistent decimal places that match the instrument's precision.

A reader should be able to infer the instrument's resolution from the way the data is recorded. For example, if a balance reads to 0.01 g, all recorded masses should show two decimal places.

Also note briefly any anomalies, outliers, or inconsistencies observed during data collection. These are not full analysis yet, but they should be recorded at the time.

---

## 7. Data Processing

Show clearly how you moved from raw measurements to the values used in analysis. Explain what was calculated, why, and which uncertainties apply at each stage.

At least one sample calculation should be shown for each type of processing, with:
- the formula written clearly;
- actual values substituted;
- units included;
- rounding consistent with the uncertainty.

### Types of uncertainty — distinguish these carefully

**1. Instrument uncertainty** — comes from the measuring device (e.g., a ruler marked to 1 mm, a balance reading to 0.01 g).

**2. Spread in repeated values** — if you repeat a measurement, the variation between readings is different from the instrument uncertainty.

$$\bar{x} = \frac{\sum x_i}{n} \qquad s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}} \qquad u_{\bar{x}} = \frac{s}{\sqrt{n}}$$

where $\bar{x}$ is the mean, $s$ is the standard deviation of repeated readings, and $u_{\bar{x}}$ is the uncertainty of the mean. This applies only when repeated measurements were actually taken.

**3. Propagated uncertainty** — when a value is *calculated* from measured quantities, its uncertainty must be propagated from the inputs. This is distinct from instrument uncertainty or the spread of repeats.

Every processed value should be traceable back to the raw data. The reader should see not only the final number, but how it was obtained and what kind of uncertainty belongs to it.

---

## 8. Uncertainty Analysis

Every measured quantity should include an uncertainty. Example: $L = 0.050 \pm 0.001\ \text{m}$.

### Propagation

When a quantity is calculated from measured inputs, uncertainty propagates. For each uncertainty calculation, explain:
- which values were measured directly;
- which value was calculated from them;
- why propagation is needed;
- what the propagated uncertainty means for confidence in the result.

$$\text{If } P = IV, \quad \frac{u_P}{P} = \sqrt{\left(\frac{u_I}{I}\right)^2 + \left(\frac{u_V}{V}\right)^2}$$

### Combining independent uncertainties (quadrature)

$$u = \sqrt{u_1^2 + u_2^2 + u_3^2}$$

Independent uncertainty contributions are squared, added, and square-rooted — not added directly — because they do not systematically reinforce each other. Use this when a result depends on several different uncertainty sources (e.g., length, mass, and time each measured separately).

---

## 9. Graphs and Regression

The principal graph should directly answer the research question and match the relationship predicted by the physics model.

Every graph must include:
- labeled axes;
- units on both axes;
- error bars on plotted values;
- an appropriate trendline.

### Linearization

When the predicted relationship is not linear, transform the variables so the model can be tested with a straight line. The transformation must come from the physics — not from visual convenience.

Common examples:
- Boyle's Law: plot $P$ against $1/V$ instead of $P$ against $V$
- Period of a pendulum: plot $T^2$ against $L$
- Inverse-square law: plot $y$ against $1/x^2$

For any linearization, explain:
- why the original relationship is not linear;
- what transformation was applied;
- why that transformation is physically justified;
- what the gradient and intercept mean after transformation.

![Rendered force vs extension graph with error bars](../Images/ia-force-extension-graph.svg)

![Rendered linearized graph with error bars](../Images/ia-linearization-graph.svg)

### Interpreting regression

$$y = mx + b$$

Discuss the gradient *only if it has physical meaning*. If the gradient represents a physical quantity (spring constant, resistance, refractive index), state its units and compare it with the expected value. If it does not, focus instead on whether the trend supports the model.

Do not discuss the intercept or slope automatically just because a line was fitted.

---

## 10. Scientific Context

Compare your results with accepted physics — not just with your own expectations.

Depending on the investigation, compare against:
- textbook values or accepted constants;
- published experimental results;
- scientific articles;
- university laboratory references.

Explain possible reasons for agreement or disagreement.

Useful sources include:
- [*The Physics Teacher*](https://pubs.aip.org/aapt/pte)
- [*American Journal of Physics*](https://pubs.aip.org/aapt/ajp)
- [*European Journal of Physics*](https://iopscience.iop.org/journal/0143-0807)
- [Institute of Physics (IOP) journals](https://iopscience.iop.org/journalList)
- [American Physical Society (APS) journals](https://journals.aps.org/)
- [University-hosted physics publications and lab notes](https://ocw.mit.edu/courses/8-13-14-experimental-physics-i-ii-junior-lab-fall-2016-spring-2017/)
- [Google Scholar](https://scholar.google.com/) — often the best starting point

Use sources critically. Not every website is reliable, and not every preprint on [arXiv](https://arxiv.org/) has been peer reviewed. When using arXiv, prefer the published version where available.

---

## 11. Evaluation

Identify the main limitations of the investigation and rank them by significance. A limitation is major only if you can explain why it had a substantial effect on the investigation.

For each major limitation, explain:
1. what happened;
2. where in the method or apparatus it appeared;
3. how it affected the measured or processed data;
4. whether it caused random error, systematic error, or both;
5. how seriously it affects confidence in the conclusion.

Do not just name limitations — explain the mechanism. For example, do not write "there was friction." Instead, explain where the friction occurred, how it changed the measured values, and whether it consistently increased or decreased the result.

---

## 12. Improvements

Each improvement must:
- respond directly to a specific limitation already discussed;
- be practically achievable in a school laboratory;
- explain how the change would improve data quality;
- make clear whether it improves precision, accuracy, reliability, or validity.

Avoid generic statements like "use better equipment" or "be more careful" unless you specify exactly what change would be made and why it helps.

---

## 13. Conclusion

Write the conclusion as a single, well-developed paragraph. It should:
- answer the research question explicitly;
- refer to the main result of the investigation;
- connect that result to the physics model or theory;
- state whether the evidence supports the expected relationship.

Do not introduce new analysis, new limitations, or new methods. A reader who sees only the research question and the conclusion should immediately understand what was found.

---

## 14. Final Checklist

- [ ] Research question matches the data, analysis, and main graph
- [ ] Physics theory is explained and cited
- [ ] Variables are fully defined (measurement method, instrument, uncertainty)
- [ ] Method is reproducible and justified
- [ ] All raw data included (not just averages)
- [ ] Sample calculations shown with actual values
- [ ] Uncertainty types distinguished (instrument, spread, propagation)
- [ ] Graphs include labeled axes, units, and error bars
- [ ] Results compared with accepted physics or published values
- [ ] Limitations ranked by significance and explained mechanistically
- [ ] Improvements tied directly to identified limitations
- [ ] Conclusion answers the research question without new material