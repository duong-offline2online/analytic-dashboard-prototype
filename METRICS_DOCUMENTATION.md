# Campaign Effectiveness Metrics - Detailed Documentation

## Metric Funnel Overview

```
👥 PASSERSBY (100%)
    ↓ (Viewability Filter - Position, Angle, Distance)
👁️ ROTS - Realistic Opportunity to See (~78%)
    ↓ (Attention Filter - Eye Tracking, Gaze Detection)
🎯 VAC - Visibility Adjusted Contacts (~60%)
    ↓ (Actual Engagement - Confirmed Looking)
📺 CAMPAIGN VIEWS (~90% of VAC)
    ↓ (Duration Tracking)
⏱️ VIEW DURATION & ENGAGEMENT SCORE
```

## 1. Passersby Audience

**Definition**: Total number of people detected passing by a display within a defined proximity zone.

**Tracking Details**:
- **Frequency**: Captured per minute and aggregated per hour
- **Demographics**: 
  - Gender: Male/Female
  - Age Groups: 18-24, 25-34, 35-44, 45-54, 55+
- **Technology**: Computer vision, people counting sensors
- **Use Cases**:
  - Foot traffic analysis
  - Store location performance
  - Peak hours identification

**Dashboard Visualization**:
- Area chart (hourly trends)
- Bar chart (demographic breakdown)
- Real-time line chart (minute-by-minute)

---

## 2. ROTS (Realistic Opportunity to See)

**Definition**: Estimated number of passersby who could realistically see the display based on:
- Viewing angle
- Distance from display
- Display size and positioning
- Environmental obstructions

**Calculation**:
```
ROTS = Passersby × Viewability Factor

Where Viewability Factor considers:
- Display visibility angle (typically 45-90° viewing cone)
- Optimal viewing distance
- Display brightness and contrast
- Environmental factors (lighting, obstructions)
```

**Typical Conversion Rates**:
- High-quality placement: 80-90%
- Medium placement: 60-80%
- Poor placement: 40-60%

**Use Cases**:
- Display placement optimization
- ROI calculation for digital signage
- Comparing display effectiveness across locations

---

## 3. VAC (Visibility Adjusted Contacts)

**Definition**: Number of people who likely saw the ad, calculated from ROTS using eye-tracking data and attention filters.

**Methodology**:
```
VAC = ROTS × Attention Factor

Where Attention Factor is determined by:
- Eye-tracking patterns
- Gaze direction and duration
- Head orientation
- Dwell time in viewing zone
```

**Attention Quality Levels**:
- **High Attention**: Gaze duration > 2 seconds (70-80% conversion)
- **Medium Attention**: Gaze duration 1-2 seconds (50-70% conversion)
- **Low Attention**: Gaze duration < 1 second (30-50% conversion)

**Industry Standards**:
- Digital OOH displays: 50-70% VAC/ROTS ratio
- Interactive displays: 60-80% VAC/ROTS ratio
- Traditional static displays: 40-60% VAC/ROTS ratio

---

## 4. Campaign Views

**Definition**: Confirmed instances where a passerby actively looked at the campaign content.

**Confirmation Methods**:
- Facial detection and orientation
- Gaze tracking toward display area
- Minimum view duration threshold (typically 0.5-1 second)
- Content area detection (not just display hardware)

**Tracking Granularity**:
- **Temporal**: Per minute/hour/day
- **Demographic**: Age and gender breakdown
- **Spatial**: Per display location
- **Content**: Per campaign creative

**View Quality Metrics**:
- **Glance**: < 1 second
- **Look**: 1-3 seconds  
- **Engagement**: 3-5 seconds
- **Deep Engagement**: > 5 seconds

---

## 5. Campaign View Timing

**Definition**: Duration that a passerby actively viewed the campaign content.

**Duration Brackets**:
- **< 1s**: Glance (28% of views)
- **1-2s**: Brief look (35% of views)
- **2-3s**: Standard view (20% of views)
- **3-5s**: Engaged view (12% of views)
- **5-10s**: Deep engagement (4% of views)
- **> 10s**: Extended engagement (1% of views)

**Analysis Applications**:
- Content effectiveness testing
- Creative optimization
- Dwell time patterns by demographic
- Campaign performance comparison

**Optimization Insights**:
- Content with 3-5s avg. view = highly engaging
- Content with < 1s avg. view = needs revision
- Longer views in specific demographics = targeting opportunity

---

## 6. Engagement Score (0-100)

**Definition**: Comprehensive metric combining view frequency, duration, and funnel conversion to evaluate campaign effectiveness.

**Calculation Algorithm**:
```javascript
Engagement Score = (
  (ViewRate × 25) +           // Views/Passersby ratio
  (Duration Score × 25) +      // Average view duration quality
  (Funnel Efficiency × 25) +   // ROTS→VAC→Views conversion
  (Demographic Reach × 25)     // Audience diversity
)

Where:
- ViewRate = Views / Passersby
- Duration Score = Weighted average by duration brackets
- Funnel Efficiency = (VAC/ROTS) × (Views/VAC)
- Demographic Reach = Shannon diversity index of demographics
```

**Score Interpretation**:
- **90-100**: Exceptional performance - Best practices
- **80-89**: Excellent - Above average engagement
- **70-79**: Good - Meeting expectations
- **60-69**: Fair - Room for improvement
- **< 60**: Poor - Needs optimization

**Factors Influencing Score**:
1. **Content Quality** (40%)
   - Visual appeal
   - Message clarity
   - Brand recognition
   
2. **Display Placement** (30%)
   - Viewing angles
   - Traffic patterns
   - Environmental conditions
   
3. **Targeting Accuracy** (20%)
   - Demographic alignment
   - Contextual relevance
   - Timing optimization
   
4. **Technical Performance** (10%)
   - Display brightness/quality
   - Content refresh rate
   - System uptime

**Optimization Strategy by Score**:

**Score < 60**: Critical issues
- Review display placement
- Test alternative creative
- Check technical functionality

**Score 60-79**: Incremental improvements
- A/B test creative variations
- Optimize timing/scheduling
- Refine demographic targeting

**Score 80-89**: Fine-tuning
- Extend duration of engagement
- Expand to similar locations
- Leverage learnings for other campaigns

**Score 90+**: Scale and replicate
- Document best practices
- Apply learnings to new campaigns
- Use as benchmark for future initiatives

---

## Continuous Optimization Process

The system continuously optimizes engagement scores through:

1. **Real-time Monitoring**
   - Minute-by-minute performance tracking
   - Automatic anomaly detection
   - Alert triggers for underperformance

2. **Pattern Recognition**
   - Peak performance hours
   - High-engagement demographics
   - Successful creative attributes

3. **Automated Recommendations**
   - Schedule optimization
   - Content rotation strategies
   - Display placement adjustments

4. **Comparative Analysis**
   - Display vs. display performance
   - Campaign vs. campaign effectiveness
   - Temporal trends and seasonality

---

## Data Collection & Privacy

**Privacy Compliance**:
- All demographic data is anonymized
- No personally identifiable information (PII) collected
- Aggregated data only
- GDPR/CCPA compliant

**Data Retention**:
- Real-time data: 7 days
- Hourly aggregates: 90 days
- Daily summaries: 2 years
- Campaign reports: Indefinite

---

## Integration Points

The dashboard can integrate with:
- Camera/sensor systems for data collection
- CMS (Content Management Systems) for campaign tracking
- Analytics platforms for cross-channel insights
- Business intelligence tools for reporting

---

## Benchmarking Standards

**Industry Averages (Digital OOH)**:
- ROTS/Passersby: 70-75%
- VAC/ROTS: 55-65%
- Views/VAC: 85-95%
- Avg View Duration: 2.5-3.5s
- Engagement Score: 65-75

**Your Current Performance**:
- ROTS/Passersby: **78.4%** ✅ Above average
- VAC/ROTS: **59.9%** ✅ Average
- Views/VAC: **89.2%** ✅ Above average
- Avg View Duration: **3.8s** ✅ Above average
- Engagement Score: **85** ✅ Excellent

---

## Glossary

- **OOH**: Out-of-Home (advertising)
- **DOOH**: Digital Out-of-Home
- **Dwell Time**: Time spent in proximity to display
- **Gaze Duration**: Time spent looking at display
- **Viewability**: Probability of being seen
- **Attention**: Quality of visual engagement
- **Conversion Funnel**: Progression from exposure to action

